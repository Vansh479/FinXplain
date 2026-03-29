import os
import pickle
import faiss
import numpy as np
import google.generativeai as genai
from loguru import logger

class RAGEngine:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            logger.error("RAG: GEMINI_API_KEY missing! RAG will be disabled.")
            self.index = None
            return

        genai.configure(api_key=api_key)
        
        self.index_path = "financial_data.index"
        self.text_path = "financial_texts.pkl"
        self.docs = []
        self.dimension = 768 

        try:
            if os.path.exists(self.index_path) and os.path.exists(self.text_path):
                self.index = faiss.read_index(self.index_path)
                with open(self.text_path, "rb") as f:
                    self.docs = pickle.load(f)
                
                if self.index.d != self.dimension:
                    raise ValueError(f"Dimension mismatch: Found {self.index.d}, need {self.dimension}")
                
                logger.info(f"RAG: Loaded {len(self.docs)} financial segments.")
            else:
                self._create_empty_index()
        except Exception as e:
            logger.warning(f"RAG: Data files invalid or old. Resetting index. Error: {e}")
            self._create_empty_index()

    def _create_empty_index(self):
        self.index = faiss.IndexFlatL2(self.dimension)
        self.docs = []
        logger.info("RAG: Fresh 768-dim index initialized.")

    def _get_gemini_embedding(self, text_list: list[str]):
        """API-based embeddings: Uses ~0MB of your Render RAM"""
        try:
            result = genai.embed_content(
                model="models/text-embedding-004",
                content=text_list,
                task_type="retrieval_document"
            )
            return np.array(result['embedding']).astype('float32')
        except Exception as e:
            logger.error(f"Gemini Embedding API Error: {e}")
            return None

    def index_documents(self, documents: list[str]):
        if not documents or self.index is None: return
        
        embeddings = self._get_gemini_embedding(documents)
        if embeddings is not None:
            if len(embeddings.shape) == 1:
                embeddings = embeddings.reshape(1, -1)
                
            self.index.add(embeddings)
            self.docs.extend(documents)
            
            faiss.write_index(self.index, self.index_path)
            with open(self.text_path, "wb") as f:
                pickle.dump(self.docs, f)
            logger.info(f"RAG: Successfully indexed {len(documents)} new docs.")

    def retrieve(self, query: str, top_k: int = 4) -> list[str]:
        if not self.docs or self.index is None or self.index.ntotal == 0:
            return []
        
        query_emb = self._get_gemini_embedding([query])
        if query_emb is not None:
            if len(query_emb.shape) == 1:
                query_emb = query_emb.reshape(1, -1)
                
            distances, indices = self.index.search(query_emb, top_k)
            return [self.docs[i] for i in indices[0] if 0 <= i < len(self.docs)]
        return []
import os
import pickle
import faiss
import numpy as np
from loguru import logger
from sentence_transformers import SentenceTransformer

class RAGEngine:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.index_path = "financial_data.index"
        self.text_path = "financial_texts.pkl"
        self.docs = []

        if os.path.exists(self.index_path) and os.path.exists(self.text_path):
            self.index = faiss.read_index(self.index_path)
            with open(self.text_path, "rb") as f:
                self.docs = pickle.load(f)
            logger.info(f"RAG: Loaded {len(self.docs)} financial segments.")
        else:
            self.index = faiss.IndexFlatL2(384)
            logger.warning("RAG: No pre-loaded data found. Run ingestion first.")

    def index_documents(self, documents: list[str]):
        if not documents: return
        embeddings = self.model.encode(documents)
        self.index.add(np.array(embeddings).astype('float32'))
        self.docs.extend(documents)
        
        faiss.write_index(self.index, self.index_path)
        with open(self.text_path, "wb") as f:
            pickle.dump(self.docs, f)

    def retrieve(self, query: str, top_k: int = 5) -> list[str]:
        if not self.docs:
            return []
        
        query_emb = self.model.encode([query])
        distances, indices = self.index.search(np.array(query_emb).astype('float32'), top_k)
        
        valid_results = []
        for i in indices[0]:
            if 0 <= i < len(self.docs):
                valid_results.append(self.docs[i])
        return valid_results
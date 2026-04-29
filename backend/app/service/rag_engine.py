import os
import pickle
import faiss
import numpy as np
import cohere
from openai import OpenAI
from loguru import logger

class RAGEngine:
    def __init__(self):
        cohere_key = os.getenv("COHERE_API_KEY")
        deepseek_key = os.getenv("DEEPSEEK_API_KEY")

        if not cohere_key or not deepseek_key:
            logger.error("RAG: API Keys missing!")
            self.index = None
            return

        self.co = cohere.Client(cohere_key)
        self.deepseek = OpenAI(api_key=deepseek_key, base_url="https://api.deepseek.com")
        
        self.index_path = "financial_data.index"
        self.text_path = "financial_texts.pkl"
        self.docs = []
        self.dimension = 1024 # Standard for Cohere v3

        try:
            if os.path.exists(self.index_path) and os.path.exists(self.text_path):
                self.index = faiss.read_index(self.index_path)
                with open(self.text_path, "rb") as f:
                    self.docs = pickle.load(f)
                logger.info(f"RAG: Loaded {len(self.docs)} segments.")
            else:
                self._create_empty_index()
        except Exception as e:
            self._create_empty_index()

    def _create_empty_index(self):
        self.index = faiss.IndexFlatL2(self.dimension)
        self.docs = []

    def _get_cohere_embedding(self, text_list: list[str], input_type: str = "search_document"):
        try:
            response = self.co.embed(
                texts=text_list,
                model="embed-english-v3.0",
                input_type=input_type,
                embedding_types=["float"]
            )
            return np.array(response.embeddings.float).astype('float32')
        except Exception as e:
            logger.error(f"Cohere API Error: {e}")
            return None

    def index_documents(self, documents: list[str]):
        if not documents or self.index is None: return
        batch_size = 90
        for i in range(0, len(documents), batch_size):
            batch = documents[i:i + batch_size]
            embeddings = self._get_cohere_embedding(batch, input_type="search_document")
            if embeddings is not None:
                if len(embeddings.shape) == 1:
                    embeddings = embeddings.reshape(1, -1)
                self.index.add(embeddings)
                self.docs.extend(batch)
        
        faiss.write_index(self.index, self.index_path)
        with open(self.text_path, "wb") as f:
            pickle.dump(self.docs, f)

    def retrieve(self, query: str, top_k: int = 5) -> list[str]:
        if not self.docs or self.index is None or self.index.ntotal == 0:
            return []
        query_emb = self._get_cohere_embedding([query], input_type="search_query")
        if query_emb is not None:
            distances, indices = self.index.search(query_emb, top_k)
            return [self.docs[i] for i in indices[0] if 0 <= i < len(self.docs)]
        return []

    def generate_answer(self, query: str):
        """
        STRICT GROUNDING: Will refuse to answer if data is missing.
        """
        retrieved_docs = self.retrieve(query)
        
        if not retrieved_docs:
            return "I'm sorry, but I cannot provide an accurate answer because no document has been uploaded or indexed to search from."

        context = "\n---\n".join(retrieved_docs)
        
        system_prompt = (
            "You are a strict Financial Data Analyst. "
            "You will be provided with context from a specific financial document. "
            "INSTRUCTIONS:\n"
            "1. Use ONLY the provided context to answer the query.\n"
            "2. If the context does not contain the specific numbers, dates, or facts requested, "
            "strictly state: 'I don't know the answer because the provided document does not contain this information.'\n"
            "3. DO NOT use your internal knowledge to guess financial figures.\n"
            "4. If the query is a general financial question not related to a specific report (like 'What is an IPO?'), "
            "you may provide a general definition, but clearly state it is general knowledge and not from the doc."
        )

        try:
            response = self.deepseek.chat.completions.create(
                model="deepseek-v4-flash",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"CONTEXT:\n{context}\n\nQUERY: {query}"}
                ],
                temperature=0.1 
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"DeepSeek API Error: {e}"
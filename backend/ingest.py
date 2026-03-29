import os
import fitz  
from app.service.rag_engine import RAGEngine

def build_knowledge_base():
    engine = RAGEngine()
    kb_path = "./knowledge_base"
    
    if not os.path.exists(kb_path):
        os.makedirs(kb_path)
        print(f"Directory '{kb_path}' created. Add your financial PDFs there and re-run.")
        return

    pdf_files = [f for f in os.listdir(kb_path) if f.endswith('.pdf')]
    if not pdf_files:
        print("No PDFs found in ./knowledge_base")
        return

    all_text_chunks = []
    for pdf in pdf_files:
        print(f"Reading: {pdf}...")
        doc = fitz.open(os.path.join(kb_path, pdf))
        for page in doc:
            text = page.get_text("text")
            chunks = [p.strip() for p in text.split('\n\n') if len(p.strip()) > 100]
            all_text_chunks.extend(chunks)

    print(f"Indexing {len(all_text_chunks)} segments into FAISS...")
    engine.index_documents(all_text_chunks)
    print("Success! financial_data.index and financial_texts.pkl created.")

if __name__ == "__main__":
    build_knowledge_base()
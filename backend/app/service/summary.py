import os
import datetime
import gc  
from pypdf import PdfReader
from loguru import logger
from app.service.llm.gemini import GeminiLLM
from app.schemas.response import analyst_schema, investor_schema
from app.service.rag_engine import RAGEngine

_global_rag_engine = None
_llm_client = None

def get_rag_engine():
    """Lazy initializer for RAG Engine - Loads only when needed"""
    global _global_rag_engine
    if _global_rag_engine is None:
        try:
            logger.info("FinXplain: Loading RAG Engine into RAM...")
            _global_rag_engine = RAGEngine()
            gc.collect() 
        except Exception as e:
            logger.error(f"RAG Engine Load Failure: {e}")
    return _global_rag_engine

def get_llm_client():
    """Lazy initializer for LLM Client"""
    global _llm_client
    if _llm_client is None:
        try:
            _llm_client = GeminiLLM()
        except Exception as e:
            logger.error(f"LLM Client Load Failure: {e}")
    return _llm_client

def get_financial_summary(user_query: str, analysis_type: str, fiscal_pdf=None) -> dict | None:
    try:
        engine = get_rag_engine()
        llm = get_llm_client()

        if not llm:
            raise ValueError("LLM Client not initialized")

        query_lower = user_query.lower()
        definitions = ["what is", "define", "meaning", "explain", "concept", "definition"]
        is_general_query = any(word in query_lower for word in definitions)

        kb_context = ""
        if engine:
            kb_chunks = engine.retrieve(user_query, top_k=4) 
            kb_context = "\n".join(kb_chunks) if kb_chunks else ""

        uploaded_context = ""
        filename = "Knowledge Base"
        if fiscal_pdf:
            filename = fiscal_pdf.filename
            try:
                reader = PdfReader(fiscal_pdf.file)
                for i in range(min(len(reader.pages), 5)):
                    text = reader.pages[i].extract_text()
                    if text:
                        uploaded_context += text + "\n"
            except Exception as pdf_err:
                logger.error(f"PDF Parse Error: {pdf_err}")

        combined_context = f"--- STATIC KNOWLEDGE BASE ---\n{kb_context}\n\n--- UPLOADED DOCUMENT ---\n{uploaded_context}"
      
        smart_prompt = f"""
        ROLE: Senior Financial Analyst AI
        
        TASK:
        1. Evaluate if the PROVIDED DOCUMENTS contain data for the company mentioned in: "{user_query}".
        2. If the query is a GENERAL DEFINITION (e.g., 'What is EBITDA?'), IGNORE the documents and provide a professional accounting definition.
        3. If the documents are about a different company (e.g., Docs are TCS, Query is Nvidia):
           - Start by saying: "The provided documents do not contain information for this company."
           - Provide the answer using your INTERNAL GENERAL KNOWLEDGE.
        4. If the documents ARE relevant, provide a deep-dive analysis grounded strictly in the text.

        DOCUMENTS:
        {combined_context}

        USER QUERY: {user_query}
        """

        if is_general_query:
            response_data = llm.generate_content(smart_prompt) 
            final_type = "chat"
        else:
            schema = analyst_schema if analysis_type == "analyst" else investor_schema
            response_data = llm.generate(smart_prompt, schema)
            final_type = analysis_type

        gc.collect()

        return {
            "id": "gen-" + os.urandom(4).hex(),
            "reportssheet_type": final_type,
            "content": response_data,
            "filename": filename,
            "generated_at": datetime.datetime.now().strftime("%B %d, %Y")
        }

    except Exception as e:
        logger.error(f"Critical RAG Error: {e}")
        import traceback
        logger.debug(traceback.format_exc())
        return None
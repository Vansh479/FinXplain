import os
import json
import datetime
import gc
import re
import urllib.request
from pypdf import PdfReader
from loguru import logger
from app.service.llm_client import DeepSeekLLM
from app.schemas.response import analyst_schema, investor_schema
from app.service.rag_engine import RAGEngine

FINNHUB_KEY = os.getenv("FINNHUB_API_KEY", "")

# Company names -> Yahoo Finance ticker
KNOWN_STOCKS = {
    "reliance": "RELIANCE.NS", "tcs": "TCS.NS", "bajaj finance": "BAJFINANCE.NS",
    "bajaj": "BAJFINANCE.NS", "hdfc bank": "HDFCBANK.NS", "hdfc": "HDFCBANK.NS",
    "icici bank": "ICICIBANK.NS", "icici": "ICICIBANK.NS", "infosys": "INFY.NS",
    "wipro": "WIPRO.NS", "sbi": "SBIN.NS", "state bank": "SBIN.NS",
    "itc": "ITC.NS", "apple": "AAPL", "google": "GOOGL", "alphabet": "GOOGL",
    "microsoft": "MSFT", "amazon": "AMZN", "meta": "META",
    "tesla": "TSLA", "nvidia": "NVDA", "netflix": "NFLX",
    "bitcoin": "BTC-USD", "ethereum": "ETH-USD",
}

def fetch_stock_data(query):
    """If query mentions a known stock, return live price data via Yahoo Finance."""
    query_lower = query.lower()
    matches = []
    for name, symbol in KNOWN_STOCKS.items():
        if name in query_lower:
            matches.append((name, symbol))
    if not matches:
        return None

    lines = []
    for name, symbol in matches:
        try:
            url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range=1d&interval=1m"
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read())
            result = data["chart"]["result"][0]
            meta = result["meta"]
            price = meta.get("regularMarketPrice")
            prev_close = meta.get("previousClose", 0)
            if price and price > 0:
                change = price - prev_close
                change_pct = (change / prev_close) * 100 if prev_close else 0
                currency = "₹" if ".NS" in symbol else "$"
                lines.append(
                    f"{name.title()} ({symbol}): {currency}{price:.2f} | "
                    f"Change: {change:+.2f} ({change_pct:+.2f}%) | "
                    f"Previous Close: {currency}{prev_close:.2f}"
                )
        except Exception as e:
            logger.error(f"Stock data error for {symbol}: {e}")

    return "\n".join(lines) if lines else None

_global_rag_engine = None
_llm_client = None

def get_rag_engine():
    global _global_rag_engine
    if _global_rag_engine is None:
        try:
            logger.info("FinXplain: Loading RAG Engine...")
            _global_rag_engine = RAGEngine()
            gc.collect()
        except Exception as e:
            logger.error(f"RAG Engine Load Failure: {e}")
    return _global_rag_engine

def get_llm_client():
    global _llm_client
    if _llm_client is None:
        try:
            _llm_client = DeepSeekLLM()
        except Exception as e:
            logger.error(f"LLM Client Load Failure: {e}")
    return _llm_client

def chunk_pdf(pdf_file):
    """Extract and chunk text from a PDF into segments."""
    reader = PdfReader(pdf_file)
    full_text = ""
    for i, page in enumerate(reader.pages):
        if i >= 30:
            break
        text = page.extract_text()
        if text:
            full_text += text + "\n"
    chunks = [p.strip() for p in full_text.split("\n\n") if len(p.strip()) > 50]
    return chunks[:80]

def retrieve_relevant_chunks(chunks, query, max_chars=6000):
    """Score chunks by keyword overlap with the query, return top matches."""
    keywords = re.findall(r'\w+', query.lower())
    stop_words = {"the", "a", "an", "is", "are", "was", "were", "be", "been",
                  "in", "on", "at", "to", "for", "of", "with", "by", "from",
                  "and", "or", "but", "not", "this", "that", "it", "its",
                  "what", "how", "why", "when", "where", "do", "does", "did",
                  "i", "we", "you", "they", "he", "she", "has", "have", "had",
                  "can", "will", "would", "could", "should", "may", "might",
                  "tell", "me", "about", "give", "please", "summarise", "summarize"}
    keywords = [k for k in keywords if k not in stop_words]

    scored = []
    for chunk in chunks:
        chunk_lower = chunk.lower()
        score = sum(1 for kw in keywords if kw in chunk_lower)
        if score > 0:
            scored.append((score, chunk))

    scored.sort(reverse=True, key=lambda x: x[0])

    result = ""
    for _, chunk in scored:
        if len(result) + len(chunk) > max_chars:
            break
        result += chunk + "\n\n"
    return result.strip() if result else "\n\n".join(chunks[:5])

def get_financial_summary(user_query: str, analysis_type: str, fiscal_pdf=None, fiscal_pdfs: list = None) -> dict | None:
    try:
        llm = get_llm_client()
        if not llm:
            raise ValueError("LLM Client not initialized")

        doc_context = ""
        filename = "Knowledge Base"
        has_uploaded_doc = False

        # Process uploaded PDFs (single or multiple)
        if fiscal_pdfs and len(fiscal_pdfs) > 0:
            has_uploaded_doc = True
            all_chunks = []
            filenames = []
            for pdf in fiscal_pdfs:
                try:
                    chunks = chunk_pdf(pdf.file)
                    relevant = retrieve_relevant_chunks(chunks, user_query)
                    if relevant:
                        all_chunks.append(relevant)
                    filenames.append(pdf.filename)
                except Exception as e:
                    logger.error(f"PDF Parse Error for {pdf.filename}: {e}")
            doc_context = "\n\n".join(all_chunks)
            filename = ", ".join(filenames) if filenames else "Uploaded Documents"
            logger.info(f"Processed {len(filenames)} uploaded PDF(s)")
        elif fiscal_pdf:
            has_uploaded_doc = True
            try:
                chunks = chunk_pdf(fiscal_pdf.file)
                doc_context = retrieve_relevant_chunks(chunks, user_query)
                filename = fiscal_pdf.filename
                logger.info(f"Processed uploaded PDF: {filename}")
            except Exception as e:
                logger.error(f"PDF Parse Error: {e}")
        else:
            # No PDF uploaded — try static knowledge base
            engine = get_rag_engine()
            if engine:
                kb_chunks = engine.retrieve(user_query, top_k=5)
                if kb_chunks:
                    doc_context = "\n\n".join(kb_chunks)

        if has_uploaded_doc and doc_context:
            role_instruction = (
                "You are a financial analyst performing a detailed audit. "
                "Focus on: company profile, viability assessment, operational metrics, "
                "governance structure, fiscal history, structural risks, and strategic outlook. "
                "Use a formal, investigative tone."
            ) if analysis_type == "analyst" else (
                "You are an investor evaluating a potential investment. "
                "Focus on: SWOT analysis, valuation metrics, key financial terms, "
                "due diligence questions, and strategic growth outlook. "
                "Use a decision-oriented, opportunity-focused tone."
            )
            prompt = (
                f"{role_instruction}\n\n"
                f"Here are the relevant excerpts from the uploaded document(s):\n\n{doc_context}\n\n"
                f"Based ONLY on this document, answer: {user_query}\n\n"
                f"If the document does not contain the specific data requested, "
                f"say 'The uploaded document does not contain this information.'"
            )
            schema = analyst_schema if analysis_type == "analyst" else investor_schema
            response_data = llm.generate(prompt, schema)
            final_type = analysis_type
        elif doc_context:
            prompt = (
                f"Here is the content from the knowledge base:\n\n{doc_context}\n\n"
                f"Based ONLY on this context, answer: {user_query}\n\n"
                f"If it does not contain the specific data requested, "
                f"say 'The knowledge base does not contain this information.'"
            )
            is_general_definition = any(word in user_query.lower() for word in ["what is", "define", "meaning", "explain", "concept", "definition"])
            if is_general_definition:
                response_data = llm.generate_content(
                    f"Provide a clear financial definition for: {user_query}"
                )
                final_type = "chat"
            else:
                schema = analyst_schema if analysis_type == "analyst" else investor_schema
                response_data = llm.generate(prompt, schema)
                final_type = analysis_type
        else:
            live_data = fetch_stock_data(user_query)
            if live_data:
                logger.info(f"Live market data found: {live_data[:100]}...")
                response_data = llm.generate_content(
                    f"CURRENT MARKET DATA (this is live, real-time data fetched right now):\n\n{live_data}\n\n"
                    f"Using ONLY the data above, answer: {user_query}\n"
                    f"Do NOT say you don't have real-time data. The data IS provided above. Just answer using it."
                )
                final_type = "chat"
            else:
                response_data = llm.generate_content(
                    f"Answer this financial question using your general knowledge: {user_query}"
                )
                final_type = "chat"

        gc.collect()

        return {
            "id": "gen-" + os.urandom(4).hex(),
            "reportssheet_type": final_type,
            "content": response_data,
            "filename": filename,
            "generated_at": datetime.datetime.now().strftime("%B %d, %Y")
        }

    except Exception as e:
        logger.error(f"Critical Error: {e}")
        import traceback
        logger.debug(traceback.format_exc())
        return None

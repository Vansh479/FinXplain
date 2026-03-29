# FinXplain AI: Fiscal Intelligence Engine

**FinXplain AI** is a professional-grade financial analysis platform that leverages **Stateless Retrieval-Augmented Generation (RAG)** and Large Language Models (LLMs) to decode complex fiscal data. It transforms dense financial filings into grounded, actionable insights for market professionals.

* **For Analysts:** Generates a deep-dive "Fiscal Performance Synthesis" covering operational strengths, market position, and strategic pivots.
* **For Investors:** Provides an "Investor Sentiment Deep-Dive" with risk-assessment queries and capital allocation audits.

---

## 🛠️ Tech Stack

| Layer          | Technology                                                                 |
| :------------- | :------------------------------------------------------------------------- |
| **Frontend** | **Next.js 14**, **Shadcn UI**, **Redux Toolkit** |
| **Backend** | **FastAPI**, **LangChain**, **FAISS**, **sentence-transformers** |
| **LLM** | **Google Gemini 2.0 Flash** (via API)                                      |
| **Vector DB** | **FAISS** (Stateless in-memory vector storage)                             |
| **Embeddings** | **all-MiniLM-L6-v2** (SOTA for local CPU-based embedding)                  |

---

## 🏗️ Architecture & RAG Pipeline

* **Stateless Vectorization:** Documents are parsed and vectorized into **FAISS** in-memory, ensuring no sensitive financial data is stored long-term.
* **Orchestration:** **LangChain** manages the chain-of-thought and context injection.
* **Context Grounding:** Custom prompt engineering using **Fiscal Reports + Market Focus** to eliminate LLM hallucinations.
* **Structured Output:** JSON-schema validation ensures consistent report formatting for dashboard rendering.

---

import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_NAME = "FinXplain AI"
VERSION = "1.0.0"

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev_skeleton.db")
if not DATABASE_URL:
    raise ValueError("FinXplain Error: DATABASE_URL environment variable is missing.")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
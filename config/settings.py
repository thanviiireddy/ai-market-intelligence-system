import os

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

MODEL_NAME = "llama-3.1-8b-instant"

REPORT_DIR = "outputs/reports"

CHROMA_DB_DIR = "outputs/chroma_db"

APP_NAME = "AI Market Intelligence System"

APP_VERSION = "1.0.0"
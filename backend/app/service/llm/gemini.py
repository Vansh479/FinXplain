import os
import json
from google import genai
from loguru import logger

class GeminiLLM:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            logger.error("FinXplain Engine: GEMINI_API_KEY missing from environment.")
            raise ValueError("API Key Required")
        
        self.client = genai.Client(api_key=api_key)
        self.model_id = "gemini-2.5-flash" 

    def generate_content(self, prompt: str) -> str:
        """Method for raw text (definitions, general chat)"""
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt
            )
            return response.text
        except Exception as e:
            logger.error(f"Gemini Raw Text Error: {e}")
            return f"Error: {str(e)}"

    def generate(self, prompt: str, schema: dict) -> dict | None:
        """Method for structured analysis (Analyst/Investor reports)"""
        try:
            response = self.client.models.generate_content(
                model=self.model_id,
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': schema,
                }
            )
            return json.loads(response.text)
        except Exception as e:
            logger.error(f"Gemini Structured Error: {e}")
            return None
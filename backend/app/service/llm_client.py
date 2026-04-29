import os
import json
from openai import OpenAI
from loguru import logger

class DeepSeekLLM:
    def __init__(self):
        api_key = os.getenv("DEEPSEEK_API_KEY")
        if not api_key:
            logger.error("FinXplain Engine: DEEPSEEK_API_KEY missing from environment.")
            raise ValueError("DeepSeek API Key Required")
        
        # DeepSeek uses the OpenAI-compatible SDK
        self.client = OpenAI(
            api_key=api_key, 
            base_url="https://api.deepseek.com"
        )
        self.model_id = "deepseek-chat" # This points to DeepSeek V4

    def generate_content(self, prompt: str) -> str:
        """Method for raw text (definitions, general chat)"""
        try:
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": "You are a professional financial AI."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"DeepSeek Raw Text Error: {e}")
            return f"Error: {str(e)}"

    def generate(self, prompt: str, schema: dict) -> dict | None:
        """Method for structured analysis (Analyst/Investor reports)"""
        # Inject strictness into the prompt
        strict_prompt = (
            f"{prompt}\n\n"
            "STRICT RULE: If the provided document context does not contain the data needed "
            "to fill a specific field in the JSON schema, set that field to null or 'Data not found'. "
            "DO NOT HALLUCINATE NUMBERS."
        )

        try:
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": "You are a strict financial analyst that outputs ONLY valid JSON."},
                    {"role": "user", "content": strict_prompt}
                ],
                response_format={'type': 'json_object'},
                temperature=0.1 
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            logger.error(f"DeepSeek Structured Error: {e}")
            return None
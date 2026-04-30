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

        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.deepseek.com"
        )
        self.model_id = "deepseek-chat"

    def generate_content(self, prompt: str) -> str:
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
            logger.error(f"DeepSeek Text Error: {e}")
            return f"Error: {str(e)}"

    def generate(self, prompt: str, schema: dict) -> dict | None:
        schema_fields = ", ".join(schema.get("properties", {}).keys())
        strict_prompt = (
            f"{prompt}\n\n"
            f"Output ONLY valid JSON with these fields: {schema_fields}.\n"
            "If the document does not contain data for a field, set it to null or 'Not found'.\n"
            "DO NOT HALLUCINATE NUMBERS.\n"
            "Return ONLY the JSON object, nothing else."
        )

        try:
            response = self.client.chat.completions.create(
                model=self.model_id,
                messages=[
                    {"role": "system", "content": "You are a strict financial analyst. Output ONLY valid JSON."},
                    {"role": "user", "content": strict_prompt}
                ],
                temperature=0.1
            )
            text = response.choices[0].message.content.strip()
            # Remove markdown code block if present
            if text.startswith("```"):
                text = text.split("\n", 1)[1].rsplit("\n", 1)[0]
            return json.loads(text)
        except Exception as e:
            logger.error(f"DeepSeek Structured Error: {e}")
            return None

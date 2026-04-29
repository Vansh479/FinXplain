import os
from dotenv import load_dotenv
import json

load_dotenv() 

from app.service.summary import get_financial_summary

def test_query():
    print(" Starting FinXplain Engine Test...")
    
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        print(" ERROR: DEEPSEEK_API_KEY is missing from the environment!")
        print("Check if your .env file is in the same folder you are running this from.")
        return

    query = "Summarize the key financial highlights from the report."
    print(f" Querying: {query}")

    result = get_financial_summary(query, analysis_type="analyst")
    
    if result:
        print("\n SUCCESS! Engine responded with JSON:")
        print(json.dumps(result, indent=2))
    else:
        print("\n FAILURE: Engine returned None. Check the logs above for errors.")

if __name__ == "__main__":
    test_query()
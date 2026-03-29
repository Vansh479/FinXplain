def get_prompt(report_text, market_context, role, extra_context):
    if role == "investor":
        instructions = """
        You are a strategic investor evaluating a company's performance. Based on the financial report and market context below, generate a summary in JSON format that STRICTLY adheres to the provided schema. Highlight key growth drivers, financial health, and risk factors. Focus on data-backed conclusions and future projections.
        """
    elif role == "analyst":
        instructions = """
        You are a senior financial analyst performing a deep-dive audit. Based on the provided corporate report and market context below, generate a structured overview in JSON format that STRICTLY adheres to the provided schema. This overview should help identify fiscal trends, evaluate debt-to-equity ratios, and provide a granular understanding of the company's market position. Provide every field mentioned in the schema.
        """
    else:
        raise ValueError(f"Invalid role: {role}. Must be 'investor' or 'analyst'.")

    return f"""
    {instructions}

    FINANCIAL REPORT:
    {report_text}

    MARKET CONTEXT:
    {market_context}
    
    SUPPLEMENTAL DATA:
    {extra_context}    
    """
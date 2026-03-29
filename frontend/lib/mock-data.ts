export const mockResultsData = {
  fin: "Equity Research: Technology Sector",
  company: "TATA Consultancy Services (TCS)",
  fiscalName: "TCS_Annual_Report_FY25.pdf",
  generatedDate: "March 28, 2026",

  swotAnalysis: {
    strengths: [
      {
        title: "Robust Order Book",
        description: "Significant TCV (Total Contract Value) in AI and Cloud transformation deals ensures revenue visibility for the next 4-6 quarters.",
      },
      {
        title: "Dividend Resilience",
        description: "Consistent 80%+ payout ratio and high Free Cash Flow (FCF) generation support strong shareholder returns.",
      },
    ],
    weaknesses: [
      {
        title: "Margin Compression",
        description: "Increased onsite costs and wage hikes in the BFSI segment are putting pressure on operational margins (EBIT).",
      },
    ],
    opportunities: [
      {
        title: "Generative AI Pipeline",
        description: "Upskilling 300k+ employees in GenAI positions the firm to capture the next wave of enterprise spending.",
      },
    ],
    threats: [
      {
        title: "Macroeconomic Volatility",
        description: "Reduced discretionary spending in the US and UK markets could lead to delays in project execution.",
      },
    ],
  },

  screeningQuestions: [
    {
      question: "What is the projected impact of the BFSI slowdown on the company's incremental revenue?",
      why_ask: "Essential for determining if the largest revenue vertical is de-risked.",
    },
    {
      question: "How does the current attrition rate compare to industry peers like Infosys or Accenture?",
      why_ask: "High attrition in specialized AI roles could signal future delivery bottlenecks.",
    },
  ],

  companyInsights: {
    company_overview: "TCS is a global leader in IT services, consulting, and business solutions with a footprint in over 46 countries.",
    culture_points: [
      "Zero-tolerance policy for ethical violations",
      "Focus on long-term stakeholder value over quarterly volatility",
      "Institutionalized innovation via TCS Co-Innovation Network (COIN)",
    ],
    company_values: [
      "Integrity & Excellence",
      "Pioneering Spirit",
      "Responsibility to the community",
    ],
    interview_style: "Focuses on capital allocation efficiency and sustainable EBITDA margins.",
    expectations: "Analysts expect a steady 12-15% CAGR in revenue over the mid-term.",
    fallback: "Data point not explicitly mentioned in the provided fiscal report section."
  },

  interviewRecommendation: {
    proceed: "Proceed", 
    justification: "Strong balance sheet and zero debt provide a massive safety margin despite sector headwinds."
  }
}
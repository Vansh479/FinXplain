investor_schema = {
  "type": "object",
  "properties": {
    "entity_name": {
      "type": "string",
      "description": "The company name identified in the report"
    },
    "fiscal_period": {
      "type": "string",
      "description": "The financial period covered by the document"
    },
    "swot_analysis": {
      "type": "object",
      "description": "Financial SWOT analysis based on report data",
      "properties": {
        "strengths": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        },
        "weaknesses": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        },
        "opportunities": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        },
        "threats": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        }
      },
      "required": ["strengths", "weaknesses", "opportunities", "threats"]
    },
    "valuation_metrics": {
      "type": "object",
      "properties": {
        "solvency_score": {
          "type": "number",
          "description": "Overall financial solvency rating"
        },
        "positive_indicators": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"},
              "impact_level": {"type": "string"}
            },
            "required": ["title", "description", "impact_level"]
          }
        },
        "mixed_signals": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"},
              "impact_level": {"type": "string"}
            },
            "required": ["title", "description", "impact_level"]
          }
        },
        "risk_factors": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {"type": "string"},
              "description": {"type": "string"}
            },
            "required": ["title", "description"]
          }
        }
      },
      "required": ["solvency_score", "positive_indicators", "mixed_signals", "risk_factors"]
    },
    "glossary_of_terms": {
      "type": "array",
      "description": "Financial terms and concepts to review",
      "items": {
        "type": "object",
        "properties": {
          "term": {"type": "string"},
          "context": {
            "type": "string",
            "description": "Where it appears in the report"
          },
          "definition": {
            "type": "string",
            "description": "Financial definition and relevance"
          },
          "resource_link": {"type": "string"}
        },
        "required": ["term", "context", "definition", "resource_link"]
      }
    },
    "due_diligence_qa": {
      "type": "array",
      "description": "Critical queries for deeper financial investigation",
      "items": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "enum": ["Fiscal", "Operational", "Compliance", "Strategic"]
          },
          "urgency": {
            "type": "string",
            "enum": ["Easy", "Medium", "Hard"]
          },
          "query": {"type": "string"},
          "projected_answer": {"type": "string"}
        },
        "required": ["category", "urgency", "query", "projected_answer"]
      }
    },
    "strategic_outlook": {
      "type": "object",
      "properties": {
        "market_position": {"type": "string"},
        "growth_drivers": {
          "type": "array",
          "items": {"type": "string"}
        },
        "corporate_values": {
          "type": "array",
          "items": {"type": "string"}
        },
        "fiscal_strategy": {"type": "string"},
        "future_expectations": {"type": "string"},
        "additional_notes": {"type": "string"},
        "data_disclaimer": {
          "type": "string",
          "description": "Disclaimer if data points are estimated"
        }
      },
      "required": ["market_position", "growth_drivers", "corporate_values", "fiscal_strategy", "future_expectations", "additional_notes"]
    }
  },
  "required": [
    "entity_name",
    "fiscal_period",
    "swot_analysis",
    "valuation_metrics",
    "glossary_of_terms",
    "due_diligence_qa",
    "strategic_outlook"
  ]
}

analyst_schema = {
  "type": "object",
  "properties": {
    "company_profile": {
      "type": "object",
      "properties": {
        "legal_name": {"type": "string"},
        "sector": {"type": "string"},
        "primary_contact": {"type": "string"},
        "contact_details": {"type": "string"},
        "headquarters": {"type": "string"},
        "revenue_streams": {
          "type": "array",
          "items": {"type": "string"}
        },
        "executive_summary": {"type": "string"}
      },
      "required": ["legal_name", "sector", "headquarters", "executive_summary", "revenue_streams"]
    },
    "viability_assessment": {
      "type": "object",
      "properties": {
        "performance_score": {"type": "number"},
        "outlook": {"type": "string", "enum": ["excellent", "good", "poor"]},
        "operational_efficiency": {"type": "number"},
        "governance_score": {"type": "number"},
        "revenue_growth_score": {"type": "number"},
        "market_fit_score": {"type": "number"}
      },
      "required": ["performance_score", "outlook", "operational_efficiency", "governance_score", "revenue_growth_score"]
    },
    "operational_deep_dive": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "metricsByCategory": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "category": { "type": "string" },
                  "kpis": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "metric": { "type": "string" },
                        "current_level": { "type": "number" },
                        "target_level": { "type": "number" },
                        "variance": {
                          "type": "string",
                          "enum": ["exceeds", "meets", "below", "missing"]
                        }
                      },
                      "required": ["metric", "current_level", "target_level", "variance"]
                    }
                  }
                },
                "required": ["category", "kpis"]
              }
            },
            "performance_distribution": {
              "type": "object",
              "properties": {
                "exceeds": { "type": "number" },
                "meets": { "type": "number" },
                "below": { "type": "number" },
                "missing": { "type": "number" }
              },
              "required": ["exceeds", "meets", "below", "missing"]
            }
          },
          "required": ["metricsByCategory", "performance_distribution"]
        }
      },
      "required": ["data"]
    },
    "governance": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "structure": {"type": "string"},
          "board_oversight": {"type": "string"},
          "jurisdiction": {"type": "string"},
          "focus_area": {"type": "string"},
          "compliance_notes": {
            "type": "array",
            "items": {"type": "string"}
          }
        },
        "required": ["structure", "board_oversight", "compliance_notes"]
      }
    },
    "fiscal_history": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "financial_year": {"type": "string"},
          "reporting_entity": {"type": "string"},
          "region": {"type": "string"},
          "period_start": {"type": "string"},
          "period_end": {"type": "string"},
          "key_activities": {
            "type": "array",
            "items": {"type": "string"}
          },
          "relevance_to_outlook": {"type": "string", "enum": ["High", "Medium", "Low"]}
        },
        "required": ["financial_year", "reporting_entity", "key_activities", "relevance_to_outlook"]
      }
    },
    "structural_vulnerabilities": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "issue_name": {"type": "string"},
          "mitigation_plan": {"type": "string"},
          "risk_level": {"type": "string", "enum": ["Critical Gap", "Minor Gap"]},
          "severity_rating": {"type": "string", "enum": ["High", "Medium", "Low"]}
        },
        "required": ["issue_name", "mitigation_plan", "risk_level", "severity_rating"]
      }
    },
    "stakeholder_queries": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "priority": {"type": "string", "enum": ["High", "Medium", "Low"]},
          "category": {"type": "string", "enum": ["fiscal", "operational", "compliance", "strategic"]},
          "query": {"type": "string"},
          "rationale": {"type": "string"}
        },
        "required": ["priority", "category", "query", "rationale"]
      }
    },
    "analyst_outlook": {
      "type": "object",
      "properties": {
        "stance": {"type": "string", "enum": ["Strong Yes", "Yes", "Consider", "No"]},
        "narrative_summary": {"type": "string"},
        "core_strengths": {
          "type": "array",
          "items": {"type": "string"}
        },
        "material_risks": {
          "type": "array",
          "items": {"type": "string"}
        },
        "strategic_recommendations": {
          "type": "array",
          "items": {"type": "string"}
        }
      },
      "required": ["stance", "narrative_summary", "core_strengths", "material_risks"]
    }
  }
}
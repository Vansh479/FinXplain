

export interface ReportContent {
  role: string; 
  company: string;
  swot_analysis: SwotAnalysisData;
  company_insights: CompanyInsightsData;
  skill_assessment: SkillAssessmentData;
  concept_refresh: ConceptRefreshItem[];
  risk_assessment_queries: RiskQueryItem[]; 
  [key: string]: any; 
}

export interface SwotAnalysisData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CompanyInsightsData {
  additional_info?: string;
  company_overview: string;
  company_values?: string[];
  culture_points?: string[]; 
  expectations?: string;
}

export interface SkillAssessmentData {
  match_percentage: number;
  matched_skills: string[]; 
  missing_skills: string[]; 
  partial_matches?: string[]; 
}

export interface ConceptRefreshItem {
  id?: string | number;
  concept: string;
  explanation: string;
  resources?: Array<{ name: string; url: string }>;
}

export interface RiskQueryItem {
  id?: string | number;
  question: string;
  rationale?: string; 
  category?: 'Macro' | 'Sector' | 'Operational' | string;
  urgency?: 'Low' | 'Medium' | 'High'; 
}

export interface ReportFromRedux {
  id: number | string;
  report_type: 'investor' | 'analyst' | string; 
  content: ReportContent | string; 
}

export interface FormattedReport {
  id: number | string;
  professionalRole: string; 
  company: string;
  fiscalFileName: string; 
  generatedDate: string; 
  swotAnalysis: SwotAnalysisData;
  companyInsights: CompanyInsightsData; 
  skillAssessment: SkillAssessmentData;
  conceptRefresh: ConceptRefreshItem[];
  riskQueries: RiskQueryItem[];
}
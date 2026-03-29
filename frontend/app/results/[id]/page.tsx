"use client";

import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import AnalystReportPage from "@/components/results/analyst-report";
import InvestorReportPage from "@/components/results/investor-report";

function ResultsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { id } = useParams() as { id: string };

  useEffect(() => { setIsMounted(true); }, []);

  const report = useSelector((state: RootState) =>
    state.reports.reports.find((cs) => String(cs.id) === String(id))
  );

  if (!isMounted) return null;

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-500">
        Report {id} not found. Please do not refresh the page.
      </div>
    );
  }

  if (report.reportssheet_type === "analyst") {
    const analystData = {
      fin: (report.content as any)?.role || "Strategic Analysis",
      company: (report.content as any)?.company || "Target Entity",
      fiscalName: report.filename,
      generatedDate: report.generated_at,
      swotAnalysis: (report.content as any)?.swot_analysis,
      companyInsights: (report.content as any)?.company_insights,
    };
    return <AnalystReportPage sheet={analystData} />;
  }

  if (report.reportssheet_type === "investor") {
    const investorData = {
      fiscalName: report.filename,
      generatedDate: report.generated_at,
      analyst: {
        full_name: (report.content as any)?.company || "Market Entity",
        current_fi_title: (report.content as any)?.role || "Sector Focus",
        analyst_summary: (report.content as any)?.analyst_overview?.analyst_summary || "Synthesis...",
      },
      interviewRecommendation: (report.content as any)?.interview_recommendation,
      screeningQuestions: (report.content as any)?.screening_questions,
    };
    return <InvestorReportPage sheet={investorData} />;
  }

  return <div>Incompatible Schema</div>;
}

export default withAuth(ResultsPage);
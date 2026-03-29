"use client";

import { Navbar } from "@/components/navbar";
import { ResultsHeader } from "@/components/results-header";
import { SwotAnalysis } from "@/components/swot-analysis";
import { CompanyInsights } from "@/components/company-insights";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Share2, ShieldCheck } from "lucide-react";

export default function AnalystReportPage({ sheet }: any) {
  // Mapping legacy 'fin' to professional sector/focus
  const reportMetadata = {
    title: sheet?.fin || "Strategic Fiscal Analysis",
    company: sheet?.company || "Target Entity",
    source: sheet?.fiscalName || "Uploaded_Report.pdf",
    date: sheet?.generatedDate || new Date().toLocaleDateString(),
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ResultsHeader
        fin={reportMetadata.title}
        company={reportMetadata.company}
        fiscalName={reportMetadata.source}
        generatedDate={reportMetadata.date}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-teal-600 mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Analyst Grade Report</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Fiscal Performance Synthesis
                </h1>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="gap-2 border-slate-200">
                  <FileText className="h-4 w-4" /> Save Analysis
                </Button>
                <Button variant="outline" size="sm" className="gap-2 border-slate-200">
                  <Printer className="h-4 w-4" /> Print
                </Button>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-slate-600 leading-relaxed">
                This report provides a grounded synthesis of the provided fiscal data. 
                The analysis focuses on internal strengths, operational vulnerabilities, 
                and long-term strategic positioning extracted via RAG-driven inference.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* We only keep the high-value financial components */}
          <SwotAnalysis data={sheet?.swotAnalysis} />
          <CompanyInsights data={sheet?.companyInsights} />
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-500 text-sm mb-6">
            Was this RAG-generated analysis accurate to the source document?
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8">
              Accurate
            </Button>
            <Button variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 px-8">
              Needs Calibration
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
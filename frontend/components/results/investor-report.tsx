"use client";

import { Navbar } from "@/components/navbar";
import { ResultsHeader } from "@/components/results-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, TrendingUp, AlertTriangle, Info } from "lucide-react";

export default function InvestorReportPage({ sheet }: any) {
 
  const sentiment = sheet?.interviewRecommendation?.proceed || "consider";
  
  const getSentimentBadge = (val: string) => {
    const s = val.toLowerCase();
    if (s === "proceed") return <Badge className="bg-green-600">Bullish / Strong Growth</Badge>;
    if (s === "reject") return <Badge className="bg-red-600">Bearish / High Risk</Badge>;
    return <Badge className="bg-amber-500">Neutral / Observational</Badge>;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ResultsHeader
        fin={sheet?.analyst?.full_name || "Fiscal Review"}
        company={sheet?.analyst?.current_fi_title || "Market Entity"}
        fiscalName={sheet?.fiscalName}
        generatedDate={sheet?.generatedDate}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Investor Sentiment Deep-Dive</h1>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-2 bg-white"><Download className="h-4 w-4" /> PDF</Button>
            <Button variant="outline" size="sm" className="gap-2 bg-white"><Printer className="h-4 w-4" /> Print</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-sm uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Market Outlook
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-center">
                <div className="mb-4">{getSentimentBadge(sentiment)}</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {sheet?.analyst?.analyst_summary || "Synthesis of fiscal health and growth projections."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <CardTitle className="text-sm uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Info className="h-4 w-4" /> Fiscal Data Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Source Entity</span><span className="font-bold">{sheet?.analyst?.full_name}</span></div>
                  <div className="flex justify-between"><span>Reporting Period</span><span className="font-bold">FY25 Standard</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> Key Risk & Opportunity Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sheet?.screeningQuestions?.map((q: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg bg-slate-100 border border-slate-200">
                      <p className="font-bold text-slate-900 mb-2">{q.question}</p>
                      <p className="text-sm text-slate-600 italic">RATIONALE: {q.why_ask}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-900 text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Investment Justification</h3>
                <p className="text-slate-300 leading-relaxed">
                  {sheet?.interviewRecommendation?.justification || "Strategic analysis of capital allocation and fiscal resilience."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function ReportsPanel() {
  const reports = useSelector((state: RootState) => state.reports.reports);

  if (reports.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No analysis history found</h3>
        <p className="text-slate-500 mb-6 max-w-xs mx-auto text-sm">You haven't processed any fiscal reports yet. Start your first RAG analysis.</p>
        <Button className="bg-teal-600 hover:bg-teal-700" asChild>
          <Link href="/analysis">Launch Engine</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => {
        const isAnalyst = report.reportssheet_type === "analyst" || report.reportssheet_type === "analyst";
        
        return (
          <Card key={report.id} className="group overflow-hidden border-slate-200 hover:border-teal-500/50 transition-all">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1">
                    {(report.content as any).company || "Fiscal Analysis"}
                  </CardTitle>
                  <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
                    {report.filename}
                  </p>
                </div>
                <Badge variant="outline" className={isAnalyst ? "text-teal-600 border-teal-200 bg-teal-50" : "text-amber-600 border-amber-200 bg-amber-50"}>
                  {isAnalyst ? "Analyst View" : "Investor View"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-slate-100 rounded-lg">
                      {isAnalyst ? <TrendingUp className="h-4 w-4 text-slate-600" /> : <AlertCircle className="h-4 w-4 text-slate-600" />}
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-medium">Primary Focus</p>
                     <p className="text-sm text-slate-700 font-semibold truncate">
                        {isAnalyst ? "Fiscal Variance & KPI Tracking" : "Risk Exposure & Stakeholder Queries"}
                     </p>
                   </div>
                </div>

                <Button className="w-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-900 hover:text-white transition-colors" asChild>
                  <Link href={`/results/${report.id}`}>
                    <Eye className="h-4 w-4 mr-2" /> View Full Report
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
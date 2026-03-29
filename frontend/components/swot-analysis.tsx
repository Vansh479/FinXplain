"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Activity } from "lucide-react"

export function SwotAnalysis({ data }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader
        className="cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg"><Activity className="h-5 w-5 text-teal-700" /></div>
            <div>
              <CardTitle>Strategic SWOT Matrix</CardTitle>
              <CardDescription>Comprehensive Risk and Opportunity Assessment</CardDescription>
            </div>
          </div>
          {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-8 px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strengths & Weaknesses */}
            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-bold text-green-700 uppercase tracking-[0.2em] mb-4 flex items-center">
                  Internal Strengths
                </h3>
                <ul className="space-y-3">
                  {data?.strengths.map((item: any, i: number) => (
                    <li key={i} className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-bold text-red-700 uppercase tracking-[0.2em] mb-4 flex items-center">
                  Operational Vulnerabilities
                </h3>
                <ul className="space-y-3">
                  {data?.weaknesses.map((item: any, i: number) => (
                    <li key={i} className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Opportunities & Threats */}
            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-bold text-blue-700 uppercase tracking-[0.2em] mb-4 flex items-center">
                  Market Opportunities
                </h3>
                <ul className="space-y-3">
                  {data?.opportunities.map((item: any, i: number) => (
                    <li key={i} className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] mb-4 flex items-center">
                  External Threats
                </h3>
                <ul className="space-y-3">
                  {data?.threats.map((item: any, i: number) => (
                    <li key={i} className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
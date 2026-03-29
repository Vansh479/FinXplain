"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Building, ShieldCheck, Landmark, BarChart, Globe, Info } from "lucide-react"

interface CompanyInsightsProps {
  data: {
    company_overview: string;
    company_values: string[];
    culture_points: string[];
    expectations: string;
    interview_style: string;
    additional_info?: string;
    fallback: string;
  };
}

export function CompanyInsights({ data }: CompanyInsightsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader
        className="cursor-pointer bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Institutional Insights</CardTitle>
            <CardDescription className="text-slate-400">Strategic Context & Operational Pillars</CardDescription>
          </div>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-8 px-8">
          <div className="space-y-8">
            {/* Entity Overview */}
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" /> Entity Overview
              </h3>
              <p className="text-slate-700 leading-relaxed">{data?.company_overview || data?.fallback}</p>
            </div>

            {/* Strategy + Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                  <Landmark className="h-4 w-4 mr-2" /> Operational Pillars
                </h3>
                <ul className="space-y-3">
                  {data?.culture_points?.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2" /> Strategic Values
                </h3>
                <ul className="space-y-3">
                  {data?.company_values?.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fiscal Strategy */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center uppercase tracking-tighter">
                <BarChart className="h-4 w-4 mr-2 text-teal-600" /> Risk Management & Fiscal Strategy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {data?.interview_style || data?.fallback}
              </p>
            </div>

            {/* Market Expectations */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center uppercase tracking-tighter">
                <Globe className="h-4 w-4 mr-2 text-teal-600" /> Market Guidance & Analyst Expectations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {data?.expectations || data?.fallback}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
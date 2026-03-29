import { CalendarDays, Landmark, FileCheck } from "lucide-react";

interface ResultsHeaderProps {
  fin: string;
  company: string;
  fiscalName?: string;
  generatedDate?: string;
}

export function ResultsHeader({ fin, company, fiscalName, generatedDate }: ResultsHeaderProps) {
  const date = generatedDate ? new Date(generatedDate).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  }) : "Recent";

  return (
    <div className="bg-slate-900 text-white shadow-inner">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-[0.3em]">
              <Landmark className="h-3 w-3" /> Targeted Fiscal Audit
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">{company}</h1>
            <p className="text-slate-400 font-medium text-lg">Focus: {fin}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="flex items-center text-slate-300">
              <FileCheck className="h-4 w-4 mr-2 text-teal-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-bold">Source document</span>
                <span className="text-sm truncate max-w-[150px]">{fiscalName}</span>
              </div>
            </div>
            <div className="flex items-center text-slate-300">
              <CalendarDays className="h-4 w-4 mr-2 text-teal-500" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-bold">Analysis date</span>
                <span className="text-sm">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
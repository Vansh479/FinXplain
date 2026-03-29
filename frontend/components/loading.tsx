import { Loader2, Database, ShieldCheck, FileText, Cpu } from "lucide-react"

export default function Loading() {
  const steps = [
    { label: "Parsing document structure", icon: <FileText className="h-4 w-4" />, status: "complete" },
    { label: "Vectorizing fiscal data", icon: <Database className="h-4 w-4" />, status: "processing" },
    { label: "Grounding research query", icon: <ShieldCheck className="h-4 w-4" />, status: "pending" },
    { label: "Synthesizing financial report", icon: <Cpu className="h-4 w-4" />, status: "pending" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        <div className="relative mb-10">
          <div className="w-32 h-32 rounded-3xl border-4 border-slate-100 animate-pulse mx-auto flex items-center justify-center">
             <div className="w-16 h-16 border-4 border-t-teal-600 border-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-900 font-black text-xl tracking-tighter">RAG</span>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Executing Analysis</h2>
        <p className="text-slate-500 mb-10 font-medium">
          Mapping data points and eliminating hallucinations...
        </p>

        <div className="space-y-3 mb-10">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center p-4 rounded-xl border transition-all ${
              step.status === 'complete' ? 'bg-teal-50 border-teal-100 text-teal-700' : 
              step.status === 'processing' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              <div className="mr-4">{step.icon}</div>
              <span className="text-sm font-bold flex-1 text-left">{step.label}</span>
              {step.status === 'processing' && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Processing Pipeline v2.5
        </div>
      </div>
    </div>
  )
}
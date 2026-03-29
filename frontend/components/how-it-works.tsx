import { Database, FileSearch, TrendingUp, ShieldCheck } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Database className="h-6 w-6 text-teal-600" />,
      title: "Report Ingestion",
      description: "Upload dense annual reports or SEC filings. Our system parses the underlying fiscal structure.",
    },
    {
      icon: <FileSearch className="h-6 w-6 text-teal-600" />,
      title: "Define Research Scope",
      description: "Input your query focus—from debt serviceability to operational margin variance.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-teal-600" />,
      title: "RAG Processing",
      description: "Our engine performs a vector search to ground the AI response in verified source text.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
      title: "Fiscal Synthesis",
      description: "Receive a professional deep-dive report formatted for analysts and stakeholders.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 px-4 md:px-6 bg-slate-50/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Analysis Methodology</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:border-teal-500 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-900 text-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <ShieldCheck className="h-6 w-6 text-teal-400 mr-3" />
            The FinXplain Standard
          </h3>
          <p className="text-slate-400 mb-8 max-w-2xl">Every analysis output is strictly mapped to citations within your document, providing:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Grounded SWOT analysis with document citations",
              "Executive sentiment tracking and risk assessment",
              "Key performance metric extraction",
              "Stakeholder inquiry simulations",
              "Hallucination-free operational deep-dives",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm font-medium">
                <div className="h-1.5 w-1.5 bg-teal-500 rounded-full" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
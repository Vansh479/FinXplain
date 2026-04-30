import { FileText, BarChart3, Sparkles, Search } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      title: "Upload PDF Reports",
      description: "Upload financial reports (PDF format, up to 50MB, 5 files at once).",
    },
    {
      icon: <Search className="h-8 w-8 text-teal-600" />,
      title: "Ask Questions",
      description: "Ask specific questions about the report content. The system reads the document to find answers.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-teal-600" />,
      title: "Analyst Mode",
      description: "Get a structured deep-dive with company profile, operational metrics, risks, and governance insights.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-teal-600" />,
      title: "Investor Mode",
      description: "Get an investment-focused view with SWOT analysis, valuation metrics, and growth outlook.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">What It Does</h2>
          <p className="text-slate-500">Upload financial PDFs and get answers grounded in the document content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="border border-slate-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="mb-4 flex justify-center p-3 bg-teal-50 rounded-xl w-max mx-auto">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

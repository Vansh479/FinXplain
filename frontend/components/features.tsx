import { Card, CardContent } from "@/components/ui/card"
import { FileSearch, Activity, Gavel, TrendingUp } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <FileSearch className="h-10 w-10 text-teal-600" />,
      title: "Automated Report Ingestion",
      description: "Instantly parse complex PDFs and SEC filings. Our RAG engine chunks and indexes text for high-precision retrieval.",
    },
    {
      icon: <Activity className="h-10 w-10 text-teal-600" />,
      title: "Fiscal SWOT Analysis",
      description:
        "Go beyond numbers. Extract strategic narratives, internal vulnerabilities, and operational growth drivers automatically.",
    },
    {
      icon: <Gavel className="h-10 w-10 text-teal-600" />,
      title: "Governance & Compliance",
      description: "Evaluate board oversight and regulatory adherence using industry-standard financial grounding protocols.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-teal-600" />,
      title: "Market Intelligence",
      description: "Benchmarking performance against multi-year fiscal trends to identify sustainable competitive advantages.",
    },
  ]

  return (
    <section id="features" className="py-24 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Precision Intelligence for Modern Analysts</h2>
            <p className="text-slate-500 text-lg">FinXplain uses advanced vector search to ensure every insight is grounded in source documentation, eliminating the risk of LLM hallucinations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center p-3 bg-teal-50 rounded-2xl w-max mx-auto">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
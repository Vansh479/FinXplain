import { Upload, MessageSquare, FileSearch, BarChart3 } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-6 w-6 text-teal-600" />,
      title: "1. Upload",
      description: "Upload one or more financial PDF reports.",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-teal-600" />,
      title: "2. Ask",
      description: "Type your question about the uploaded document.",
    },
    {
      icon: <FileSearch className="h-6 w-6 text-teal-600" />,
      title: "3. Process",
      description: "The system reads the document and finds relevant information.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-teal-600" />,
      title: "4. Get Answer",
      description: "Receive a response grounded in your document, or choose Analyst/Investor mode for a structured report.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-6 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

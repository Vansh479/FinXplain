"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Hero() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = typeof accessToken === "string" && accessToken.trim() !== "";
  
  // Updated to match our folder rename
  const linkHref = isLoggedIn ? "/analysis" : "/auth/login";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const middle = element.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / 2;
      window.scrollTo({ top: middle, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
          <div className="flex-1 space-y-6 max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-center lg:text-left text-slate-900 leading-[1.1]">
              Decode Fiscal Data with <span className="text-teal-600">FinXplain AI</span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start mt-3 mb-4">
              <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center tracking-wide uppercase">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400 mr-2" />
                Stateless RAG Engine • Gemini 2.5 Grounding
              </div>
            </div>

            <p className="text-xl text-slate-600 max-w-2xl text-center lg:text-left leading-relaxed">
              Upload dense annual reports and SEC filings. Our AI-driven engine 
              extracts verified financial metrics, SWOT insights, and risk assessments 
              in seconds. No hallucinations—just grounded data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 h-12 px-8 text-md font-semibold shadow-lg shadow-teal-600/20"
              >
                <Link href={linkHref}>
                  Launch Analysis Engine <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-md border-slate-200"
                onClick={() => scrollToSection("features")}
              >
                View Methodology
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Dynamic decorative background */}
              <div className="absolute inset-0 bg-teal-400 rounded-3xl rotate-6 opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-slate-900 rounded-3xl -rotate-3 opacity-5"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-12 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
                   <BarChart3 className="h-24 w-24 text-teal-600 mb-4" />
                   <div className="h-2 w-32 bg-slate-100 rounded-full mb-2"></div>
                   <div className="h-2 w-24 bg-slate-50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>
  );
}
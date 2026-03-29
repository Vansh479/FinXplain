'use client';

import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isTokenExpired } from "@/utils";

export default function Home() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  
  const isLoggedIn = accessToken && !isTokenExpired(accessToken);
  
  const linkHref = isLoggedIn ? "/analysis" : "/auth/login";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <Hero />

      <section id="architecture" className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-semibold tracking-wide uppercase">Stateless RAG Architecture</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-sm font-semibold tracking-wide uppercase font-mono text-teal-700">Zero-Hallucination Guardrails</span>
            </div>
          </div>
        </div>
      </section>

      <div id="features">
        <Features />
      </div>

      <section id="analysis-cta" className="py-24 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 via-transparent to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
            Ready to decode complex fiscal data?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Leverage our proprietary grounding engine to extract verified insights from annual reports, ESG spreads, and SEC filings in seconds.
          </p>
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 h-14 px-10 text-lg shadow-lg shadow-teal-500/20">
              <Link href={linkHref}>
                Launch Analysis Engine <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
          </Button>
        </div>
      </section>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      <Footer />
    </main>
  );
}
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, ShieldCheck, Globe } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const middle = element.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / 2;
      window.scrollTo({ top: middle, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-6 w-6 text-teal-400" />
              <h3 className="text-2xl font-bold text-white">FinXplain AI</h3>
            </div>
            <p className="mb-6 max-w-md text-slate-400 leading-relaxed">
              Advancing fiscal transparency through RAG-powered analysis. 
              Our engine transforms complex annual reports into actionable financial insights for modern analysts.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-500" /> Secure Processing
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-teal-500" /> Global Standards
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Home Portal</Link></li>
              <li><span onClick={() => scrollToSection("features")} className="hover:text-teal-400 transition-colors cursor-pointer">Engine Features</span></li>
              <li>
                <Link href="/frameworks" className="text-teal-400 hover:text-white font-medium transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> Analysis Frameworks
                  <span className="ml-2 bg-teal-500/20 text-teal-400 text-[10px] px-1.5 py-0.5 rounded-full border border-teal-500/30">PRO</span>
                </Link>
              </li>
              <li><Link href="/analysis" className="hover:text-teal-400 transition-colors">Launch Engine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-widest text-xs">Compliance</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-teal-400 transition-colors cursor-pointer">Privacy Protocol</li>
              <li className="hover:text-teal-400 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-teal-400 transition-colors cursor-pointer">Data Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FinXplain AI Research. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-teal-400 cursor-default transition-colors">v2.5 Stable</span>
            <span className="hover:text-teal-400 cursor-default transition-colors">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
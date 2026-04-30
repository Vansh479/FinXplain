"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-teal-400" />
            <h3 className="text-lg font-bold text-white">FinXplain AI</h3>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <Link href="/analysis" className="hover:text-teal-400 transition-colors">Analysis Engine</Link>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} FinXplain AI
        </div>
      </div>
    </footer>
  );
}

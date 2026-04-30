"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function Hero() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = typeof accessToken === "string" && accessToken.trim() !== "";
  const linkHref = isLoggedIn ? "/analysis" : "/auth/login";

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
          <div className="flex-1 space-y-6 max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center lg:text-left text-slate-900 leading-[1.1]">
              Upload financial reports and get answers
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl text-center lg:text-left leading-relaxed">
              Upload PDF reports and ask questions about them. FinXplain reads the document and answers based on what is in the file. Choose between Analyst mode for detailed metrics or Investor mode for strategic insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 h-12 px-8 text-md font-semibold shadow-lg shadow-teal-600/20">
                <Link href={linkHref}>
                  Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-md border-slate-200" asChild>
                <Link href="/auth/signup">Create Account</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
                <BarChart3 className="h-20 w-20 text-teal-600 mb-4" />
                <p className="text-sm text-slate-500 text-center">Upload a PDF and ask questions about it</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

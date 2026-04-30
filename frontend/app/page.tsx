'use client';

import { Button } from "@/components/ui/button";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <section className="py-20 px-4 md:px-6 bg-slate-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to try it?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Upload a financial report and ask questions about it.
        </p>
        <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 h-12 px-8 text-md">
          <Link href={linkHref}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
      <Footer />
    </main>
  );
}

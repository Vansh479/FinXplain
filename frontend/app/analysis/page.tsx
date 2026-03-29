import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReportAnalysisEngine } from "@/components/report-analysis-engine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Analysis Engine | FinXplain AI",
  description: "Execute deep-dive RAG analysis on pre-loaded fiscal reports.",
};

export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <ReportAnalysisEngine />
      <Footer />
    </main>
  );
}
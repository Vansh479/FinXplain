import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/components/redux-provider";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinXplain AI | Professional Financial Insights",
  description: "Advanced RAG engine for deep-dive financial analysis and automated fiscal report grounding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Layout>
          {children}
          <Toaster />
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
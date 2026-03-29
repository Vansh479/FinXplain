import type React from "react";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthLayout({
  children,
  heading,
  subheading,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="flex items-center justify-center text-2xl font-bold text-slate-900 transition-all hover:opacity-80"
        >
          <BarChart3 className="mr-2 h-8 w-8 text-teal-600" />
          FinXplain AI
        </Link>

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{heading}</h1>
          <p className="text-slate-500 font-medium">{subheading}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          {children}
        </div>

        {footerText && footerLinkText && footerLinkHref && (
          <div className="text-center text-sm text-slate-600">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-semibold text-teal-600 hover:text-teal-700 underline-offset-4 hover:underline">
              {footerLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
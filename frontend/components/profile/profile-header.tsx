"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, BarChart3 } from "lucide-react";
import Link from "next/link";

interface ProfileHeaderProps {
  userDetails: {
    name: string;
    email: string;
    professionalRole?: string;
  };
}

export function ProfileHeader({ userDetails }: ProfileHeaderProps) {
  const initials = userDetails.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <Avatar className="h-24 w-24 border-4 border-teal-500/20">
            <AvatarFallback className="text-2xl bg-teal-600 text-white font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-3xl font-extrabold tracking-tight">{userDetails.name}</h1>
              <span className="hidden md:block text-slate-700">|</span>
              <div className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-500/20 inline-block mx-auto md:mx-0">
                Verified Analyst
              </div>
            </div>
            <p className="text-slate-400 font-medium">{userDetails.email}</p>
            <p className="text-slate-300 italic">{userDetails.professionalRole || "Financial Researcher"}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800 text-slate-300" asChild>
              <Link href="/analysis">
                <BarChart3 className="h-4 w-4 mr-2" />
                New Analysis
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
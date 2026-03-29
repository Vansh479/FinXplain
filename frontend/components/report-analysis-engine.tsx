"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { TrendingUp, Wallet, FileSearch, ShieldCheck, Bot, RefreshCcw, User, ChevronRight, Info, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploader } from "@/components/file-uploader";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/loading";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { apiBaseURL } from "@/utils";

export function ReportAnalysisEngine() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fiDescription, setfiDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [reportssheetType, setreportssheetType] = useState("analyst"); 
  const [chatResponse, setChatResponse] = useState<any | null>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const wordCount = fiDescription.trim() === "" ? 0 : fiDescription.trim().split(/\s+/).length;

  useEffect(() => { setIsMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount < 5) return;

    setIsSubmitting(true);
    setChatResponse(null);

    const formData = new FormData();
    if (uploadedFile) formData.append("fiscal_pdf", uploadedFile);     
    formData.append("fi_description", fiDescription);     
    formData.append("reportssheet_type", reportssheetType);

    const token = accessToken || localStorage.getItem("token");

    try {
      const response = await fetch(`${apiBaseURL}/analysis/query`, {
        method: "POST",
        body: formData,
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      setChatResponse(data.data);
      
      setTimeout(() => responseRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err: any) {
      toast({ title: "Engine Error", description: "The RAG pipeline failed.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🟢 Recursive Renderer: Prevents [object Object]
  const renderValue = (val: any): React.ReactNode => {
    if (val === null || val === undefined) return "N/A";
    if (Array.isArray(val)) {
      return (
        <ul className="list-disc pl-5 space-y-2 mt-2">
          {val.map((item, i) => <li key={i} className="text-slate-600">{typeof item === 'object' ? renderValue(item) : String(item)}</li>)}
        </ul>
      );
    }
    if (typeof val === 'object') {
      return (
        <div className="grid grid-cols-1 gap-3 mt-2">
          {Object.entries(val).map(([k, v]) => (
            <div key={k} className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest block mb-1">{k.replace(/_/g, ' ')}</span>
              <div className="text-slate-700 text-sm">{renderValue(v)}</div>
            </div>
          ))}
        </div>
      );
    }
    return String(val);
  };

  if (!isMounted) return null;

  return (
    <section className="py-12 px-4 md:px-6 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-black uppercase tracking-widest">
            <Layers className="h-3 w-3" /> Hybrid RAG Engine
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Financial Intelligence</h1>
        </div>

        <Card className="shadow-lg border-slate-200 mb-8 overflow-hidden bg-white">
          <CardContent className="p-6 space-y-6">
            <div className="flex bg-blue-50/50 border border-blue-100 p-3 rounded-xl gap-3">
              <Info className="h-4 w-4 text-blue-500 mt-1 shrink-0" />
              <p className="text-[11px] text-blue-800 leading-relaxed">
                <strong>Knowledge Base Active:</strong> Query the TCS 2024 reports or upload a supplementary PDF.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-end justify-between">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">View Mode</label>
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button type="button" onClick={() => setreportssheetType("analyst")} className={`px-4 py-1.5 rounded-md text-sm font-bold ${reportssheetType === "analyst" ? "bg-white shadow-sm text-teal-700" : "text-slate-500"}`}>Analyst</button>
                  <button type="button" onClick={() => setreportssheetType("investor")} className={`px-4 py-1.5 rounded-md text-sm font-bold ${reportssheetType === "investor" ? "bg-white shadow-sm text-teal-700" : "text-slate-500"}`}>Investor</button>
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                 <FileUploader onFileUploaded={() => {}} onFileSelect={(file) => setUploadedFile(file)} />
              </div>
            </div>

            <div className="relative">
              <Textarea
                placeholder="Ask about revenue, EBITDA, or financial definitions..."
                className="min-h-[120px] pr-14 border-slate-200 focus:ring-teal-500 bg-slate-50/30 text-md rounded-2xl"
                value={fiDescription}
                onChange={(e) => setfiDescription(e.target.value)}
              />
              <Button onClick={handleSubmit} disabled={isSubmitting || wordCount < 5} className="absolute bottom-3 right-3 bg-teal-600 hover:bg-teal-700 h-10 w-10 p-0 rounded-full">
                {isSubmitting ? <RefreshCcw className="h-5 w-5 animate-spin" /> : <FileSearch className="h-5 w-5" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div ref={responseRef} className="space-y-8 pb-20">
          {isSubmitting && <Loading />}
          {chatResponse && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-end mb-8">
                <div className="bg-teal-600 text-white px-5 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-md">
                   <p className="text-sm font-medium">{fiDescription}</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-8 py-8 rounded-3xl rounded-tl-none max-w-[100%] shadow-2xl">
                  <div className="flex items-center gap-2 mb-8 text-[11px] font-black text-teal-600 uppercase border-b border-slate-100 pb-5 tracking-widest">
                    <Bot className="h-5 w-5" /> FinXplain AI Intelligence
                  </div>
                  
                  <div className="space-y-10">
                    {chatResponse.reportssheet_type === "chat" || typeof chatResponse.content === 'string' ? (
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{String(chatResponse.content)}</p>
                    ) : (
                      Object.entries(chatResponse.content).map(([key, value]) => {
                        if (['id', 'status'].includes(key.toLowerCase())) return null;
                        return (
                          <div key={key} className="space-y-4">
                            <h4 className="text-[12px] font-black text-slate-800 uppercase flex items-center gap-2 tracking-tighter">
                              <ChevronRight className="h-4 w-4 text-teal-500" /> {key.replace(/_/g, ' ')}
                            </h4>
                            <div className="text-slate-600 text-sm leading-relaxed pl-6 border-l-2 border-teal-50">
                              {renderValue(value)}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
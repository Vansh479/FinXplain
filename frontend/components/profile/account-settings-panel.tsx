"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Mail, ShieldCheck, Lock, Trash2 } from "lucide-react";

export function AccountSettingsPanel({ settingsData }: { settingsData: { email: string } }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({ title: "Email Sent", description: "Verification link dispatched to " + settingsData.email });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900">
            <Mail className="h-5 w-5 mr-2 text-teal-600" /> Security & Access
          </CardTitle>
          <CardDescription>Manage your institutional credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-600">Access Email</Label>
            <Input value={settingsData.email} disabled className="bg-slate-50 border-slate-200" />
          </div>
          <div className="pt-4 border-t flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">Credential Reset</p>
              <p className="text-xs text-slate-500">Update your security handshake</p>
            </div>
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              <Lock className="h-4 w-4 mr-2" /> Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100 bg-red-50/30">
        <CardHeader>
          <CardTitle className="text-red-600 text-lg flex items-center">
             <Trash2 className="h-5 w-5 mr-2" /> Data Deletion
          </CardTitle>
          <CardDescription className="text-red-500/80">
            Permanently wipe all vector embeddings and report history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Delete Analyst Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
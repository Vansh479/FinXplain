"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { apiBaseURL } from "@/utils";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid analyst email address" }),
    password: z
      .string()
      .min(8, { message: "Minimum 8 characters required" })
      .regex(/[A-Z]/, { message: "Include one uppercase letter" })
      .regex(/[0-9]/, { message: "Include one number" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "You must accept the terms of service"
    }),
    fin: z.string().optional(),
    location: z.string().optional(),
    research_focus: z.string().max(300).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "", email: "", password: "", confirmPassword: "",
      acceptTerms: false, fin: "", location: "", research_focus: "",
    },
    mode: "onChange",
  });

  const { formState: { errors, dirtyFields }, trigger, getValues, setValue } = form;

  const handleNextStep = async () => {
    const isValid = await trigger(["name", "email", "password", "confirmPassword", "acceptTerms"]);
    if (isValid) setCurrentStep(2);
  };

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        fi_title: data.fin || "Financial Analyst",
        location: data.location || "Global",
        research_focus: data.research_focus || "",
      };

      const response = await fetch(`${apiBaseURL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Registration failed. Email might be in use.");
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-xs font-semibold text-slate-500 uppercase tracking-tighter">
          <span>Verification Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progressPercentage} className="h-1.5 bg-slate-100" />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Analyst Name" {...form.register("name")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="analyst@firm.com" {...form.register("email")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...form.register("password")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm</Label>
                <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" onCheckedChange={(checked) => setValue("acceptTerms", checked === true, { shouldValidate: true })} />
              <Label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                I agree to the FinXplain Data Protocols and Privacy Standards.
              </Label>
            </div>

            <Button type="button" onClick={handleNextStep} className="w-full bg-teal-600 hover:bg-teal-700">
              Continue to Profile <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <Label htmlFor="fin">Professional Role</Label>
              <Input id="fin" placeholder="e.g. Investment Associate" {...form.register("fin")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Market / Region</Label>
              <Input id="location" placeholder="e.g. Mumbai, India" {...form.register("location")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="research_focus">Analysis Focus</Label>
              <Textarea id="research_focus" placeholder="Briefly describe your sector focus..." className="resize-none" {...form.register("research_focus")} />
            </div>

            <div className="pt-4 flex justify-between gap-4">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Complete Registration"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
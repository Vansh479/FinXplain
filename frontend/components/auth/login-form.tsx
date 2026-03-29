"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDispatch } from "react-redux";
import { loginAndStartTimer } from "@/redux/slices/authSlice";
import { setUserDetails } from "@/redux/slices/userSlice";
import { setreports } from "@/redux/slices/reportSlice";
import { apiBaseURL } from "@/utils";
import type { AppDispatch } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast"; 

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }
      
      const result = await response.json();

      if (result.access_token) {
        dispatch(loginAndStartTimer(result.access_token));
        
        const userRes = await fetch(`${apiBaseURL}/user/details`, {
          headers: { Authorization: `Bearer ${result.access_token}` },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          dispatch(setUserDetails(userData.user_details));
        }

        const reportsRes = await fetch(`${apiBaseURL}/user/reports`, {
          headers: { Authorization: `Bearer ${result.access_token}` },
        });
        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          dispatch(setreports(reportsData.reports));
        }

        toast({ 
          title: "Welcome to FinXplain", 
          description: "Engine access granted successfully." 
        });
        
        router.push("/analysis"); 
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="analyst@firm.com" 
          {...register("email")} 
          disabled={isLoading} 
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link 
            href="/auth/forgot-password" 
            className="text-xs text-teal-600 hover:underline"
          >
            Forgot?
          </Link>
        </div>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••"
          {...register("password")} 
          disabled={isLoading} 
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 mt-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Authorize Access"
        )}
      </Button>
    </form>
  );
}
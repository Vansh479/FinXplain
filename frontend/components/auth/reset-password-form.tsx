"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Minimum 8 characters" })
      .regex(/[A-Z]/, { message: "Must include an uppercase letter" })
      .regex(/[0-9]/, { message: "Must include a number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Security credentials do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(data: ResetPasswordFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Updating credentials...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/auth/reset-password-success");
    } catch (err) {
      setError("Failed to update credentials. Link may have expired.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">New Secure Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Secure Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          disabled={isLoading}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Finalizing...
          </>
        ) : (
          "Update Analyst Credentials"
        )}
      </Button>
    </form>
  );
}
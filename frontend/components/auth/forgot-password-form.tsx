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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid analyst email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to your backend
      console.log("Dispatching recovery for:", data.email);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to the check-email page we branded earlier
      router.push("/auth/check-email");
    } catch (err) {
      setError("System error during dispatch. Please try again.");
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
        <Label htmlFor="email">Registered Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="analyst@firm.com"
          disabled={isLoading}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Dispatching Link...
          </>
        ) : (
          "Request Access Reset"
        )}
      </Button>
    </form>
  );
}
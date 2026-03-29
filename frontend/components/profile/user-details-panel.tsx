"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Check } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  professionalRole: z.string().optional(),
  research_focus: z.string().max(500, { message: "Summary must be less than 500 characters" }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface UserDetailsPanelProps {
  userData: {
    name: string;
    professionalRole?: string;
    research_focus?: string;
  };
}

export function UserDetailsPanel({ userData }: UserDetailsPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData.name || "",
      professionalRole: userData.professionalRole || "",
      research_focus: userData.research_focus || "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      // In a real demo, this would hit your /user/update endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Analyst Profile Updated",
        description: "Your professional context has been saved.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 font-bold">Analyst Profile</CardTitle>
          <CardDescription>Define your professional role and research focus.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-semibold">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alex Rivers" {...field} className="border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="professionalRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-semibold">Professional Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Senior Equity Analyst" {...field} className="border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="research_focus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 font-semibold">Research Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your market sector or research goals..."
                        className="resize-none min-h-[120px] border-slate-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end gap-3 border-t pt-6">
              <Button variant="ghost" type="button" onClick={() => form.reset()} className="text-slate-500">
                Discard
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700 px-8">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Save Profile
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
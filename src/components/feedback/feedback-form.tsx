"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { analyzeFeedback } from "@/app/actions/feedback";
import type { RecommendationImprovement } from "@/ai/flows/analyze-crop-outcomes";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

const feedbackSchema = z.object({
  cropType: z.string().min(2, "Crop type is required."),
  yieldAmount: z.coerce.number().min(0, "Yield must be a positive number."),
  fertilizerUsed: z.string().min(2, "Fertilizer type is required."),
  irrigationSchedule: z.enum(["daily", "weekly", "bi-weekly", "monthly"]),
  pestControlUsed: z.string().min(2, "Pest control method is required."),
  weatherConditions: z.string().min(2, "Weather conditions are required."),
  soilType: z.enum(["sandy", "loamy", "clay", "silty", "peaty"]),
  farmerFeedback: z.string().min(10, "Please provide at least a brief feedback."),
  location: z.string().min(2, "Location is required."),
});

export function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [improvement, setImprovement] = useState<RecommendationImprovement | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      location: "Central Valley, California",
      soilType: "loamy",
    },
  });

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    setIsLoading(true);
    setImprovement(null);
    try {
      const result = await analyzeFeedback(values);
      setImprovement(result);
      toast({
        title: "Analysis Complete",
        description: "Our AI has provided improved recommendations based on your feedback.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not analyze feedback. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Submit Crop Outcome</CardTitle>
          <CardDescription>
            Your feedback is vital for tuning our AI models. Please provide details about your recent harvest.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="cropType" render={({ field }) => (
                <FormItem><FormLabel>Crop Type</FormLabel><FormControl><Input placeholder="e.g., Corn" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="yieldAmount" render={({ field }) => (
                <FormItem><FormLabel>Yield (kg/hectare)</FormLabel><FormControl><Input type="number" placeholder="e.g., 8500" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="fertilizerUsed" render={({ field }) => (
                <FormItem><FormLabel>Fertilizer Used</FormLabel><FormControl><Input placeholder="e.g., Nitrogen-rich" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="irrigationSchedule" render={({ field }) => (
                <FormItem><FormLabel>Irrigation Schedule</FormLabel><Select onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder="Select a schedule" /></SelectTrigger></FormControl><SelectContent><SelectItem value="daily">Daily</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="bi-weekly">Bi-weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="pestControlUsed" render={({ field }) => (
                <FormItem><FormLabel>Pest Control Used</FormLabel><FormControl><Input placeholder="e.g., Organic pesticides" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="weatherConditions" render={({ field }) => (
                <FormItem><FormLabel>Prevailing Weather</FormLabel><FormControl><Input placeholder="e.g., Mostly sunny with occasional rain" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="md:col-span-2">
                <FormField control={form.control} name="farmerFeedback" render={({ field }) => (
                  <FormItem><FormLabel>Your Observations</FormLabel><FormControl><Textarea placeholder="Describe the outcome, any issues faced, or successes observed." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Analyze Outcome
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {improvement && (
        <Card className="bg-accent/50 border-accent animate-in fade-in-50">
            <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Based on your feedback, here are some suggestions for next time:</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{improvement.improvedRecommendations}</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

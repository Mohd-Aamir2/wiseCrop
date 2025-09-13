"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const step2Schema = z.object({
  farmSize: z.coerce.number().min(0.1, "Farm size must be positive."),
  soilType: z.enum(["sandy", "loamy", "clay", "silty", "peaty"]),
  location: z.string().min(2, "Location is required."),
});

const step3Schema = z.object({
  cropPreference: z.string().min(2, "Crop preference is required."),
});

const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Your Details", fields: ["name", "email", "password"] as (keyof FormData)[] },
  { id: 2, title: "Farm Information", fields: ["farmSize", "soilType", "location"] as (keyof FormData)[] },
  { id: 3, title: "Farming Preferences", fields: ["cropPreference"] as (keyof FormData)[] },
];

export function MultiStepRegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      farmSize: "" as any,
      soilType: undefined,
      location: "",
      cropPreference: "",
    },
  });

  const processForm = async (data: FormData) => {
    // In a real app, you would submit this data to your backend.
    console.log("Form submitted:", data);
    toast({
      title: "Registration Successful!",
      description: "Your account has been created. Redirecting to dashboard...",
    });
    router.push("/dashboard");
  };

  type FieldName = keyof FormData;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    } else {
        await form.handleSubmit(processForm)();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>Join Kisaan to get personalized farm intelligence.</CardDescription>
        <Progress value={(currentStep + 1) / steps.length * 100} className="mt-2" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Farmer" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="farmer@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="farmSize" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Size (in acres)</FormLabel>
                        <FormControl><Input type="number" placeholder="50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="soilType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Predominant Soil Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a soil type" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="sandy">Sandy</SelectItem>
                            <SelectItem value="loamy">Loamy</SelectItem>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="silty">Silty</SelectItem>
                            <SelectItem value="peaty">Peaty</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (City/Region)</FormLabel>
                        <FormControl><Input placeholder="Central Valley, California" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 2 && (
                  <FormField control={form.control} name="cropPreference" render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your preferred crop to grow?</FormLabel>
                      <FormControl><Input placeholder="e.g., Corn, Wheat, Soybeans" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
                <Button type="button" variant="outline" onClick={prev} disabled={currentStep === 0}>
                    Previous
                </Button>
                <Button type="button" onClick={next}>
                    {currentStep === steps.length - 1 ? "Finish Registration" : "Next"}
                </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
      <div className="p-6 pt-0 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
    </Card>
  );
}

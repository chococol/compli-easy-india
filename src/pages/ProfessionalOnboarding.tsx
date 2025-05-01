
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
});

type FormData = z.infer<typeof formSchema>;

const ProfessionalOnboarding = () => {
  const { userProfile, completeProfessionalOnboarding } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      licenseNumber: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting professional onboarding data:", data);
      
      await completeProfessionalOnboarding({
        fullName: data.fullName,
        licenseNumber: data.licenseNumber,
      });
      
      toast({
        title: "Onboarding complete!",
        description: "Your professional profile has been set up.",
      });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Professional Onboarding</CardTitle>
            <CardDescription>
              Complete your {userProfile?.professionalType} profile to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your professional license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Complete Onboarding'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalOnboarding;

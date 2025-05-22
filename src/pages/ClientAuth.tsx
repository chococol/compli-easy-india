
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Logo from '@/components/Logo';

type AuthMode = 'signIn' | 'signUp';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const ClientAuth = () => {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const { signIn, signUp, user, isOnboardingComplete } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Set the mode based on URL parameter if present
    const urlMode = searchParams.get('mode');
    if (urlMode === 'signup') {
      setMode('signUp');
    }
  }, [searchParams]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (isOnboardingComplete) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }
  }, [user, isOnboardingComplete, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email, password } = values;
      const role = 'business';
      
      console.log(`Attempting ${mode} with role: ${role}`);
      
      if (mode === 'signIn') {
        const { error } = await signIn(email, password, role);
        if (error) {
          console.error('Sign in error:', error);
          toast({
            title: "Error signing in",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      } else {
        const { error } = await signUp(email, password, role);
        if (error) {
          console.error('Sign up error:', error);
          toast({
            title: "Error signing up",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account.",
          });
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{mode === 'signIn' ? 'Business Sign In' : 'Create Business Account'}</CardTitle>
            <CardDescription>
              {mode === 'signIn' 
                ? 'Enter your credentials to access your business account' 
                : 'Sign up for a new business account to get started'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {mode === 'signIn' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center mt-2">
              {mode === 'signIn' ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" onClick={toggleMode} className="p-0 h-auto ml-1">
                {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
            <div className="text-sm text-center mt-4">
              <span className="text-muted-foreground">Are you a CA/CS Professional?</span>
              <Button variant="link" onClick={() => navigate('/professional/auth')} className="p-0 h-auto ml-1">
                Sign in here
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="text-center mt-4">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ClientAuth;

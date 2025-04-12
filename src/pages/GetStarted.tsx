
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Building, ArrowRight, FileCheck } from 'lucide-react';

const GetStarted = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome to CompliEasy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one platform for company registration and compliance management in India.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle>Register a New Company</CardTitle>
              <CardDescription>
                Start your entrepreneurial journey with proper legal structure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Choose from Private Limited, LLP, or OPC</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Complete registration in as little as 15 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Expert guidance throughout the process</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/registration')}>
                Register a Company
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <CardTitle>Manage Existing Business</CardTitle>
              <CardDescription>
                Streamline compliance for your already registered company.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Track all compliance deadlines in one place</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Store all business documents securely</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm">Professional support for all filings</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/onboarding')}>
                Add Existing Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Already have an account with us?
          </p>
          <Button variant="link" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

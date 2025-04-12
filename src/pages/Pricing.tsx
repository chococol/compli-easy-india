
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that best fits your business needs. All plans include our core compliance management tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="text-xl">Starter</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹4,999</span>
                <span className="text-muted-foreground ml-2">/ year</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Perfect for small businesses and startups just getting established.
              </p>
              <ul className="space-y-3">
                <PricingItem>Company registration (Private Limited)</PricingItem>
                <PricingItem>Basic compliance calendar</PricingItem>
                <PricingItem>Document storage (10GB)</PricingItem>
                <PricingItem>Email support</PricingItem>
                <PricingItem>1 user account</PricingItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/registration')}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Growth Plan */}
          <Card className="border-2 border-primary shadow-lg relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Growth</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹9,999</span>
                <span className="text-muted-foreground ml-2">/ year</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Ideal for growing businesses with increasing compliance needs.
              </p>
              <ul className="space-y-3">
                <PricingItem>All Starter features</PricingItem>
                <PricingItem>Advanced compliance management</PricingItem>
                <PricingItem>Document storage (25GB)</PricingItem>
                <PricingItem>Priority email & phone support</PricingItem>
                <PricingItem>5 user accounts</PricingItem>
                <PricingItem>Compliance audit reports</PricingItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/registration')}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹19,999</span>
                <span className="text-muted-foreground ml-2">/ year</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Comprehensive solution for established businesses with complex needs.
              </p>
              <ul className="space-y-3">
                <PricingItem>All Growth features</PricingItem>
                <PricingItem>Unlimited document storage</PricingItem>
                <PricingItem>Dedicated account manager</PricingItem>
                <PricingItem>Unlimited user accounts</PricingItem>
                <PricingItem>Custom compliance workflows</PricingItem>
                <PricingItem>API access</PricingItem>
                <PricingItem>Multi-entity management</PricingItem>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/contact')}>
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer tailored compliance solutions for businesses with specific requirements. 
            Contact our sales team to discuss your needs.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>
            Contact Sales
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

const PricingItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

export default Pricing;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const Onboarding = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const isClientRoute = location.pathname.startsWith('/client');
  
  const [businessStructure, setBusinessStructure] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessStructure) {
      toast({
        title: "Please select a business structure",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await completeOnboarding(businessStructure);
      toast({
        title: "Onboarding complete!",
        description: "Your account is now set up.",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to ComplianceAI</CardTitle>
          <CardDescription>
            Let's set up your account to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">What is your business structure?</h3>
              <RadioGroup 
                value={businessStructure} 
                onValueChange={setBusinessStructure}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sole_proprietorship" id="sole_proprietorship" />
                  <Label htmlFor="sole_proprietorship">Sole Proprietorship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partnership" id="partnership" />
                  <Label htmlFor="partnership">Partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="llc" id="llc" />
                  <Label htmlFor="llc">Limited Liability Company (LLC)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corporation" id="corporation" />
                  <Label htmlFor="corporation">Corporation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !businessStructure}
            >
              {isSubmitting ? "Setting up..." : "Complete Setup"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Onboarding;

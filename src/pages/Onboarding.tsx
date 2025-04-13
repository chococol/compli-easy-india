
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "../App";

const Onboarding = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const options = [
    "Tax Compliance",
    "GST Filing",
    "Company Registration",
    "Income Tax Returns",
    "Accounting Services",
    "Legal Compliance",
  ];

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one option to continue",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Save onboarding data using the context function
      await completeOnboarding(selectedOptions);
      
      toast({
        title: "Onboarding Complete",
        description: "Your preferences have been saved",
      });
      
      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to CompliEasy</CardTitle>
          <CardDescription className="text-center">
            Select the services you're interested in to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {options.map((option) => (
              <Button
                key={option}
                variant={selectedOptions.includes(option) ? "default" : "outline"}
                onClick={() => handleOptionToggle(option)}
                className="h-20 flex flex-col items-center justify-center text-center"
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Onboarding;

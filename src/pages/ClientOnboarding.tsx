
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Search, Users, Building, UserPlus } from 'lucide-react';

// Define onboarding steps
type OnboardingStep = 
  | 'business-status'
  | 'business-details'
  | 'select-professional'
  | 'confirmation';

const ClientOnboarding = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('business-status');
  const [isIncorporated, setIsIncorporated] = useState<boolean | null>(null);
  const [businessDetails, setBusinessDetails] = useState({
    name: '',
    type: '',
    registrationNumber: '',
    incorporationDate: '',
    plannedStructure: '',
  });
  const [professionalSelection, setProfessionalSelection] = useState<'search' | 'code' | 'invite'>('search');
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [professionalCode, setProfessionalCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { completeOnboarding, isOnboardingComplete } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for CA/CS professionals
  const professionals = [
    { id: '1', name: 'ABC & Co.', type: 'CA', rating: 4.8 },
    { id: '2', name: 'XYZ Associates', type: 'CS', rating: 4.7 },
    { id: '3', name: 'PQR Consultants', type: 'CA', rating: 4.9 },
    { id: '4', name: 'LMN Services', type: 'CS', rating: 4.5 },
  ];

  // Filter professionals based on search query
  const filteredProfessionals = professionals.filter(
    (prof) => prof.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOnboardingComplete) {
      navigate('/dashboard');
    }
  }, [isOnboardingComplete, navigate]);

  const handleNext = () => {
    switch (currentStep) {
      case 'business-status':
        setCurrentStep('business-details');
        break;
      case 'business-details':
        setCurrentStep('select-professional');
        break;
      case 'select-professional':
        setCurrentStep('confirmation');
        break;
      case 'confirmation':
        handleFinishOnboarding();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'business-details':
        setCurrentStep('business-status');
        break;
      case 'select-professional':
        setCurrentStep('business-details');
        break;
      case 'confirmation':
        setCurrentStep('select-professional');
        break;
    }
  };

  const handleFinishOnboarding = async () => {
    try {
      // Determine the business structure based on user selection
      const businessStructure = isIncorporated 
        ? businessDetails.type 
        : businessDetails.plannedStructure;
      
      // Complete onboarding with the selected business structure
      await completeOnboarding(businessStructure);
      
      toast({
        title: "Onboarding completed!",
        description: "Your business profile has been set up successfully.",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error completing onboarding",
        description: "Failed to complete the onboarding process. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderBusinessStatus = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Is your business already incorporated?</h3>
          <p className="text-muted-foreground mb-4">Select the current status of your business</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className={`cursor-pointer border-2 ${isIncorporated === true ? 'border-primary' : 'border-border'}`}
              onClick={() => setIsIncorporated(true)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Yes, already incorporated</h4>
                    <p className="text-sm text-muted-foreground">My business is registered and has legal structure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer border-2 ${isIncorporated === false ? 'border-primary' : 'border-border'}`}
              onClick={() => setIsIncorporated(false)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">No, not yet incorporated</h4>
                    <p className="text-sm text-muted-foreground">I'm planning to register my business</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleNext}
          disabled={isIncorporated === null}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      {isIncorporated ? (
        // Already incorporated business details
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessDetails.name}
                  onChange={(e) => setBusinessDetails({...businessDetails, name: e.target.value})}
                  placeholder="Enter your registered business name"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select 
                  value={businessDetails.type}
                  onValueChange={(value) => setBusinessDetails({...businessDetails, type: value})}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select business structure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private-limited">Private Limited Company</SelectItem>
                    <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                    <SelectItem value="opc">One Person Company (OPC)</SelectItem>
                    <SelectItem value="partnership">Partnership Firm</SelectItem>
                    <SelectItem value="proprietorship">Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={businessDetails.registrationNumber}
                  onChange={(e) => setBusinessDetails({...businessDetails, registrationNumber: e.target.value})}
                  placeholder="Enter CIN/LLPIN/Registration Number"
                />
              </div>
              
              <div>
                <Label htmlFor="incorporationDate">Date of Incorporation</Label>
                <Input
                  id="incorporationDate"
                  type="date"
                  value={businessDetails.incorporationDate}
                  onChange={(e) => setBusinessDetails({...businessDetails, incorporationDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        // Not yet incorporated business details
        <>
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Planned Business Name</Label>
              <Input
                id="businessName"
                value={businessDetails.name}
                onChange={(e) => setBusinessDetails({...businessDetails, name: e.target.value})}
                placeholder="Enter your planned business name"
              />
              <p className="text-xs text-muted-foreground mt-1">This name will be subject to availability check</p>
            </div>
            
            <div>
              <Label htmlFor="plannedStructure">Planned Business Structure</Label>
              <Select
                value={businessDetails.plannedStructure}
                onValueChange={(value) => setBusinessDetails({...businessDetails, plannedStructure: value})}
              >
                <SelectTrigger id="plannedStructure">
                  <SelectValue placeholder="Select planned structure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private-limited">Private Limited Company</SelectItem>
                  <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                  <SelectItem value="opc">One Person Company (OPC)</SelectItem>
                  <SelectItem value="partnership">Partnership Firm</SelectItem>
                  <SelectItem value="proprietorship">Proprietorship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={isIncorporated ? !businessDetails.name || !businessDetails.type : !businessDetails.name || !businessDetails.plannedStructure}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderSelectProfessional = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Your CA/CS Professional</h3>
        <p className="text-muted-foreground">Choose how you'd like to connect with a CA/CS professional</p>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant={professionalSelection === 'search' ? 'default' : 'outline'} 
            onClick={() => setProfessionalSelection('search')}
          >
            <Search className="mr-2 h-4 w-4" /> Search for CA/CS
          </Button>
          <Button 
            variant={professionalSelection === 'code' ? 'default' : 'outline'} 
            onClick={() => setProfessionalSelection('code')}
          >
            <Users className="mr-2 h-4 w-4" /> Enter Professional Code
          </Button>
          <Button 
            variant={professionalSelection === 'invite' ? 'default' : 'outline'} 
            onClick={() => setProfessionalSelection('invite')}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Invite a Professional
          </Button>
        </div>
        
        {professionalSelection === 'search' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="searchProfessional">Search CA/CS Firms</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="searchProfessional"
                  className="pl-8"
                  placeholder="Search by name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-3">
              {filteredProfessionals.map((prof) => (
                <Card
                  key={prof.id}
                  className={`cursor-pointer border-2 ${selectedProfessional === prof.id ? 'border-primary' : 'border-border'}`}
                  onClick={() => setSelectedProfessional(prof.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{prof.name}</h4>
                        <p className="text-sm text-muted-foreground">{prof.type} Firm • {prof.rating} ★</p>
                      </div>
                      <Checkbox checked={selectedProfessional === prof.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {searchQuery && filteredProfessionals.length === 0 && (
                <p className="text-center py-4 text-muted-foreground">No matching professionals found</p>
              )}
            </div>
          </div>
        )}
        
        {professionalSelection === 'code' && (
          <div>
            <Label htmlFor="professionalCode">Enter Professional Code</Label>
            <Input
              id="professionalCode"
              placeholder="Enter the code provided by your CA/CS"
              value={professionalCode}
              onChange={(e) => setProfessionalCode(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">This code is provided by your professional for direct connection</p>
          </div>
        )}
        
        {professionalSelection === 'invite' && (
          <div className="space-y-3">
            <p>Generate an invitation link to send to your CA/CS professional</p>
            <Button>Generate Invitation Link</Button>
            <p className="text-xs text-muted-foreground">You can continue with onboarding and connect with a professional later</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={professionalSelection === 'search' && !selectedProfessional || 
                  professionalSelection === 'code' && !professionalCode}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Review & Confirm</h3>
        <p className="text-muted-foreground">Please review your information before completing setup</p>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="font-medium">Business Details</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm">Business Status:</div>
                <div className="text-sm font-medium">{isIncorporated ? 'Incorporated' : 'Not Incorporated Yet'}</div>
                
                <div className="text-sm">Business Name:</div>
                <div className="text-sm font-medium">{businessDetails.name}</div>
                
                {isIncorporated ? (
                  <>
                    <div className="text-sm">Business Type:</div>
                    <div className="text-sm font-medium">{businessDetails.type}</div>
                    
                    {businessDetails.registrationNumber && (
                      <>
                        <div className="text-sm">Registration Number:</div>
                        <div className="text-sm font-medium">{businessDetails.registrationNumber}</div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-sm">Planned Structure:</div>
                    <div className="text-sm font-medium">{businessDetails.plannedStructure}</div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Professional Connection</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm">Connection Method:</div>
                <div className="text-sm font-medium">
                  {professionalSelection === 'search' ? 'Selected from Directory' : 
                   professionalSelection === 'code' ? 'Professional Code' : 'Invitation Link'}
                </div>
                
                {professionalSelection === 'search' && selectedProfessional && (
                  <>
                    <div className="text-sm">Selected Professional:</div>
                    <div className="text-sm font-medium">
                      {professionals.find(p => p.id === selectedProfessional)?.name}
                    </div>
                  </>
                )}
                
                {professionalSelection === 'code' && (
                  <>
                    <div className="text-sm">Professional Code:</div>
                    <div className="text-sm font-medium">{professionalCode}</div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleFinishOnboarding}>
          Complete Setup
        </Button>
      </div>
    </div>
  );

  // Render the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'business-status':
        return renderBusinessStatus();
      case 'business-details':
        return renderBusinessDetails();
      case 'select-professional':
        return renderSelectProfessional();
      case 'confirmation':
        return renderConfirmation();
      default:
        return null;
    }
  };

  // Render progress indicator
  const renderProgressIndicator = () => {
    const steps = [
      { id: 'business-status', label: 'Business Status' },
      { id: 'business-details', label: 'Business Details' },
      { id: 'select-professional', label: 'Select Professional' },
      { id: 'confirmation', label: 'Confirmation' },
    ];
    
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const isActive = index <= currentIndex;
            return (
              <div key={step.id} className="flex flex-col items-center relative">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className={`text-xs mt-2 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`absolute h-0.5 w-full top-4 left-1/2 ${
                    index < currentIndex ? 'bg-primary' : 'bg-muted'
                  }`} style={{ width: '100%', transform: 'translateY(-50%)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Set Up Your Business</h1>
          <p className="mt-2 text-muted-foreground">
            Complete your profile to get the most out of our platform
          </p>
        </div>
        
        {renderProgressIndicator()}
        
        <Card>
          <CardContent className="pt-6">
            {renderCurrentStep()}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientOnboarding;

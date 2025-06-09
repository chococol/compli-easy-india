
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Crown, Star, Search, Building, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MainLayout from '@/components/layout/MainLayout';

interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  experience: string;
  location: string;
  price: string;
  featured: boolean;
  description: string;
  services: string[];
}

interface TeamMember {
  id: string;
  firmName: string;
  type: 'firm' | 'individual';
  status: 'active' | 'pending';
  rating?: number;
  experience?: string;
  location?: string;
  price?: string;
  featured?: boolean;
  joinedDate: string;
  services: {
    ca: boolean;
    cs: boolean;
    lawyer: boolean;
    manager: boolean;
  };
}

const serviceProviders: ServiceProvider[] = [
  {
    id: 'compliease',
    name: 'CompliEase Professional Services',
    rating: 4.9,
    experience: '10+ years',
    location: 'Pan India',
    price: '₹8,000/month',
    featured: true,
    description: 'Complete compliance solution with dedicated CA, CS, Lawyer, and Manager',
    services: ['Full compliance suite', '24/7 support', 'Dedicated relationship manager', 'Priority filing']
  },
  {
    id: 'cleartax',
    name: 'ClearTax Professional Partners',
    rating: 4.7,
    experience: '8+ years',
    location: 'Major Cities',
    price: '₹7,500/month',
    featured: false,
    description: 'Comprehensive tax and compliance services with experienced professionals',
    services: ['Tax planning', 'GST compliance', 'Corporate filings', 'Advisory services']
  },
  {
    id: 'indiafilings',
    name: 'IndiaFilings Expert Network',
    rating: 4.5,
    experience: '6+ years',
    location: 'Pan India',
    price: '₹6,500/month',
    featured: false,
    description: 'Business registration and compliance services with qualified professionals',
    services: ['Company registration', 'Annual compliance', 'Legal documentation', 'Business consulting']
  },
  {
    id: 'local-firm-1',
    name: 'Sharma & Associates',
    rating: 4.6,
    experience: '12+ years',
    location: 'Delhi NCR',
    price: '₹5,500/month',
    featured: false,
    description: 'Local expertise in corporate law and taxation with personalized service',
    services: ['Local compliance', 'Court representations', 'Tax advisory', 'Personal attention']
  },
  {
    id: 'local-firm-2',
    name: 'Gupta Professional Services',
    rating: 4.4,
    experience: '10+ years',
    location: 'Mumbai',
    price: '₹6,000/month',
    featured: false,
    description: 'Mumbai-based firm specializing in corporate compliance and legal services',
    services: ['Corporate law', 'SEBI compliance', 'Real estate', 'Mergers & acquisitions']
  },
];

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);

  const handleHireFirm = (provider: ServiceProvider) => {
    const newTeamMember: TeamMember = {
      id: Date.now().toString(),
      firmName: provider.name,
      type: 'firm',
      status: 'active',
      rating: provider.rating,
      experience: provider.experience,
      location: provider.location,
      price: provider.price,
      featured: provider.featured,
      joinedDate: new Date().toISOString().split('T')[0],
      services: {
        ca: true,
        cs: true,
        lawyer: true,
        manager: true,
      },
    };
    setTeamMembers([...teamMembers, newTeamMember]);
    setIsHireDialogOpen(false);
  };

  const filteredProviders = serviceProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasCompleteTeam = teamMembers.length > 0;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Users className="h-8 w-8" />
              Team Management
            </h1>
            <p className="text-muted-foreground">
              Build your core compliance team with professional service providers
            </p>
          </div>
          {!hasCompleteTeam && (
            <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Build Your Team
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Choose Your Professional Service Provider</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Get a complete team: Chartered Accountant, Company Secretary, Lawyer, and Project Manager
                  </p>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search service providers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="grid gap-4">
                    {filteredProviders.map((provider) => (
                      <Card key={provider.id} className={`transition-all hover:shadow-lg ${provider.featured ? 'border-primary bg-primary/5' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Building className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold">{provider.name}</h3>
                                {provider.featured && (
                                  <Badge className="bg-primary/10 text-primary border-primary/20">
                                    <Crown className="mr-1 h-3 w-3" />
                                    Recommended
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="font-medium">{provider.rating}</span>
                                  <span className="text-muted-foreground">rating</span>
                                </div>
                                <div className="text-sm">
                                  <span className="font-medium">{provider.experience}</span>
                                  <span className="text-muted-foreground"> experience</span>
                                </div>
                                <div className="text-sm">
                                  <span className="font-medium">{provider.location}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="font-semibold text-primary">{provider.price}</span>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">Complete Team Includes:</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Chartered Accountant</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Company Secretary</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Legal Advisor</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Project Manager</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Key Services:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {provider.services.map((service, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="ml-6">
                              <Button 
                                onClick={() => handleHireFirm(provider)}
                                size="lg"
                                className={provider.featured ? 'bg-primary' : ''}
                              >
                                Hire Complete Team
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Current Team Section */}
        {hasCompleteTeam ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold text-green-800">Your Team is Complete!</h2>
              </div>
              <p className="text-green-700 mb-4">
                You have successfully hired a professional team to handle all your compliance needs.
              </p>
              
              {teamMembers.map((member) => (
                <Card key={member.id} className="bg-white border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{member.firmName}</CardTitle>
                          <p className="text-sm text-muted-foreground">Complete Professional Services</p>
                        </div>
                        {member.featured && (
                          <Crown className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{member.rating} rating</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{member.experience}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{member.location}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-primary">{member.price}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Your Team Members:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="p-4 bg-blue-50 border-blue-200">
                          <div className="text-center">
                            <div className="text-2xl mb-2">📊</div>
                            <h5 className="font-medium text-sm">Chartered Accountant</h5>
                            <p className="text-xs text-muted-foreground">Tax & Financial Compliance</p>
                          </div>
                        </Card>
                        <Card className="p-4 bg-green-50 border-green-200">
                          <div className="text-center">
                            <div className="text-2xl mb-2">📋</div>
                            <h5 className="font-medium text-sm">Company Secretary</h5>
                            <p className="text-xs text-muted-foreground">Corporate Governance</p>
                          </div>
                        </Card>
                        <Card className="p-4 bg-purple-50 border-purple-200">
                          <div className="text-center">
                            <div className="text-2xl mb-2">⚖️</div>
                            <h5 className="font-medium text-sm">Legal Advisor</h5>
                            <p className="text-xs text-muted-foreground">Legal Documentation</p>
                          </div>
                        </Card>
                        <Card className="p-4 bg-orange-50 border-orange-200">
                          <div className="text-center">
                            <div className="text-2xl mb-2">👔</div>
                            <h5 className="font-medium text-sm">Project Manager</h5>
                            <p className="text-xs text-muted-foreground">Coordination & Oversight</p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto">
              <Users className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Build Your Professional Team</h3>
              <p className="text-blue-600 mb-6">
                Get a complete compliance team including Chartered Accountant, Company Secretary, 
                Legal Advisor, and Project Manager from a single trusted service provider.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <p className="text-sm font-medium">CA</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-sm font-medium">CS</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <p className="text-sm font-medium">Lawyer</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👔</div>
                  <p className="text-sm font-medium">Manager</p>
                </div>
              </div>
              <Button 
                onClick={() => setIsHireDialogOpen(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-5 w-5" />
                Start Building Your Team
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TeamPage;

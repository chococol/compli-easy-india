
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, User, Building, Crown, Star, Calendar, AlertTriangle, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';

interface TeamMember {
  id: string;
  name: string;
  role: 'compliance_manager' | 'chartered_accountant' | 'company_secretary' | 'lawyer' | 'custom';
  email: string;
  phone: string;
  type: 'employee' | 'service_provider';
  status: 'active' | 'inactive';
  joinedDate: string;
  customRoleTitle?: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  experience: string;
  location: string;
  price: string;
  featured: boolean;
  description: string;
  contactEmail: string;
  contactPhone: string;
  contractStartDate?: string;
  contractEndDate?: string;
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
    description: 'Complete compliance solution with dedicated team',
    contactEmail: 'support@compliease.com',
    contactPhone: '+91-9876543210'
  },
  {
    id: 'cleartax',
    name: 'ClearTax Professional Partners',
    rating: 4.7,
    experience: '8+ years',
    location: 'Major Cities',
    price: '₹7,500/month',
    featured: false,
    description: 'Comprehensive tax and compliance services',
    contactEmail: 'business@cleartax.in',
    contactPhone: '+91-8765432109'
  },
  {
    id: 'indiafilings',
    name: 'IndiaFilings Expert Network',
    rating: 4.5,
    experience: '6+ years',
    location: 'Pan India',
    price: '₹6,500/month',
    featured: false,
    description: 'Business registration and compliance services',
    contactEmail: 'help@indiafilings.com',
    contactPhone: '+91-7654321098'
  }
];

const roleOptions = [
  { value: 'compliance_manager', label: 'Compliance Manager' },
  { value: 'chartered_accountant', label: 'Chartered Accountant' },
  { value: 'company_secretary', label: 'Company Secretary' },
  { value: 'lawyer', label: 'Lawyer' },
  { value: 'custom', label: 'Custom Role' }
];

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentServiceProvider, setCurrentServiceProvider] = useState<ServiceProvider | null>(null);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isChangeProviderDialogOpen, setIsChangeProviderDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    type: 'employee',
    customRoleTitle: ''
  });

  const handleAddMember = () => {
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role as any,
      email: newMember.email,
      phone: newMember.phone,
      type: newMember.type as any,
      status: 'active',
      joinedDate: new Date().toLocaleDateString(),
      customRoleTitle: newMember.role === 'custom' ? newMember.customRoleTitle : undefined
    };
    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: '', role: '', email: '', phone: '', type: 'employee', customRoleTitle: '' });
    setIsAddMemberDialogOpen(false);
  };

  const handleHireServiceProvider = (provider: ServiceProvider) => {
    const coreTeam: TeamMember[] = [
      {
        id: `${provider.id}-cm`,
        name: `${provider.name} - Compliance Manager`,
        role: 'compliance_manager',
        email: provider.contactEmail,
        phone: provider.contactPhone,
        type: 'service_provider',
        status: 'active',
        joinedDate: new Date().toLocaleDateString()
      },
      {
        id: `${provider.id}-ca`,
        name: `${provider.name} - Chartered Accountant`,
        role: 'chartered_accountant',
        email: provider.contactEmail,
        phone: provider.contactPhone,
        type: 'service_provider',
        status: 'active',
        joinedDate: new Date().toLocaleDateString()
      },
      {
        id: `${provider.id}-cs`,
        name: `${provider.name} - Company Secretary`,
        role: 'company_secretary',
        email: provider.contactEmail,
        phone: provider.contactPhone,
        type: 'service_provider',
        status: 'active',
        joinedDate: new Date().toLocaleDateString()
      },
      {
        id: `${provider.id}-lawyer`,
        name: `${provider.name} - Lawyer`,
        role: 'lawyer',
        email: provider.contactEmail,
        phone: provider.contactPhone,
        type: 'service_provider',
        status: 'active',
        joinedDate: new Date().toLocaleDateString()
      }
    ];
    
    const providerWithContract = {
      ...provider,
      contractStartDate: new Date().toLocaleDateString(),
      contractEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    
    setCurrentServiceProvider(providerWithContract);
    setTeamMembers([...teamMembers, ...coreTeam]);
    setIsChangeProviderDialogOpen(false);
  };

  const getRoleDisplayName = (role: string, customRoleTitle?: string) => {
    if (role === 'custom' && customRoleTitle) return customRoleTitle;
    const roleOption = roleOptions.find(r => r.value === role);
    return roleOption?.label || role;
  };

  const canChangeProvider = () => {
    if (!currentServiceProvider?.contractStartDate) return true;
    const contractStart = new Date(currentServiceProvider.contractStartDate);
    const oneYearLater = new Date(contractStart.getTime() + 365 * 24 * 60 * 60 * 1000);
    return new Date() >= oneYearLater;
  };

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
              Manage your team members and service providers
            </p>
          </div>
        </div>

        <Tabs defaultValue="team-members" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team-members">Team Members</TabsTrigger>
            <TabsTrigger value="service-provider">Service Provider</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team-members" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Team Members</h2>
              <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Role</label>
                      <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {newMember.role === 'custom' && (
                      <div>
                        <label className="text-sm font-medium">Custom Role Title</label>
                        <Input
                          value={newMember.customRoleTitle}
                          onChange={(e) => setNewMember({ ...newMember, customRoleTitle: e.target.value })}
                          placeholder="Enter role title"
                        />
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        value={newMember.phone}
                        onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select value={newMember.type} onValueChange={(value) => setNewMember({ ...newMember, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="service_provider">Service Provider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddMember} className="w-full">
                      Add Member
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {teamMembers.length > 0 ? (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{getRoleDisplayName(member.role, member.customRoleTitle)}</TableCell>
                        <TableCell>
                          <Badge variant={member.type === 'employee' ? 'default' : 'secondary'}>
                            {member.type === 'employee' ? 'Employee' : 'Service Provider'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {member.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              {member.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.joinedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No team members yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add individual team members or hire a complete service provider team
                </p>
                <Button onClick={() => setIsAddMemberDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Team Member
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="service-provider" className="space-y-6">
            {currentServiceProvider ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Current Service Provider</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsChangeProviderDialogOpen(true)}
                    disabled={!canChangeProvider()}
                  >
                    {canChangeProvider() ? 'Change Provider' : 'Change Available Next Year'}
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{currentServiceProvider.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{currentServiceProvider.description}</p>
                        </div>
                        {currentServiceProvider.featured && (
                          <Crown className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{currentServiceProvider.rating} rating</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{currentServiceProvider.experience}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{currentServiceProvider.location}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-primary">{currentServiceProvider.price}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Contract: {currentServiceProvider.contractStartDate} - {currentServiceProvider.contractEndDate}</span>
                      </div>
                      {!canChangeProvider() && (
                        <div className="flex items-center gap-2 text-sm text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Provider can be changed after contract year</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Team Members from this Provider:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teamMembers
                          .filter(member => member.type === 'service_provider')
                          .map((member) => (
                            <Card key={member.id} className="p-4">
                              <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-primary" />
                                <div>
                                  <h5 className="font-medium text-sm">{getRoleDisplayName(member.role)}</h5>
                                  <p className="text-xs text-muted-foreground">{member.email}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No service provider selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a service provider to get a complete professional team
                </p>
                <Button onClick={() => setIsChangeProviderDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Select Service Provider
                </Button>
              </Card>
            )}

            <Dialog open={isChangeProviderDialogOpen} onOpenChange={setIsChangeProviderDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Choose Service Provider</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Get a complete team: Compliance Manager, Chartered Accountant, Company Secretary, and Lawyer
                  </p>
                </DialogHeader>
                
                <div className="grid gap-4">
                  {serviceProviders.map((provider) => (
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
                          </div>
                          
                          <div className="ml-6">
                            <Button 
                              onClick={() => handleHireServiceProvider(provider)}
                              size="lg"
                              className={provider.featured ? 'bg-primary' : ''}
                            >
                              Select Provider
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TeamPage;

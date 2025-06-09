import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Crown, Star, Search, Mail, Phone, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const coreRoles = [
  { id: 'ca', name: 'Chartered Accountant', icon: '📊', description: 'Financial audits, tax compliance, and accounting' },
  { id: 'cs', name: 'Company Secretary', icon: '📋', description: 'Corporate governance and compliance' },
  { id: 'lawyer', name: 'Lawyer', icon: '⚖️', description: 'Legal advice and documentation' },
  { id: 'manager', name: 'Manager', icon: '👔', description: 'Project oversight and coordination' },
];

const serviceProviders = {
  ca: [
    { id: 'compliease-ca', name: 'CompliEase CA Services', rating: 4.9, experience: '10+ years', location: 'Pan India', price: '₹2,000/month', featured: true },
    { id: 'cleartax-ca', name: 'ClearTax CA Partners', rating: 4.7, experience: '8+ years', location: 'Major Cities', price: '₹2,500/month', featured: false },
    { id: 'indiafilings-ca', name: 'IndiaFilings CA Network', rating: 4.5, experience: '6+ years', location: 'Pan India', price: '₹1,800/month', featured: false },
    { id: 'local-ca-1', name: 'Sharma & Associates CA', rating: 4.6, experience: '12+ years', location: 'Delhi NCR', price: '₹1,500/month', featured: false },
  ],
  cs: [
    { id: 'compliease-cs', name: 'CompliEase CS Services', rating: 4.8, experience: '8+ years', location: 'Pan India', price: '₹1,500/month', featured: true },
    { id: 'cleartax-cs', name: 'ClearTax CS Partners', rating: 4.6, experience: '6+ years', location: 'Major Cities', price: '₹1,800/month', featured: false },
    { id: 'local-cs-1', name: 'Gupta CS Services', rating: 4.4, experience: '10+ years', location: 'Mumbai', price: '₹1,200/month', featured: false },
  ],
  lawyer: [
    { id: 'compliease-lawyer', name: 'CompliEase Legal Services', rating: 4.9, experience: '12+ years', location: 'Pan India', price: '₹3,000/month', featured: true },
    { id: 'local-lawyer-1', name: 'Legal Eagles Associates', rating: 4.7, experience: '15+ years', location: 'Bangalore', price: '₹2,500/month', featured: false },
    { id: 'legal-corp', name: 'Corporate Legal Solutions', rating: 4.5, experience: '8+ years', location: 'Chennai', price: '₹2,200/month', featured: false },
  ],
  manager: [
    { id: 'compliease-manager', name: 'CompliEase Project Managers', rating: 4.8, experience: '6+ years', location: 'Pan India', price: '₹2,500/month', featured: true },
    { id: 'freelance-manager-1', name: 'Experienced Business Manager', rating: 4.6, experience: '8+ years', location: 'Pune', price: '₹2,000/month', featured: false },
  ],
};

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [addMemberType, setAddMemberType] = useState<'employee' | 'provider'>('employee');
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    customRole: '',
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddTeamMember = () => {
    if (addMemberType === 'employee') {
      const newMember = {
        id: Date.now().toString(),
        name: newMemberForm.name,
        email: newMemberForm.email,
        phone: newMemberForm.phone,
        role: newMemberForm.role === 'custom' ? newMemberForm.customRole : newMemberForm.role,
        type: 'employee',
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberForm({ name: '', email: '', phone: '', role: '', customRole: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleHireServiceProvider = (provider: any, role: string) => {
    const newMember = {
      id: Date.now().toString(),
      name: provider.name,
      role: role,
      type: 'service_provider',
      status: 'active',
      rating: provider.rating,
      experience: provider.experience,
      location: provider.location,
      price: provider.price,
      featured: provider.featured,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const getRoleMembers = (roleId: string) => {
    return teamMembers.filter(member => 
      member.role.toLowerCase() === roleId || 
      (roleId === 'ca' && member.role.toLowerCase().includes('chartered accountant')) ||
      (roleId === 'cs' && member.role.toLowerCase().includes('company secretary')) ||
      (roleId === 'lawyer' && member.role.toLowerCase().includes('lawyer')) ||
      (roleId === 'manager' && member.role.toLowerCase().includes('manager'))
    );
  };

  const getOtherMembers = () => {
    const coreRoleIds = ['ca', 'cs', 'lawyer', 'manager'];
    return teamMembers.filter(member => {
      const memberRole = member.role.toLowerCase();
      return !coreRoleIds.some(roleId => 
        memberRole === roleId || 
        memberRole.includes(roleId.replace('ca', 'chartered accountant').replace('cs', 'company secretary'))
      );
    });
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
              Build your core team with employees or hire professional service providers
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                <Tabs value={addMemberType} onValueChange={(v) => setAddMemberType(v as 'employee' | 'provider')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="employee">Add Employee</TabsTrigger>
                    <TabsTrigger value="provider">Hire Provider</TabsTrigger>
                  </TabsList>
                  <TabsContent value="employee" className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={newMemberForm.name}
                        onChange={(e) => setNewMemberForm({...newMemberForm, name: e.target.value})}
                        placeholder="Employee name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={newMemberForm.email}
                        onChange={(e) => setNewMemberForm({...newMemberForm, email: e.target.value})}
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={newMemberForm.phone}
                        onChange={(e) => setNewMemberForm({...newMemberForm, phone: e.target.value})}
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select value={newMemberForm.role} onValueChange={(v) => setNewMemberForm({...newMemberForm, role: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">Chartered Accountant</SelectItem>
                          <SelectItem value="cs">Company Secretary</SelectItem>
                          <SelectItem value="lawyer">Lawyer</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="custom">Custom Role</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newMemberForm.role === 'custom' && (
                      <div>
                        <Label>Custom Role</Label>
                        <Input
                          value={newMemberForm.customRole}
                          onChange={(e) => setNewMemberForm({...newMemberForm, customRole: e.target.value})}
                          placeholder="Enter custom role"
                        />
                      </div>
                    )}
                    <Button onClick={handleAddTeamMember} className="w-full">
                      Add Employee
                    </Button>
                  </TabsContent>
                  <TabsContent value="provider">
                    <p className="text-sm text-muted-foreground">
                      Select a role below to browse and hire service providers.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Core Roles Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Core Team Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreRoles.map((role) => {
              const members = getRoleMembers(role.id);
              const hasMember = members.length > 0;
              
              return (
                <Card key={role.id} className={hasMember ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{role.icon}</span>
                        <div>
                          <CardTitle className="text-sm">{role.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                      {hasMember && <Badge className="bg-green-100 text-green-800">✓</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {hasMember ? (
                      <div className="space-y-2">
                        {members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {member.type === 'employee' ? 'Employee' : 'Service Provider'}
                              </p>
                            </div>
                            {member.featured && <Crown className="h-4 w-4 text-yellow-500" />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">No {role.name.toLowerCase()} assigned</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="w-full">
                              Add {role.name}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Add {role.name}</DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="providers">
                              <TabsList>
                                <TabsTrigger value="providers">Service Providers</TabsTrigger>
                                <TabsTrigger value="employee">Add Employee</TabsTrigger>
                              </TabsList>
                              <TabsContent value="providers" className="space-y-4">
                                <div className="relative">
                                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder={`Search ${role.name.toLowerCase()} providers...`}
                                    className="pl-9"
                                  />
                                </div>
                                <div className="grid gap-4">
                                  {serviceProviders[role.id as keyof typeof serviceProviders]?.map((provider) => (
                                    <Card key={provider.id} className={provider.featured ? 'border-primary' : ''}>
                                      <CardContent className="p-4">
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                              <h4 className="font-medium">{provider.name}</h4>
                                              {provider.featured && (
                                                <Badge className="bg-primary/10 text-primary">
                                                  <Crown className="mr-1 h-3 w-3" />
                                                  Recommended
                                                </Badge>
                                              )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                              <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-500" />
                                                {provider.rating} rating
                                              </div>
                                              <div>{provider.experience}</div>
                                              <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {provider.location}
                                              </div>
                                              <div className="font-medium text-foreground">{provider.price}</div>
                                            </div>
                                          </div>
                                          <Button onClick={() => handleHireServiceProvider(provider, role.name)}>
                                            Hire
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </TabsContent>
                              <TabsContent value="employee">
                                <p className="text-sm text-muted-foreground mb-4">
                                  Add your own employee as the {role.name.toLowerCase()}.
                                </p>
                                {/* Employee form would go here - similar to the main dialog */}
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Other Team Members */}
        {getOtherMembers().length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Other Team Members</h2>
            <div className="grid gap-4">
              {getOtherMembers().map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge variant="outline">
                          {member.type === 'employee' ? 'Employee' : 'Service Provider'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.email && (
                          <Button size="sm" variant="ghost">
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        {member.phone && (
                          <Button size="sm" variant="ghost">
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No team members yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Start building your team by adding the core roles required for your business.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TeamPage;

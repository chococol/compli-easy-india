
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Calendar, Scale, FileText, Users, Building2, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';

type ServiceStatus = 'requested' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';

interface LegalService {
  id: string;
  title: string;
  description: string;
  requestedDate: string;
  status: ServiceStatus;
  category: string;
  estimatedCost: string;
}

const dummyLegalServices: LegalService[] = [
  {
    id: '1',
    title: 'Employment Agreement Drafting',
    description: 'Draft employment contracts for new hires',
    requestedDate: '2024-01-10',
    status: 'in_progress',
    category: 'Employment Law',
    estimatedCost: '₹5,000',
  },
  {
    id: '2',
    title: 'NDA Template Creation',
    description: 'Non-disclosure agreement for vendors',
    requestedDate: '2024-01-05',
    status: 'completed',
    category: 'Contract Drafting',
    estimatedCost: '₹3,000',
  },
];

const availableLegalServices = {
  'Contract Drafting': {
    icon: FileText,
    services: [
      { name: 'Employment Agreement', description: 'Comprehensive employment contracts with terms, conditions, and policies', price: '₹3,000-5,000' },
      { name: 'Non-Disclosure Agreement (NDA)', description: 'Confidentiality agreements for employees, vendors, and partners', price: '₹2,000-3,000' },
      { name: 'Service Agreement', description: 'Professional service contracts with deliverables and timelines', price: '₹4,000-6,000' },
      { name: 'Partnership Agreement', description: 'Legal partnership documentation with profit sharing and responsibilities', price: '₹8,000-12,000' },
      { name: 'Vendor Agreement', description: 'Supplier and vendor contracts with terms and conditions', price: '₹3,000-5,000' },
      { name: 'Lease Agreement', description: 'Property lease contracts for commercial and residential premises', price: '₹4,000-7,000' },
      { name: 'Consultancy Agreement', description: 'Professional consulting contracts with scope and payment terms', price: '₹3,500-5,500' },
      { name: 'Franchise Agreement', description: 'Franchise business model legal documentation', price: '₹15,000-25,000' },
    ]
  },
  'Corporate Legal': {
    icon: Building2,
    services: [
      { name: 'Board Resolution Drafting', description: 'Corporate board resolutions for various business decisions', price: '₹2,000-3,000' },
      { name: 'Shareholders Agreement', description: 'Shareholder rights, responsibilities, and dispute resolution', price: '₹10,000-15,000' },
      { name: 'Articles of Association', description: 'Company governance and operational framework documentation', price: '₹5,000-8,000' },
      { name: 'Memorandum of Association', description: 'Company objectives and scope of business documentation', price: '₹4,000-6,000' },
      { name: 'Share Transfer Agreement', description: 'Legal documentation for equity transfer transactions', price: '₹5,000-8,000' },
      { name: 'Joint Venture Agreement', description: 'Strategic business partnership legal framework', price: '₹12,000-20,000' },
      { name: 'Corporate Restructuring', description: 'Legal documentation for business restructuring and mergers', price: '₹20,000-40,000' },
    ]
  },
  'Compliance Legal': {
    icon: Scale,
    services: [
      { name: 'Legal Notice Drafting', description: 'Formal legal notices for various business disputes', price: '₹3,000-5,000' },
      { name: 'Reply to Legal Notice', description: 'Professional response to received legal notices', price: '₹2,500-4,000' },
      { name: 'Compliance Certificate', description: 'Legal compliance verification and certification', price: '₹2,000-3,500' },
      { name: 'Legal Opinion', description: 'Expert legal advice on specific business matters', price: '₹5,000-10,000' },
      { name: 'Due Diligence Report', description: 'Comprehensive legal due diligence for investments', price: '₹15,000-30,000' },
      { name: 'Regulatory Compliance Review', description: 'Industry-specific compliance assessment and documentation', price: '₹8,000-15,000' },
      { name: 'Contract Review & Analysis', description: 'Legal review of existing contracts and agreements', price: '₹3,000-6,000' },
    ]
  },
  'Intellectual Property': {
    icon: Users,
    services: [
      { name: 'Trademark Application', description: 'Brand name and logo trademark registration process', price: '₹8,000-12,000' },
      { name: 'Copyright Registration', description: 'Creative work and content copyright protection', price: '₹5,000-8,000' },
      { name: 'Patent Filing', description: 'Invention and innovation patent application process', price: '₹15,000-25,000' },
      { name: 'IP Assignment Agreement', description: 'Intellectual property transfer and assignment documentation', price: '₹6,000-10,000' },
      { name: 'Licensing Agreement', description: 'IP licensing terms and royalty agreements', price: '₹8,000-15,000' },
      { name: 'Trade Secret Protection', description: 'Confidential business information protection framework', price: '₹5,000-9,000' },
      { name: 'Domain Dispute Resolution', description: 'Legal assistance for domain name conflicts', price: '₹10,000-18,000' },
    ]
  },
  'Employment Law': {
    icon: Users,
    services: [
      { name: 'Employee Handbook', description: 'Comprehensive workplace policies and procedures manual', price: '₹8,000-12,000' },
      { name: 'Termination Agreement', description: 'Legal documentation for employee separation', price: '₹3,000-5,000' },
      { name: 'HR Policy Framework', description: 'Human resources policies and compliance guidelines', price: '₹10,000-15,000' },
      { name: 'Workplace Investigation', description: 'Legal assistance for workplace disputes and investigations', price: '₹12,000-20,000' },
      { name: 'Labour Law Compliance', description: 'Industry-specific labour law compliance documentation', price: '₹6,000-10,000' },
      { name: 'Performance Improvement Plan', description: 'Legal framework for employee performance management', price: '₹2,000-4,000' },
    ]
  },
  'Dispute Resolution': {
    icon: Scale,
    services: [
      { name: 'Arbitration Agreement', description: 'Alternative dispute resolution framework', price: '₹8,000-12,000' },
      { name: 'Mediation Services', description: 'Professional mediation for business disputes', price: '₹10,000-18,000' },
      { name: 'Recovery Notice', description: 'Legal notice for debt and payment recovery', price: '₹2,500-4,000' },
      { name: 'Settlement Agreement', description: 'Dispute resolution and settlement documentation', price: '₹5,000-8,000' },
      { name: 'Litigation Support', description: 'Legal documentation and support for court proceedings', price: '₹15,000-30,000' },
    ]
  },
};

const LegalServicesPage = () => {
  const [legalServices, setLegalServices] = useState<LegalService[]>(dummyLegalServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('requestedDate');
  const [isServicesDialogOpen, setIsServicesDialogOpen] = useState(false);

  const handleRequestService = (serviceName: string, category: string) => {
    const newService: LegalService = {
      id: Date.now().toString(),
      title: serviceName,
      description: `Professional ${serviceName.toLowerCase()} service`,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'requested',
      category: category,
      estimatedCost: 'Quote pending',
    };
    setLegalServices([...legalServices, newService]);
    setIsServicesDialogOpen(false);
  };

  const filteredServices = legalServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Scale className="h-8 w-8" />
              Legal Services
            </h1>
            <p className="text-muted-foreground">
              Request professional legal services and document drafting
            </p>
          </div>
          <Dialog open={isServicesDialogOpen} onOpenChange={setIsServicesDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Request Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Available Legal Services</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue={Object.keys(availableLegalServices)[0]} className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  {Object.entries(availableLegalServices).map(([category, data]) => (
                    <TabsTrigger key={category} value={category} className="text-xs">
                      {category.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(availableLegalServices).map(([category, data]) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <data.icon className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">{category}</h3>
                    </div>
                    <div className="grid gap-3">
                      {data.services.map((service, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{service.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                                <p className="text-xs font-medium text-primary mt-2">{service.price}</p>
                              </div>
                              <Button 
                                size="sm" 
                                onClick={() => handleRequestService(service.name, category)}
                                className="ml-4"
                              >
                                Request
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search legal services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="requestedDate">Requested Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredServices.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {service.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Requested: {service.requestedDate}</span>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">{service.estimatedCost}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {service.status === 'requested' && (
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    )}
                    {service.status === 'completed' && (
                      <Button size="sm">
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Scale className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No legal services found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Request your first legal service to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LegalServicesPage;

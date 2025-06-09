
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Calendar, Scale, FileText, Users, Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';

const dummyLegalServices = [
  {
    id: '1',
    title: 'Employment Agreement Drafting',
    description: 'Draft employment contracts for new hires',
    requestedDate: '2024-01-10',
    status: 'in_progress' as const,
    category: 'Employment Law',
    estimatedCost: '₹5,000',
  },
];

const availableLegalServices = {
  'Contract Drafting': [
    'Employment Agreement',
    'Non-Disclosure Agreement (NDA)',
    'Service Agreement',
    'Partnership Agreement',
    'Vendor Agreement',
    'Lease Agreement',
  ],
  'Corporate Legal': [
    'Board Resolution Drafting',
    'Shareholders Agreement',
    'Articles of Association',
    'Memorandum of Association',
    'Share Transfer Agreement',
  ],
  'Compliance Legal': [
    'Legal Notice Drafting',
    'Reply to Legal Notice',
    'Compliance Certificate',
    'Legal Opinion',
    'Due Diligence Report',
  ],
  'Intellectual Property': [
    'Trademark Application',
    'Copyright Registration',
    'Patent Filing',
    'IP Assignment Agreement',
    'Licensing Agreement',
  ],
};

const LegalServicesPage = () => {
  const [legalServices, setLegalServices] = useState(dummyLegalServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('requestedDate');
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleRequestService = () => {
    if (selectedCategory && selectedService) {
      const newService = {
        id: Date.now().toString(),
        title: selectedService,
        description: `Professional ${selectedService.toLowerCase()} service`,
        requestedDate: new Date().toISOString().split('T')[0],
        status: 'requested' as const,
        category: selectedCategory,
        estimatedCost: 'Quote pending',
      };
      setLegalServices([...legalServices, newService]);
      setShowRequestDialog(false);
      setSelectedCategory('');
      setSelectedService('');
    }
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

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Contract Drafting': return FileText;
      case 'Corporate Legal': return Building2;
      case 'Compliance Legal': return Scale;
      case 'Intellectual Property': return Users;
      default: return FileText;
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
          <Button onClick={() => setShowRequestDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Request Service
          </Button>
        </div>

        {showRequestDialog && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Request Legal Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Service Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(availableLegalServices).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCategory && (
                <div>
                  <label className="text-sm font-medium">Service Type</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLegalServices[selectedCategory as keyof typeof availableLegalServices]?.map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button onClick={handleRequestService} disabled={!selectedCategory || !selectedService}>
                  Request Service
                </Button>
                <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
          {filteredServices.map((service) => {
            const IconComponent = getServiceIcon(service.category);
            return (
              <Card key={service.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
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
            );
          })}
          
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

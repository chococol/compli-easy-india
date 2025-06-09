
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Calendar, Building, FileCheck, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import FileComplianceDialog from '@/components/compliances/FileComplianceDialog';

type ComplianceStatus = 'pending' | 'filed' | 'under_review' | 'completed';

interface Compliance {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: ComplianceStatus;
  category: string;
  requiresCA: boolean;
}

const dummyCompanyCompliances: Compliance[] = [
  {
    id: '1',
    title: 'Annual Return Filing',
    description: 'File annual return with ROC',
    dueDate: '2024-03-31',
    status: 'pending',
    category: 'ROC Compliances',
    requiresCA: true,
  },
  {
    id: '2',
    title: 'Board Meeting Minutes',
    description: 'Quarterly board meeting documentation',
    dueDate: '2024-01-15',
    status: 'filed',
    category: 'Board Compliances',
    requiresCA: false,
  },
  {
    id: '3',
    title: 'Financial Statement Filing',
    description: 'Submit audited financial statements to ROC',
    dueDate: '2024-02-28',
    status: 'under_review',
    category: 'ROC Compliances',
    requiresCA: true,
  },
  {
    id: '4',
    title: 'Form DIR-3 KYC',
    description: 'Director KYC compliance filing',
    dueDate: '2024-04-30',
    status: 'completed',
    category: 'Director Compliances',
    requiresCA: false,
  },
];

const availableCompanyCompliances = {
  'ROC Compliances': [
    { id: 'roc1', title: 'Annual Return Filing', description: 'File Form MGT-7 with ROC', requiresCA: true },
    { id: 'roc2', title: 'Financial Statement Filing', description: 'File audited financial statements', requiresCA: true },
    { id: 'roc3', title: 'Form MGT-14', description: 'Special resolution filing', requiresCA: false },
  ],
  'Board Compliances': [
    { id: 'board1', title: 'Board Resolution', description: 'Document board decisions', requiresCA: false },
    { id: 'board2', title: 'AGM Compliance', description: 'Annual General Meeting requirements', requiresCA: false },
    { id: 'board3', title: 'Board Meeting Minutes', description: 'Quarterly board meeting documentation', requiresCA: false },
  ],
  'Director Compliances': [
    { id: 'dir1', title: 'Form DIR-3 KYC', description: 'Director KYC compliance', requiresCA: false },
    { id: 'dir2', title: 'DIN Application', description: 'Director Identification Number', requiresCA: false },
  ],
};

const CompanyCompliancesPage = () => {
  const [compliances, setCompliances] = useState<Compliance[]>(dummyCompanyCompliances);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');

  const handleAddCompliance = (compliance: any, dueDate: string) => {
    const newCompliance: Compliance = {
      id: Date.now().toString(),
      title: compliance.title,
      description: compliance.description,
      dueDate,
      status: 'pending',
      category: compliance.category,
      requiresCA: compliance.requiresCA || false,
    };
    setCompliances([...compliances, newCompliance]);
  };

  const handleFileCompliance = (complianceId: string) => {
    setCompliances(compliances.map(c => 
      c.id === complianceId ? { ...c, status: 'filed' } : c
    ));
  };

  const filteredCompliances = compliances.filter(compliance =>
    compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    compliance.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    compliance.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Building className="h-8 w-8" />
              Company Annual Compliances
            </h1>
            <p className="text-muted-foreground">
              Manage your annual company compliance requirements
            </p>
          </div>
          <AddComplianceDialog
            availableCompliances={availableCompanyCompliances}
            onAdd={handleAddCompliance}
            complianceType="company"
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Compliance
            </Button>
          </AddComplianceDialog>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search company compliances..."
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
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredCompliances.map((compliance) => (
            <Card key={compliance.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {compliance.title}
                      {compliance.requiresCA && (
                        <Badge variant="destructive" className="text-xs flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Requires CA
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{compliance.description}</p>
                  </div>
                  <Badge variant="outline">{compliance.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Due: {compliance.dueDate}</span>
                    </div>
                    <Badge className={getStatusColor(compliance.status)}>
                      {compliance.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  {compliance.status === 'pending' && (
                    <FileComplianceDialog
                      compliance={compliance}
                      onFile={() => handleFileCompliance(compliance.id)}
                    >
                      <Button size="sm">
                        <FileCheck className="mr-2 h-4 w-4" />
                        File
                      </Button>
                    </FileComplianceDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCompliances.length === 0 && (
            <div className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No company compliances found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first company compliance to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyCompliancesPage;

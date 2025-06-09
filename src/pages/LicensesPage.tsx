
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Calendar, Shield, FileCheck, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import FileComplianceDialog from '@/components/compliances/FileComplianceDialog';

type LicenseStatus = 'pending' | 'filed' | 'under_review' | 'completed' | 'expired';

interface License {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: LicenseStatus;
  category: string;
  requiresCA: boolean;
}

const dummyLicenses: License[] = [
  {
    id: '1',
    title: 'GST Registration',
    description: 'Goods and Services Tax registration',
    dueDate: '2024-02-15',
    status: 'completed',
    category: 'Tax Licenses',
    requiresCA: false,
  },
  {
    id: '2',
    title: 'Shop & Establishment License',
    description: 'Local shop establishment permit',
    dueDate: '2024-03-01',
    status: 'pending',
    category: 'Trade Licenses',
    requiresCA: false,
  },
  {
    id: '3',
    title: 'FSSAI License',
    description: 'Food Safety and Standards Authority license',
    dueDate: '2024-04-15',
    status: 'under_review',
    category: 'Trade Licenses',
    requiresCA: false,
  },
  {
    id: '4',
    title: 'Professional Tax License',
    description: 'State professional tax registration',
    dueDate: '2024-01-31',
    status: 'expired',
    category: 'Tax Licenses',
    requiresCA: false,
  },
];

const availableLicenses = {
  'Tax Licenses': [
    { id: 'tax1', title: 'GST Registration', description: 'Register for Goods and Services Tax', requiresCA: false },
    { id: 'tax2', title: 'Professional Tax License', description: 'State professional tax registration', requiresCA: false },
    { id: 'tax3', title: 'TDS License', description: 'Tax Deducted at Source registration', requiresCA: true },
  ],
  'Trade Licenses': [
    { id: 'trade1', title: 'Shop & Establishment License', description: 'Local shop establishment permit', requiresCA: false },
    { id: 'trade2', title: 'FSSAI License', description: 'Food Safety and Standards Authority license', requiresCA: false },
    { id: 'trade3', title: 'Import Export Code', description: 'IEC for international trade', requiresCA: false },
  ],
  'Environmental Licenses': [
    { id: 'env1', title: 'Pollution Control License', description: 'Environmental clearance certificate', requiresCA: false },
    { id: 'env2', title: 'Water NOC', description: 'No Objection Certificate for water usage', requiresCA: false },
  ],
};

const LicensesPage = () => {
  const [licenses, setLicenses] = useState<License[]>(dummyLicenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');

  const handleAddLicense = (license: any, dueDate: string) => {
    const newLicense: License = {
      id: Date.now().toString(),
      title: license.title,
      description: license.description,
      dueDate,
      status: 'pending',
      category: license.category,
      requiresCA: license.requiresCA || false,
    };
    setLicenses([...licenses, newLicense]);
  };

  const handleFileLicense = (licenseId: string) => {
    setLicenses(licenses.map(l => 
      l.id === licenseId ? { ...l, status: 'filed' } : l
    ));
  };

  const filteredLicenses = licenses.filter(license =>
    license.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Licenses
            </h1>
            <p className="text-muted-foreground">
              Manage your business licenses and permits
            </p>
          </div>
          <AddComplianceDialog
            availableCompliances={availableLicenses}
            onAdd={handleAddLicense}
            complianceType="licenses"
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add License
            </Button>
          </AddComplianceDialog>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search licenses..."
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
          {filteredLicenses.map((license) => (
            <Card key={license.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {license.title}
                      {license.requiresCA && (
                        <Badge variant="destructive" className="text-xs flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Requires CA
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{license.description}</p>
                  </div>
                  <Badge variant="outline">{license.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Due: {license.dueDate}</span>
                    </div>
                    <Badge className={getStatusColor(license.status)}>
                      {license.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  {license.status === 'pending' && (
                    <FileComplianceDialog
                      compliance={license}
                      onFile={() => handleFileLicense(license.id)}
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
          
          {filteredLicenses.length === 0 && (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No licenses found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first license to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LicensesPage;

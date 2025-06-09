
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Calendar, Receipt, FileCheck, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import FileComplianceDialog from '@/components/compliances/FileComplianceDialog';

type TaxStatus = 'pending' | 'filed' | 'under_review' | 'completed';

interface Tax {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaxStatus;
  category: string;
  requiresCA: boolean;
}

const dummyTaxes: Tax[] = [
  {
    id: '1',
    title: 'GST Return Filing',
    description: 'Monthly GST return submission',
    dueDate: '2024-01-20',
    status: 'pending',
    category: 'GST',
    requiresCA: true,
  },
  {
    id: '2',
    title: 'Income Tax Return',
    description: 'Annual income tax filing',
    dueDate: '2024-07-31',
    status: 'under_review',
    category: 'Income Tax',
    requiresCA: true,
  },
  {
    id: '3',
    title: 'TDS Return',
    description: 'Quarterly TDS return filing',
    dueDate: '2024-01-31',
    status: 'filed',
    category: 'TDS',
    requiresCA: true,
  },
  {
    id: '4',
    title: 'Professional Tax',
    description: 'Monthly professional tax payment',
    dueDate: '2024-01-15',
    status: 'completed',
    category: 'Professional Tax',
    requiresCA: false,
  },
];

const availableTaxes = {
  'GST': [
    { id: 'gst1', title: 'GST Return Filing', description: 'Monthly GST return submission', requiresCA: true },
    { id: 'gst2', title: 'GST Annual Return', description: 'Annual GST return filing', requiresCA: true },
    { id: 'gst3', title: 'GSTR-1', description: 'Outward supplies return', requiresCA: true },
    { id: 'gst4', title: 'GSTR-3B', description: 'Summary return and cash payment', requiresCA: true },
  ],
  'Income Tax': [
    { id: 'it1', title: 'Income Tax Return', description: 'Annual income tax filing', requiresCA: true },
    { id: 'it2', title: 'Advance Tax Payment', description: 'Quarterly advance tax installments', requiresCA: true },
    { id: 'it3', title: 'Form 16 Generation', description: 'Salary certificate for employees', requiresCA: false },
  ],
  'TDS': [
    { id: 'tds1', title: 'TDS Return', description: 'Tax Deducted at Source return', requiresCA: true },
    { id: 'tds2', title: 'TCS Return', description: 'Tax Collected at Source return', requiresCA: true },
  ],
  'Professional Tax': [
    { id: 'pt1', title: 'Professional Tax Return', description: 'Monthly professional tax filing', requiresCA: false },
    { id: 'pt2', title: 'Professional Tax Registration', description: 'State professional tax registration', requiresCA: false },
  ],
};

const TaxesPage = () => {
  const [taxes, setTaxes] = useState<Tax[]>(dummyTaxes);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');

  const handleAddTax = (tax: any, dueDate: string) => {
    const newTax: Tax = {
      id: Date.now().toString(),
      title: tax.title,
      description: tax.description,
      dueDate,
      status: 'pending',
      category: tax.category,
      requiresCA: tax.requiresCA || false,
    };
    setTaxes([...taxes, newTax]);
  };

  const handleFileTax = (taxId: string) => {
    setTaxes(taxes.map(t => 
      t.id === taxId ? { ...t, status: 'filed' } : t
    ));
  };

  const filteredTaxes = taxes.filter(tax =>
    tax.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tax.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tax.category.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Receipt className="h-8 w-8" />
              Tax Obligations
            </h1>
            <p className="text-muted-foreground">
              Manage your tax filings and obligations
            </p>
          </div>
          <AddComplianceDialog
            availableCompliances={availableTaxes}
            onAdd={handleAddTax}
            complianceType="taxes"
          >
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tax Obligation
            </Button>
          </AddComplianceDialog>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tax obligations..."
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
          {filteredTaxes.map((tax) => (
            <Card key={tax.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {tax.title}
                      {tax.requiresCA && (
                        <Badge variant="destructive" className="text-xs flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Requires CA
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{tax.description}</p>
                  </div>
                  <Badge variant="outline">{tax.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Due: {tax.dueDate}</span>
                    </div>
                    <Badge className={getStatusColor(tax.status)}>
                      {tax.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  {tax.status === 'pending' && (
                    <FileComplianceDialog
                      compliance={tax}
                      onFile={() => handleFileTax(tax.id)}
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
          
          {filteredTaxes.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No tax obligations found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first tax obligation to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TaxesPage;

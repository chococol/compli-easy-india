
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Calendar, Upload, Clock, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import FileComplianceDialog from '@/components/compliances/FileComplianceDialog';

type ComplianceStatus = 'pending' | 'filed' | 'under-review' | 'completed';

interface Compliance {
  id: string;
  title: string;
  category: string;
  description: string;
  dueDate: string;
  status: ComplianceStatus;
  filedDate?: string;
  documents?: string[];
}

// Available compliances categorized
const availableCompliances = {
  'Tax': [
    { id: 'gst-monthly', title: 'GST Monthly Return', description: 'Monthly GST return filing' },
    { id: 'income-tax', title: 'Income Tax Return', description: 'Annual income tax return' },
    { id: 'tds-quarterly', title: 'TDS Quarterly Return', description: 'Quarterly TDS return filing' },
  ],
  'Corporate': [
    { id: 'annual-return', title: 'Annual Return Filing', description: 'Company annual return' },
    { id: 'board-resolution', title: 'Board Resolution', description: 'Board meeting resolution' },
    { id: 'roc-filing', title: 'ROC Filing', description: 'Registrar of Companies filing' },
  ],
  'Labor': [
    { id: 'pf-return', title: 'PF Return', description: 'Provident Fund return' },
    { id: 'esi-return', title: 'ESI Return', description: 'Employee State Insurance return' },
    { id: 'bonus-return', title: 'Bonus Return', description: 'Annual bonus return' },
  ],
  'Environmental': [
    { id: 'water-consent', title: 'Water Consent Renewal', description: 'Water consent certificate renewal' },
    { id: 'air-consent', title: 'Air Consent Renewal', description: 'Air consent certificate renewal' },
  ]
};

const CompliancesPage = () => {
  const [myCompliances, setMyCompliances] = useState<Compliance[]>([
    {
      id: '1',
      title: 'GST Monthly Return',
      category: 'Tax',
      description: 'Monthly GST return filing',
      dueDate: '2025-06-20',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Annual Return Filing',
      category: 'Corporate',
      description: 'Company annual return',
      dueDate: '2025-07-15',
      status: 'filed',
      filedDate: '2025-06-01'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const addCompliance = (complianceData: any, dueDate: string) => {
    const newCompliance: Compliance = {
      id: Date.now().toString(),
      title: complianceData.title,
      category: complianceData.category || 'General',
      description: complianceData.description,
      dueDate,
      status: 'pending'
    };
    
    setMyCompliances(prev => [...prev, newCompliance]);
    toast({
      title: "Compliance Added",
      description: `${complianceData.title} has been added to your compliances.`,
    });
  };

  const fileCompliance = (complianceId: string, documents: string[]) => {
    setMyCompliances(prev => 
      prev.map(compliance => 
        compliance.id === complianceId 
          ? { 
              ...compliance, 
              status: 'filed' as ComplianceStatus, 
              filedDate: new Date().toISOString().split('T')[0],
              documents 
            }
          : compliance
      )
    );
    
    toast({
      title: "Compliance Filed",
      description: "Your compliance has been successfully filed.",
    });
  };

  const getStatusIcon = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'filed': return <Upload className="h-4 w-4 text-blue-600" />;
      case 'under-review': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    }
  };

  const getStatusColor = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
    }
  };

  // Sort compliances by due date
  const sortedCompliances = [...myCompliances].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const filteredCompliances = sortedCompliances.filter(compliance =>
    compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    compliance.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Compliances</h1>
            <p className="text-muted-foreground mt-1">
              Manage your compliance requirements and deadlines
            </p>
          </div>
          <AddComplianceDialog 
            availableCompliances={availableCompliances}
            onAdd={addCompliance}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Compliance
            </Button>
          </AddComplianceDialog>
        </header>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search compliances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredCompliances.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-1">No compliances found</p>
                <p className="text-muted-foreground text-sm">
                  {searchQuery ? 'Try adjusting your search' : 'Add your first compliance to get started'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCompliances.map((compliance) => (
              <Card key={compliance.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(compliance.status)}
                        <h3 className="font-semibold text-lg">{compliance.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {compliance.category}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">
                        {compliance.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(compliance.dueDate).toLocaleDateString()}
                        </span>
                        {compliance.filedDate && (
                          <span className="text-muted-foreground">
                            Filed: {new Date(compliance.filedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(compliance.status)}>
                        {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1)}
                      </Badge>
                      
                      {compliance.status === 'pending' && (
                        <FileComplianceDialog 
                          compliance={compliance}
                          onFile={(documents) => fileCompliance(compliance.id, documents)}
                        >
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            File
                          </Button>
                        </FileComplianceDialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CompliancesPage;

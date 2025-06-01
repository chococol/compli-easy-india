
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Clock, CheckCircle2, AlertCircle, ClipboardCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type ComplianceStatus = 'pending-review' | 'under-process' | 'completed';
type CompliancePriority = 'low' | 'medium' | 'high';

interface Compliance {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  category: string;
  priority: CompliancePriority;
  status: ComplianceStatus;
  regulatoryReference?: string;
  entityType: string;
  isCustom: boolean;
}

// Mock compliances data with better structure
const mockCompliances: Compliance[] = [
  {
    id: "comp-1",
    title: "GST Return Filing",
    description: "Monthly GST return submission",
    dueDate: "Apr 20, 2025",
    category: "Tax Filing",
    priority: "high",
    status: "pending-review",
    regulatoryReference: "GST Act, Section 39",
    entityType: "All",
    isCustom: false
  },
  {
    id: "comp-2",
    title: "Form 8 Annual Filing",
    description: "LLP annual return filing",
    dueDate: "May 30, 2025",
    category: "Annual Filing",
    priority: "medium",
    status: "under-process",
    regulatoryReference: "LLP Act, Section 35",
    entityType: "LLP",
    isCustom: false
  },
  {
    id: "comp-3",
    title: "FSSAI License Renewal",
    description: "Food safety license renewal",
    dueDate: "Jun 15, 2025",
    category: "License Renewal",
    priority: "medium",
    status: "completed",
    entityType: "Food Business",
    isCustom: true
  },
  {
    id: "comp-4",
    title: "Property Tax Payment",
    description: "Commercial property tax payment",
    dueDate: "Mar 31, 2025",
    category: "Tax Payment",
    priority: "high",
    status: "pending-review",
    entityType: "Property Owner",
    isCustom: true
  }
];

const CompliancesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [compliances, setCompliances] = useState<Compliance[]>(mockCompliances);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Filter compliances based on search query and active tab
  const filteredCompliances = compliances.filter((compliance) => {
    const matchesSearch = compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (compliance.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && compliance.status === 'pending-review';
    if (activeTab === 'process') return matchesSearch && compliance.status === 'under-process';
    if (activeTab === 'completed') return matchesSearch && compliance.status === 'completed';
    
    return false;
  });
  
  // Get counts for each status
  const getCounts = () => {
    const counts = {
      all: compliances.length,
      pending: compliances.filter(c => c.status === 'pending-review').length,
      process: compliances.filter(c => c.status === 'under-process').length,
      completed: compliances.filter(c => c.status === 'completed').length,
    };
    return counts;
  };
  
  const counts = getCounts();

  const updateComplianceStatus = async (complianceId: string, newStatus: ComplianceStatus) => {
    setCompliances(prevCompliances => 
      prevCompliances.map(compliance => 
        compliance.id === complianceId ? { ...compliance, status: newStatus } : compliance
      )
    );
    
    toast({
      title: "Compliance updated",
      description: `Status changed to ${newStatus.replace('-', ' ')}`,
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliances</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your regulatory compliance requirements
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Compliance
            </Button>
          </div>
        </header>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search compliances..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {counts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Review
              <Badge variant="secondary" className="ml-2">
                {counts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="process">
              Under Process
              <Badge variant="secondary" className="ml-2">
                {counts.process}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              <Badge variant="secondary" className="ml-2">
                {counts.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <CompliancesList compliances={filteredCompliances} updateStatus={updateComplianceStatus} />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <CompliancesList compliances={filteredCompliances} updateStatus={updateComplianceStatus} />
          </TabsContent>
          
          <TabsContent value="process" className="mt-6">
            <CompliancesList compliances={filteredCompliances} updateStatus={updateComplianceStatus} />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <CompliancesList compliances={filteredCompliances} updateStatus={updateComplianceStatus} />
          </TabsContent>
        </Tabs>

        {showAddForm && (
          <AddCustomComplianceForm 
            onClose={() => setShowAddForm(false)} 
            onAdd={(newCompliance) => {
              setCompliances(prev => [...prev, newCompliance]);
              setShowAddForm(false);
              toast({
                title: "Custom compliance added",
                description: "Your custom compliance requirement has been added successfully.",
              });
            }}
          />
        )}
      </div>
    </MainLayout>
  );
};

interface CompliancesListProps {
  compliances: Compliance[];
  updateStatus: (complianceId: string, newStatus: ComplianceStatus) => Promise<void>;
}

const CompliancesList: React.FC<CompliancesListProps> = ({ compliances, updateStatus }) => {
  const getStatusIcon = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending-review': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'under-process': return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    }
  };

  const getStatusBadgeClass = (status: ComplianceStatus) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'under-process':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending-review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const getStatusLabel = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending-review': return 'Pending Review';
      case 'under-process': return 'Under Process';
      case 'completed': return 'Completed';
    }
  };
  
  return (
    <div className="grid gap-4">
      {compliances.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ClipboardCheck className="h-12 w-12 text-muted-foreground opacity-25 mb-4" />
            <h3 className="text-lg font-medium mb-1">No compliances found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        compliances.map((compliance) => (
          <Card key={compliance.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    {getStatusIcon(compliance.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{compliance.title}</h3>
                        {compliance.isCustom && (
                          <Badge variant="outline" className="text-xs">Custom</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">
                        {compliance.description || "No description provided"}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {compliance.dueDate}
                        </span>
                        <span>Category: {compliance.category}</span>
                        <span>Entity: {compliance.entityType}</span>
                      </div>
                      {compliance.regulatoryReference && (
                        <p className="text-xs text-muted-foreground mt-2 font-mono">
                          {compliance.regulatoryReference}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <Badge className={getStatusBadgeClass(compliance.status)}>
                    {getStatusLabel(compliance.status)}
                  </Badge>
                  <div className="flex gap-2">
                    {compliance.status === 'pending-review' && (
                      <Button 
                        size="sm"
                        onClick={() => updateStatus(compliance.id, 'under-process')}
                      >
                        Submit for Processing
                      </Button>
                    )}
                    {compliance.status === 'under-process' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStatus(compliance.id, 'pending-review')}
                      >
                        Request Changes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

interface AddCustomComplianceFormProps {
  onClose: () => void;
  onAdd: (compliance: Compliance) => void;
}

const AddCustomComplianceForm: React.FC<AddCustomComplianceFormProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [entityType, setEntityType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCompliance: Compliance = {
      id: `custom-${Date.now()}`,
      title,
      description,
      dueDate,
      category,
      priority: 'medium',
      status: 'pending-review',
      entityType,
      isCustom: true
    };
    
    onAdd(newCompliance);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Custom Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., FSSAI License Renewal"
                required 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., License Renewal"
                required 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Entity Type</label>
              <Input 
                value={entityType} 
                onChange={(e) => setEntityType(e.target.value)}
                placeholder="e.g., Food Business, Property Owner"
                required 
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the compliance requirement"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Compliance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompliancesPage;

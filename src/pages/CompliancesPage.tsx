import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Calendar, BarChart3 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import ComplianceStats from '@/components/compliances/ComplianceStats';
import ComplianceFilters from '@/components/compliances/ComplianceFilters';
import ComplianceCalendar from '@/components/compliances/ComplianceCalendar';

type ComplianceStatus = 'pending-review' | 'under-process' | 'completed';
type CompliancePriority = 'low' | 'medium' | 'high' | 'urgent';

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

// Mock compliances data
const mockCompliances: Compliance[] = [
  {
    id: "comp-1",
    title: "GST Return Filing",
    description: "Monthly GST return submission",
    dueDate: "Apr 20, 2025",
    category: "tax",
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
    category: "filing",
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
    category: "regulatory",
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
    category: "tax",
    priority: "high",
    status: "pending-review",
    entityType: "Property Owner",
    isCustom: true
  }
];

const CompliancesPage = () => {
  const [compliances, setCompliances] = useState<Compliance[]>(mockCompliances);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter compliances based on current filters
  const filteredCompliances = compliances.filter((compliance) => {
    const matchesSearch = compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (compliance.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const matchesCategory = selectedCategory === 'all' || compliance.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || compliance.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || compliance.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  // Calculate stats
  const totalCompliances = compliances.length;
  const completedCompliances = compliances.filter(c => c.status === 'completed').length;
  const pendingCompliances = compliances.filter(c => c.status === 'pending-review').length;
  const overdueCompliances = 0; // Would calculate based on due dates

  // Calendar events
  const calendarEvents = compliances.map(compliance => ({
    id: compliance.id,
    title: compliance.title,
    date: new Date(compliance.dueDate),
    status: compliance.status === 'completed' ? 'completed' : compliance.status === 'under-process' ? 'pending' : 'pending',
    category: compliance.category,
  }));

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
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
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Compliance
          </Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ComplianceStats
              totalCompliances={totalCompliances}
              completedCompliances={completedCompliances}
              pendingCompliances={pendingCompliances}
              overdueCompliances={overdueCompliances}
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Compliances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {compliances.slice(0, 5).map((compliance) => (
                      <div key={compliance.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{compliance.title}</p>
                          <p className="text-sm text-muted-foreground">Due: {compliance.dueDate}</p>
                        </div>
                        <ComplianceStatusBadge status={compliance.status} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {compliances
                      .filter(c => c.status !== 'completed')
                      .slice(0, 5)
                      .map((compliance) => (
                        <div key={compliance.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{compliance.title}</p>
                            <p className="text-sm text-muted-foreground">{compliance.category}</p>
                          </div>
                          <Badge variant="outline">{compliance.dueDate}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <ComplianceFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onClearFilters={clearFilters}
            />
            
            <CompliancesList 
              compliances={filteredCompliances} 
              updateStatus={updateComplianceStatus} 
            />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <ComplianceCalendar events={calendarEvents} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Compliance reports and analytics coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
      case 'pending-review': return '🕐';
      case 'under-process': return '⚡';
      case 'completed': return '✅';
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
            <p className="text-lg font-medium mb-1">No compliances found</p>
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
                    <span className="text-lg">{getStatusIcon(compliance.status)}</span>
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
                        <span>Due: {compliance.dueDate}</span>
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

const ComplianceStatusBadge: React.FC<{ status: ComplianceStatus }> = ({ status }) => {
  const badgeClasses = {
    'pending-review': 'bg-yellow-100 text-yellow-800',
    'under-process': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  };
  
  const statusLabels = {
    'pending-review': 'Pending Review',
    'under-process': 'Under Process',
    'completed': 'Completed',
  };
  
  return (
    <Badge className={badgeClasses[status]}>
      {statusLabels[status]}
    </Badge>
  );
};

export default CompliancesPage;

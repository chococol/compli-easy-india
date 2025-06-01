
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { Users, FileCheck, AlertTriangle, UserPlus, Clock, Building, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type ClientSummary = {
  id: string;
  businessName: string;
  pendingCompliance: number;
  totalCompliance: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
};

const ProfessionalDashboard = () => {
  const { userProfile, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchClients = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Fetch clients
        const { data: clientsData, error: clientsError } = await supabase
          .from('clients')
          .select('id, name, compliance_status, created_at')
          .eq('professional_id', user.id);
          
        if (clientsError) throw clientsError;
        
        // Fetch compliance tasks to calculate stats
        const { data: tasksData, error: tasksError } = await supabase
          .from('compliance_tasks')
          .select('client_id, status')
          .eq('professional_id', user.id);
          
        if (tasksError) throw tasksError;
        
        // Process data to create client summaries
        const clientSummaries: ClientSummary[] = (clientsData || []).map(client => {
          const clientTasks = tasksData?.filter(task => task.client_id === client.id) || [];
          const pendingTasks = clientTasks.filter(task => 
            task.status === 'pending' || task.status === 'in-progress'
          ).length;
          
          // Calculate risk level based on percentage of pending tasks
          let riskLevel: 'low' | 'medium' | 'high' = 'low';
          if (clientTasks.length > 0) {
            const pendingPercentage = (pendingTasks / clientTasks.length) * 100;
            if (pendingPercentage >= 70) riskLevel = 'high';
            else if (pendingPercentage >= 30) riskLevel = 'medium';
          }
          
          return {
            id: client.id,
            businessName: client.name,
            pendingCompliance: pendingTasks,
            totalCompliance: clientTasks.length,
            riskLevel,
            lastActivity: client.created_at,
          };
        });
        
        setClients(clientSummaries);
      } catch (error: any) {
        console.error('Error fetching clients:', error);
        toast({
          title: 'Failed to load clients',
          description: error.message,
          variant: 'destructive',
        });
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchClients();
    }
  }, [user, toast]);
  
  // Calculate dashboard metrics
  const totalClients = clients.length;
  const pendingComplianceTasks = clients.reduce((sum, client) => sum + client.pendingCompliance, 0);
  const highRiskClients = clients.filter(client => client.riskLevel === 'high').length;
  
  const addNewClient = () => {
    navigate('/professional/clients/add');
  };
  
  const viewClientDashboard = (clientId: string) => {
    navigate(`/professional/view-client/${clientId}/dashboard`);
  };
  
  const getRiskBadgeClass = (risk: string) => {
    switch(risk) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Professional Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome {userProfile?.professionalType} professional! Select a company to view their dashboard.
            </p>
          </div>
          <Button onClick={addNewClient} className="shrink-0">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </header>
        
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Clients"
            value={totalClients.toString()}
            icon={<Users className="h-5 w-5" />}
            description="Businesses under your management"
          />
          
          <StatsCard
            title="Pending Compliance Tasks"
            value={pendingComplianceTasks.toString()}
            icon={<Clock className="h-5 w-5" />}
            description="Tasks requiring attention"
          />
          
          <StatsCard
            title="High Risk Clients"
            value={highRiskClients.toString()}
            icon={<AlertTriangle className="h-5 w-5" />}
            description="Clients with urgent compliance needs"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Your Companies
            </CardTitle>
            <CardDescription>Click on any company to view their complete dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 border rounded-lg animate-pulse">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-8">
                <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No companies yet</h3>
                <p className="text-muted-foreground mb-4">Add your first client to get started</p>
                <Button onClick={addNewClient}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Your First Client
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map(client => (
                  <Card key={client.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="truncate">{client.businessName}</span>
                        <span className={`${getRiskBadgeClass(client.riskLevel)} rounded px-2 py-1 text-xs font-medium capitalize`}>
                          {client.riskLevel}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Compliance Tasks</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{client.pendingCompliance}/{client.totalCompliance}</span>
                            <div className="h-2 w-16 bg-muted overflow-hidden rounded-full">
                              <div 
                                className="h-full bg-primary" 
                                style={{ 
                                  width: client.totalCompliance > 0 
                                    ? `${((client.totalCompliance - client.pendingCompliance) / client.totalCompliance) * 100}%` 
                                    : '0%' 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last Activity</span>
                          <span>{new Date(client.lastActivity).toLocaleDateString()}</span>
                        </div>
                        
                        <Button 
                          onClick={() => viewClientDashboard(client.id)}
                          className="w-full mt-4"
                          variant="outline"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Dashboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfessionalDashboard;

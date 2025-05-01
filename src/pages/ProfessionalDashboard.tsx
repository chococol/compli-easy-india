
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { Users, FileCheck, AlertTriangle, UserPlus, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProfessionalClientsList from '@/components/professional/ProfessionalClientsList';
import { useNavigate } from 'react-router-dom';

type ClientSummary = {
  id: string;
  businessName: string;
  pendingCompliance: number;
  totalCompliance: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
};

type DeadlineType = {
  id: string;
  clientName: string;
  clientId: string;
  filingType: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'not-started';
};

const ProfessionalDashboard = () => {
  const { userProfile, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deadlines, setDeadlines] = useState<DeadlineType[]>([]);
  const [deadlinesLoading, setDeadlinesLoading] = useState(true);
  
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
        // Set empty data to prevent loading indicator from showing indefinitely
        setClients([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchDeadlines = async () => {
      if (!user) return;
      
      setDeadlinesLoading(true);
      
      try {
        // Fetch upcoming deadlines
        const { data: deadlinesData, error: deadlinesError } = await supabase
          .from('compliance_deadlines')
          .select('id, title, due_date, status, client_id')
          .eq('professional_id', user.id)
          .gte('due_date', new Date().toISOString())
          .order('due_date', { ascending: true })
          .limit(5);
          
        if (deadlinesError) throw deadlinesError;
        
        // If we have deadlines, fetch client details
        if (deadlinesData && deadlinesData.length > 0) {
          const clientIds = deadlinesData.map(deadline => deadline.client_id);
          
          const { data: clientsData, error: clientsError } = await supabase
            .from('clients')
            .select('id, name')
            .in('id', clientIds);
            
          if (clientsError) throw clientsError;
          
          // Map client names to deadlines
          const deadlinesWithClientNames: DeadlineType[] = deadlinesData.map(deadline => {
            const client = clientsData?.find(c => c.id === deadline.client_id);
            return {
              id: deadline.id,
              clientName: client?.name || 'Unknown Client',
              clientId: deadline.client_id,
              filingType: deadline.title,
              dueDate: deadline.due_date,
              status: deadline.status || 'pending',
            };
          });
          
          setDeadlines(deadlinesWithClientNames);
        } else {
          setDeadlines([]);
        }
      } catch (error: any) {
        console.error('Error fetching deadlines:', error);
        toast({
          title: 'Failed to load deadlines',
          description: error.message,
          variant: 'destructive',
        });
        setDeadlines([]);
      } finally {
        setDeadlinesLoading(false);
      }
    };
    
    if (user) {
      fetchClients();
      fetchDeadlines();
    }
  }, [user, toast]);
  
  // Calculate dashboard metrics
  const totalClients = clients.length;
  const pendingComplianceTasks = clients.reduce((sum, client) => sum + client.pendingCompliance, 0);
  const highRiskClients = clients.filter(client => client.riskLevel === 'high').length;
  
  const addNewClient = () => {
    navigate('/professional/clients/add');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Professional Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome {userProfile?.professionalType} professional! Manage your clients' compliance here.
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Filing Deadlines</CardTitle>
              <CardDescription>Critical compliance dates for your clients</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <DeadlineTable deadlines={deadlines} isLoading={deadlinesLoading} />
          </CardContent>
        </Card>
        
        <ProfessionalClientsList clients={clients} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
};

interface DeadlineTableProps {
  deadlines: DeadlineType[];
  isLoading: boolean;
}

const DeadlineTable: React.FC<DeadlineTableProps> = ({ deadlines, isLoading }) => {
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="w-1/4"><div className="h-6 w-24 bg-muted animate-pulse rounded"></div></div>
          <div className="w-1/4"><div className="h-6 w-32 bg-muted animate-pulse rounded"></div></div>
          <div className="w-1/4"><div className="h-6 w-24 bg-muted animate-pulse rounded"></div></div>
          <div className="w-1/4"><div className="h-6 w-16 bg-muted animate-pulse rounded"></div></div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center">
            <div className="w-1/4"><div className="h-6 w-28 bg-muted animate-pulse rounded"></div></div>
            <div className="w-1/4"><div className="h-6 w-36 bg-muted animate-pulse rounded"></div></div>
            <div className="w-1/4"><div className="h-6 w-28 bg-muted animate-pulse rounded"></div></div>
            <div className="w-1/4"><div className="h-6 w-20 bg-muted animate-pulse rounded"></div></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (deadlines.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No upcoming deadlines</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2">Client</th>
            <th className="text-left py-3 px-2">Filing Type</th>
            <th className="text-left py-3 px-2">Due Date</th>
            <th className="text-left py-3 px-2">Status</th>
            <th className="text-right py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {deadlines.map(deadline => (
            <tr key={deadline.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-2">{deadline.clientName}</td>
              <td className="py-3 px-2">{deadline.filingType}</td>
              <td className="py-3 px-2">{new Date(deadline.dueDate).toLocaleDateString()}</td>
              <td className="py-3 px-2">
                <StatusBadge status={deadline.status} />
              </td>
              <td className="py-3 px-2 text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/professional/clients/${deadline.clientId}`)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  let badgeClass = '';
  let label = '';
  
  switch(status) {
    case 'pending':
      badgeClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      label = 'Pending';
      break;
    case 'in-progress':
      badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      label = 'In Progress';
      break;
    case 'completed':
      badgeClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      label = 'Completed';
      break;
    case 'not-started':
      badgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      label = 'Not Started';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      label = status;
  }
  
  return (
    <span className={`${badgeClass} rounded px-2 py-1 text-xs font-medium`}>
      {label}
    </span>
  );
};

export default ProfessionalDashboard;

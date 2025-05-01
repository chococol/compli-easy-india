
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

type ClientSummary = {
  id: string;
  businessName: string;
  pendingCompliance: number;
  totalCompliance: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
};

const ProfessionalDashboard = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock clients data
  const mockClients: ClientSummary[] = [
    {
      id: '1',
      businessName: 'Acme Corp',
      pendingCompliance: 3,
      totalCompliance: 12,
      riskLevel: 'medium',
      lastActivity: '2025-04-25',
    },
    {
      id: '2',
      businessName: 'TechSolutions Ltd',
      pendingCompliance: 1,
      totalCompliance: 8,
      riskLevel: 'low',
      lastActivity: '2025-04-28',
    },
    {
      id: '3',
      businessName: 'Global Ventures',
      pendingCompliance: 5,
      totalCompliance: 10,
      riskLevel: 'high',
      lastActivity: '2025-04-20',
    },
    {
      id: '4',
      businessName: 'Innova Enterprises',
      pendingCompliance: 2,
      totalCompliance: 15,
      riskLevel: 'medium',
      lastActivity: '2025-04-23',
    },
  ];
  
  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      // In a real implementation, this would fetch from your database
      // For now, we'll use the mock data
      setTimeout(() => {
        setClients(mockClients);
        setIsLoading(false);
      }, 500);
    };
    
    fetchClients();
  }, []);
  
  // Calculate dashboard metrics
  const totalClients = clients.length;
  const pendingComplianceTasks = clients.reduce((sum, client) => sum + client.pendingCompliance, 0);
  const highRiskClients = clients.filter(client => client.riskLevel === 'high').length;
  
  const addNewClient = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add new clients will be available shortly.",
    });
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
            <DeadlineTable />
          </CardContent>
        </Card>
        
        <ProfessionalClientsList clients={clients} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
};

const DeadlineTable = () => {
  // Mock deadlines data
  const deadlines = [
    {
      id: '1',
      clientName: 'Acme Corp',
      filingType: 'GST Return',
      dueDate: 'May 15, 2025',
      status: 'pending'
    },
    {
      id: '2',
      clientName: 'TechSolutions Ltd',
      filingType: 'Annual Returns',
      dueDate: 'May 20, 2025',
      status: 'in-progress'
    },
    {
      id: '3',
      clientName: 'Global Ventures',
      filingType: 'Tax Audit',
      dueDate: 'May 30, 2025',
      status: 'not-started'
    }
  ];
  
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
              <td className="py-3 px-2">{deadline.dueDate}</td>
              <td className="py-3 px-2">
                <StatusBadge status={deadline.status} />
              </td>
              <td className="py-3 px-2 text-right">
                <Button variant="ghost" size="sm">View Details</Button>
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

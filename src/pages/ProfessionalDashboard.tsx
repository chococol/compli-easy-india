
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { Users, Clock, AlertTriangle, UserPlus, Building, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type ClientSummary = {
  id: string;
  businessName: string;
  pendingCompliance: number;
  totalCompliance: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
};

// Dummy data for development
const dummyClients: ClientSummary[] = [
  {
    id: '1',
    businessName: 'Tech Solutions Inc.',
    pendingCompliance: 3,
    totalCompliance: 10,
    riskLevel: 'medium',
    lastActivity: '2024-06-01',
  },
  {
    id: '2', 
    businessName: 'Green Energy Corp.',
    pendingCompliance: 1,
    totalCompliance: 8,
    riskLevel: 'low',
    lastActivity: '2024-05-28',
  },
  {
    id: '3',
    businessName: 'Marketing Pros LLC',
    pendingCompliance: 7,
    totalCompliance: 9,
    riskLevel: 'high',
    lastActivity: '2024-05-25',
  },
];

const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  
  // Calculate dashboard metrics from dummy data
  const totalClients = dummyClients.length;
  const pendingComplianceTasks = dummyClients.reduce((sum, client) => sum + client.pendingCompliance, 0);
  const highRiskClients = dummyClients.filter(client => client.riskLevel === 'high').length;
  
  const addNewClient = () => {
    navigate('/professional/companies/add');
  };
  
  const viewClientDashboard = (clientId: string) => {
    navigate(`/professional/${clientId}/dashboard`);
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
              Welcome! Select a company to view their complete dashboard.
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
        
        {/* Main Companies Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Your Companies</h2>
              <p className="text-muted-foreground">Click on any company to view their complete dashboard</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dummyClients.map(client => (
              <Card key={client.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <span className="truncate flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      {client.businessName}
                    </span>
                    <span className={`${getRiskBadgeClass(client.riskLevel)} rounded-full px-3 py-1 text-xs font-medium capitalize`}>
                      {client.riskLevel}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Compliance Progress</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{client.totalCompliance - client.pendingCompliance}/{client.totalCompliance}</span>
                        <div className="h-2 w-20 bg-muted overflow-hidden rounded-full">
                          <div 
                            className="h-full bg-primary transition-all duration-300" 
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
                      <span className="text-muted-foreground">Pending Tasks</span>
                      <span className={`font-medium ${client.pendingCompliance > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                        {client.pendingCompliance}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Activity</span>
                      <span className="font-medium">{new Date(client.lastActivity).toLocaleDateString()}</span>
                    </div>
                    
                    <Button 
                      onClick={() => viewClientDashboard(client.id)}
                      className="w-full mt-4"
                      size="lg"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Client Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfessionalDashboard;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

type ClientSummary = {
  id: string;
  businessName: string;
  pendingCompliance: number;
  totalCompliance: number;
  riskLevel: 'low' | 'medium' | 'high';
  lastActivity: string;
};

interface ProfessionalClientsListProps {
  clients: ClientSummary[];
  isLoading: boolean;
}

const ProfessionalClientsList: React.FC<ProfessionalClientsListProps> = ({
  clients,
  isLoading
}) => {
  const navigate = useNavigate();
  
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
  
  const viewClient = (clientId: string) => {
    navigate(`/professional/clients/${clientId}`);
  };
  
  const viewClientDocuments = (clientId: string) => {
    navigate(`/professional/clients/${clientId}/documents`);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Clients</CardTitle>
          <CardDescription>Manage businesses under your supervision</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <ClientSkeletonRow key={i} />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No clients found</p>
            <Button variant="outline" className="mt-4">Add Your First Client</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-xs">
                  <th className="text-left py-3 px-2">Business</th>
                  <th className="text-left py-3 px-2">Risk Level</th>
                  <th className="text-left py-3 px-2">Compliance</th>
                  <th className="text-left py-3 px-2">Last Activity</th>
                  <th className="text-right py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{client.businessName}</td>
                    <td className="py-3 px-2">
                      <span className={`${getRiskBadgeClass(client.riskLevel)} rounded px-2 py-1 text-xs font-medium capitalize`}>
                        {client.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{client.pendingCompliance}/{client.totalCompliance}</span>
                        <div className="h-2 w-16 bg-muted overflow-hidden rounded-full">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${((client.totalCompliance - client.pendingCompliance) / client.totalCompliance) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {new Date(client.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => viewClientDocuments(client.id)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => viewClient(client.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ClientSkeletonRow = () => (
  <div className="flex items-center justify-between py-3 border-b">
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-5 w-16" />
    <Skeleton className="h-5 w-20" />
    <Skeleton className="h-5 w-24" />
    <div className="flex gap-2">
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </div>
);

export default ProfessionalClientsList;

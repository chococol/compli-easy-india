
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Plus, Eye, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

type Client = {
  id: string;
  name: string;
  company_type: string;
  identification: string;  // PAN/CIN/GSTIN
  id_type: string;        // Type of identification (PAN/CIN/GSTIN)
  compliance_status: 'pending' | 'complete' | 'in_progress';
  created_at: string;
};

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('professional_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setClients(data || []);
      } catch (error: any) {
        toast({
          title: 'Error fetching clients',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClients();
  }, [user, toast]);
  
  const getComplianceStatusBadge = (status: string) => {
    switch(status) {
      case 'complete':
        return (
          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
            Complete
          </span>
        );
      case 'in_progress':
        return (
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
            In Progress
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded text-xs font-medium">
            Pending
          </span>
        );
    }
  };
  
  const handleViewClient = (clientId: string) => {
    navigate(`/professional/clients/${clientId}`);
  };
  
  const handleAddClient = () => {
    navigate('/professional/clients/add');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground mt-1">
              Manage your clients and their compliance status
            </p>
          </div>
          <Button onClick={handleAddClient}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>View and manage all your clients</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-semibold">No clients yet</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Add your first client to get started with compliance management
                </p>
                <Button onClick={handleAddClient}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Client
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Company Type</TableHead>
                    <TableHead>Identification</TableHead>
                    <TableHead>Compliance Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.company_type}</TableCell>
                      <TableCell>
                        <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {client.id_type}:
                        </span>{" "}
                        {client.identification}
                      </TableCell>
                      <TableCell>{getComplianceStatusBadge(client.compliance_status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewClient(client.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientsPage;

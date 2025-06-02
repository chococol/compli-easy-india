
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Calendar, 
  FileCheck, 
  Mail, 
  MessageSquare, 
  Phone, 
  User, 
  FileText,
  PlusCircle,
  Pencil
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DocumentsList from '@/components/documents/DocumentsList';
import DocumentUpload from '@/components/documents/DocumentUpload';

type ClientDetails = {
  id: string;
  name: string;
  company_type: string;
  id_type: string;
  identification: string;
  email: string;
  phone: string | null;
  address: string | null;
  compliance_status: string;
  created_at: string;
};

type ComplianceItem = {
  id: string;
  title: string;
  due_date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  category: string;
  description: string | null;
};

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [client, setClient] = useState<ClientDetails | null>(null);
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId || !user) return;
      
      setIsLoading(true);
      try {
        // Fetch client details
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('*')
          .eq('id', clientId)
          .eq('professional_id', user.id)
          .single();
          
        if (clientError) throw clientError;
        
        setClient(clientData);
        
        // Fetch compliance tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('compliance_tasks')
          .select('*')
          .eq('client_id', clientId)
          .order('due_date', { ascending: true });
          
        if (tasksError) throw tasksError;
        
        setComplianceItems(tasksData || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch client details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchDocuments = async () => {
      if (!clientId) return;
      
      setIsDocumentsLoading(true);
      try {
        const { data, error } = await supabase
          .from('client_documents')
          .select('*')
          .eq('client_id', clientId)
          .order('uploaded_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        setDocuments(data || []);
      } catch (error: any) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsDocumentsLoading(false);
      }
    };
    
    fetchClientData();
    fetchDocuments();
  }, [clientId, toast, user]);
  
  const updateTaskStatus = async (taskId: string, newStatus: ComplianceItem['status']) => {
    try {
      const { error } = await supabase
        .from('compliance_tasks')
        .update({ status: newStatus })
        .eq('id', taskId);
        
      if (error) throw error;
      
      // Update local state
      setComplianceItems(prev => 
        prev.map(item => 
          item.id === taskId 
            ? { ...item, status: newStatus } 
            : item
        )
      );
      
      toast({
        title: "Status updated",
        description: `Compliance item status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const handleDocumentUploadSuccess = async () => {
    if (!clientId) return;
    
    try {
      const { data, error } = await supabase
        .from('client_documents')
        .select('*')
        .eq('client_id', clientId)
        .order('uploaded_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      
      setDocuments(data || []);
    } catch (error: any) {
      console.error('Error refreshing documents:', error);
    }
  };
  
  const handleAddComplianceTask = () => {
    navigate(`/professional/clients/${clientId}/compliance/add`);
  };
  
  const handleViewAllDocuments = () => {
    navigate(`/professional/clients/${clientId}/documents`);
  };
  
  const handleEditClient = () => {
    navigate(`/professional/clients/${clientId}/edit`);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (!client) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Client not found</h2>
          <p className="text-muted-foreground mt-2">
            The client you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/professional/clients')}
          >
            View All Clients
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const getCompanyTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      private_limited: 'Private Limited',
      public_limited: 'Public Limited',
      llp: 'LLP',
      partnership: 'Partnership',
      proprietorship: 'Proprietorship',
      individual: 'Individual',
      other: 'Other'
    };
    return types[type] || type;
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
            <p className="text-muted-foreground mt-1">Client management and compliance overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleEditClient}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Details
            </Button>
            <Button onClick={handleAddComplianceTask}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Compliance Task
            </Button>
          </div>
        </header>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Company Type</p>
                  <p>{getCompanyTypeLabel(client.company_type)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{client.id_type}</p>
                  <p>{client.identification}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{client.email}</p>
                </div>
              </div>
              
              {client.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{client.phone}</p>
                  </div>
                </div>
              )}
              
              {client.address && (
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>{client.address}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p>{new Date(client.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Compliance Management</CardTitle>
              <CardDescription>Track and update compliance status for this client</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems} 
                    updateStatus={updateTaskStatus} 
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'pending')} 
                    updateStatus={updateTaskStatus} 
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="in-progress" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'in-progress')} 
                    updateStatus={updateTaskStatus} 
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'completed')} 
                    updateStatus={updateTaskStatus} 
                    isLoading={isLoading}
                  />
                </TabsContent>
                
                <TabsContent value="overdue" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'overdue')} 
                    updateStatus={updateTaskStatus} 
                    isLoading={isLoading}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleAddComplianceTask}
                  variant="outline"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Latest documents for {client.name}</CardDescription>
            </div>
            <div className="flex gap-2">
              <DocumentUpload 
                clientId={client.id} 
                onSuccess={handleDocumentUploadSuccess}
              />
              <Button variant="outline" onClick={handleViewAllDocuments}>
                <FileText className="mr-2 h-4 w-4" />
                View All Documents
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DocumentsList
              documents={documents}
              isLoading={isDocumentsLoading}
              noDocumentsMessage="No documents uploaded yet for this client"
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

interface ComplianceTableProps {
  items: ComplianceItem[];
  updateStatus: (id: string, status: ComplianceItem['status']) => void;
  isLoading: boolean;
}

const ComplianceTable: React.FC<ComplianceTableProps> = ({ items, updateStatus, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center justify-between py-3 border-b">
            <div className="space-y-1 w-1/2">
              <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-4 bg-muted animate-pulse rounded w-16"></div>
              <div className="h-8 bg-muted animate-pulse rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No compliance tasks found</p>
      </div>
    );
  }
  
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2">Task</th>
            <th className="text-left py-3 px-2">Category</th>
            <th className="text-left py-3 px-2">Due Date</th>
            <th className="text-left py-3 px-2">Status</th>
            <th className="text-right py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-2">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </td>
              <td className="py-3 px-2">{item.category}</td>
              <td className="py-3 px-2">{new Date(item.due_date).toLocaleDateString()}</td>
              <td className="py-3 px-2">
                <span className={`${getStatusBadgeClass(item.status)} rounded px-2 py-1 text-xs font-medium capitalize`}>
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <select 
                  className="text-xs border rounded p-1"
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value as ComplianceItem['status'])}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDetailsPage;

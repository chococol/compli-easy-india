
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Calendar, FileCheck, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ClientDetails = {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  registrationDate: string;
  contactPerson: string;
  description: string;
};

type ComplianceItem = {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'in-progress' | 'overdue';
  category: string;
  description: string;
};

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const { toast } = useToast();
  const [client, setClient] = useState<ClientDetails | null>(null);
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true);
      try {
        // Mock data - in real app, you'd fetch from your database
        setTimeout(() => {
          setClient({
            id: clientId as string,
            name: 'Acme Corporation',
            email: 'contact@acmecorp.com',
            phone: '+91 98765 43210',
            industry: 'Technology',
            registrationDate: '2024-01-15',
            contactPerson: 'Jane Smith',
            description: 'A leading technology company specializing in innovative solutions.'
          });
          
          setComplianceItems([
            {
              id: '1',
              title: 'GST Return Filing',
              dueDate: '2025-05-15',
              status: 'pending',
              category: 'Tax',
              description: 'Monthly GST return for April 2025'
            },
            {
              id: '2',
              title: 'Annual ROC Filing',
              dueDate: '2025-06-30',
              status: 'in-progress',
              category: 'Regulatory',
              description: 'Annual return to be filed with Registrar of Companies'
            },
            {
              id: '3',
              title: 'TDS Return',
              dueDate: '2025-05-07',
              status: 'overdue',
              category: 'Tax',
              description: 'Quarterly TDS return for Q4 2024-25'
            },
            {
              id: '4',
              title: 'Board Meeting Minutes',
              dueDate: '2025-04-15',
              status: 'completed',
              category: 'Corporate',
              description: 'Minutes of the board meeting held on April 10, 2025'
            }
          ]);
          
          setIsLoading(false);
        }, 800);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch client details",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchClientData();
  }, [clientId, toast]);
  
  const updateStatus = (itemId: string, newStatus: ComplianceItem['status']) => {
    setComplianceItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus } 
          : item
      )
    );
    
    toast({
      title: "Status updated",
      description: `Compliance item status changed to ${newStatus}`,
    });
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
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
            <p className="text-muted-foreground mt-1">Client management and compliance overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
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
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p>{client.industry}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{client.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{client.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p>{client.contactPerson}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p>{new Date(client.registrationDate).toLocaleDateString()}</p>
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
              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems} 
                    updateStatus={updateStatus} 
                  />
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'pending')} 
                    updateStatus={updateStatus} 
                  />
                </TabsContent>
                
                <TabsContent value="in-progress" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'in-progress')} 
                    updateStatus={updateStatus} 
                  />
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'completed')} 
                    updateStatus={updateStatus} 
                  />
                </TabsContent>
                
                <TabsContent value="overdue" className="space-y-4">
                  <ComplianceTable 
                    items={complianceItems.filter(item => item.status === 'overdue')} 
                    updateStatus={updateStatus} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

interface ComplianceTableProps {
  items: ComplianceItem[];
  updateStatus: (id: string, status: ComplianceItem['status']) => void;
}

const ComplianceTable: React.FC<ComplianceTableProps> = ({ items, updateStatus }) => {
  if (items.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">No items found</div>;
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
              <td className="py-3 px-2">{new Date(item.dueDate).toLocaleDateString()}</td>
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

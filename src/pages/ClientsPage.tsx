
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Filter,
  Building2,
  Phone,
  Mail,
  Calendar,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  name: string;
  company_type: string;
  identification: string;
  id_type: string;
  compliance_status: 'good' | 'warning' | 'critical';
  phone?: string;
  email?: string;
  created_at: string;
  last_activity?: string;
}

// Mock clients data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'ABC Technologies Pvt Ltd',
    company_type: 'Private Limited',
    identification: 'CIN12345678901',
    id_type: 'CIN',
    compliance_status: 'good',
    phone: '+91 98765 43210',
    email: 'contact@abctech.com',
    created_at: '2024-01-15T10:30:00Z',
    last_activity: '2024-02-28T14:20:00Z'
  },
  {
    id: '2',
    name: 'XYZ Consultancy LLP',
    company_type: 'LLP',
    identification: 'LLP98765432101',
    id_type: 'LLPIN',
    compliance_status: 'warning',
    phone: '+91 87654 32109',
    email: 'info@xyzconsult.com',
    created_at: '2024-02-01T09:15:00Z',
    last_activity: '2024-02-25T11:45:00Z'
  },
  {
    id: '3',
    name: 'DEF Enterprises',
    company_type: 'Sole Proprietorship',
    identification: 'GSTIN29ABCDE1234F1Z5',
    id_type: 'GSTIN',
    compliance_status: 'critical',
    phone: '+91 76543 21098',
    email: 'owner@defent.com',
    created_at: '2024-01-20T16:45:00Z',
    last_activity: '2024-02-20T08:30:00Z'
  }
];

const ClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warning' | 'critical'>('all');

  // Filter clients based on search and status
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.identification.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && client.compliance_status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground mt-1">
              Manage your client relationships and compliance status
            </p>
          </div>
          <Button onClick={() => navigate('/add-client')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </header>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button 
              variant={filterStatus === 'good' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('good')}
            >
              Good
            </Button>
            <Button 
              variant={filterStatus === 'warning' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('warning')}
            >
              Warning
            </Button>
            <Button 
              variant={filterStatus === 'critical' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('critical')}
            >
              Critical
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredClients.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground opacity-25 mb-4" />
                <h3 className="text-lg font-medium mb-1">No clients found</h3>
                <p className="text-muted-foreground text-sm">
                  {searchQuery ? 'Try adjusting your search terms' : 'Get started by adding your first client'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredClients.map((client) => (
              <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        <Badge className={getStatusColor(client.compliance_status)}>
                          {client.compliance_status.charAt(0).toUpperCase() + client.compliance_status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Type:</span>
                          <span>{client.company_type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{client.id_type}:</span>
                          <span>{client.identification}</span>
                        </div>
                        {client.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>{client.phone}</span>
                          </div>
                        )}
                        {client.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            <span>{client.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Added: {formatDate(client.created_at)}</span>
                        </div>
                        {client.last_activity && (
                          <div className="flex items-center gap-1">
                            <span>Last activity: {formatDate(client.last_activity)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/professional/${client.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/professional/${client.id}/compliances`)}
                      >
                        Manage Compliance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientsPage;

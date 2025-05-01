
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CreditCard, 
  Plus, 
  Search, 
  ArrowDownUp, 
  Check, 
  Clock, 
  Calendar, 
  Building 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

// Dummy payment data
const dummyPayments = [
  {
    id: '1',
    companyId: '1',
    companyName: 'TechInnovate Solutions',
    amount: 15000,
    description: 'Annual compliance package',
    status: 'paid',
    dueDate: '2024-04-10T00:00:00Z',
    paidDate: '2024-04-08T14:35:00Z',
  },
  {
    id: '2',
    companyId: '2',
    companyName: 'Green Earth Exports',
    amount: 8500,
    description: 'GST filing fees - Q1',
    status: 'pending',
    dueDate: '2024-05-15T00:00:00Z',
    paidDate: null,
  },
  {
    id: '3',
    companyId: '3',
    companyName: 'Infinite Retail Services',
    amount: 12000,
    description: 'ITR filing and consultation',
    status: 'pending',
    dueDate: '2024-05-20T00:00:00Z',
    paidDate: null,
  },
  {
    id: '4',
    companyId: '1',
    companyName: 'TechInnovate Solutions',
    amount: 5000,
    description: 'Additional service - Director KYC',
    status: 'paid',
    dueDate: '2024-03-25T00:00:00Z',
    paidDate: '2024-03-22T09:12:00Z',
  },
  {
    id: '5',
    companyId: '4',
    companyName: 'Quantum Healthcare',
    amount: 25000,
    description: 'Annual audit fees',
    status: 'pending',
    dueDate: '2024-06-30T00:00:00Z',
    paidDate: null,
  }
];

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredPayments = dummyPayments.filter(payment => {
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      matchesStatus = payment.status === statusFilter;
    }
    
    const matchesSearch = searchQuery === '' || 
      payment.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesStatus && matchesSearch;
  });
  
  // Calculate totals
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = filteredPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage payment requests to clients
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Request Payment
          </Button>
        </header>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                All payment requests
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Received Payments
              </CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {filteredPayments.filter(p => p.status === 'paid').length} completed payments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {filteredPayments.filter(p => p.status === 'pending').length} pending payments
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-right py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Due Date</th>
                    <th className="text-right py-3 px-4 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{payment.companyName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{payment.description}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        ₹{payment.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          payment.status === 'paid' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {payment.status === 'paid' ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Paid
                            </>
                          ) : (
                            <>
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => navigate(`/professional/payments/${payment.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPayments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No payments found matching your filters
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PaymentsPage;

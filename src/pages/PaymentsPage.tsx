
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { CreditCard } from 'lucide-react';

const PaymentsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your payment history and invoices.
          </p>
        </header>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 text-muted-foreground opacity-25 mb-4">
              <CreditCard size={64} />
            </div>
            <h3 className="text-lg font-medium mb-2">No payment history yet</h3>
            <p className="text-muted-foreground">
              When you make or receive payments, they will appear here.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentsPage;


import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

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
              <CreditCardIcon size={64} />
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

const CreditCardIcon = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

export default PaymentsPage;

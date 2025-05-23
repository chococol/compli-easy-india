
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MessageSquare } from 'lucide-react';

const MessagesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your messages with your professional advisor.
          </p>
        </header>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 text-muted-foreground opacity-25 mb-4">
              <MessageSquare size={64} />
            </div>
            <h3 className="text-lg font-medium mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              When your professional advisor sends you a message, it will appear here.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;

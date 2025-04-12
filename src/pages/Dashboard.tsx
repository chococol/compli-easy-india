
import React from 'react';
import { FileText, ClipboardList, AlertTriangle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import TasksList from '@/components/dashboard/TasksList';
import ComplianceHealth from '@/components/dashboard/ComplianceHealth';
import DocumentsCard from '@/components/dashboard/DocumentsCard';

// Sample data - in a real app this would come from an API
const mockTasks = [
  {
    id: '1',
    title: 'Upload PAN Card',
    dueDate: 'Apr 15, 2025',
    status: 'pending' as const,
  },
  {
    id: '2',
    title: 'Review Company Details',
    dueDate: 'Apr 18, 2025',
    status: 'in-progress' as const,
  },
  {
    id: '3',
    title: 'Verify Director Information',
    dueDate: 'Apr 20, 2025',
    status: 'pending' as const,
  },
];

const mockDocuments = [
  {
    id: '1',
    name: 'PAN Card.pdf',
    type: 'Identity Document',
    uploadedAt: 'Apr 10, 2025',
  },
  {
    id: '2',
    name: 'Address Proof.pdf',
    type: 'Identity Document',
    uploadedAt: 'Apr 8, 2025',
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your company compliance status.
          </p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard
            title="Pending Tasks"
            value="3"
            icon={<ClipboardList className="h-5 w-5" />}
            description="2 tasks due this week"
          />
          
          <StatsCard
            title="Documents Uploaded"
            value="2/8"
            icon={<FileText className="h-5 w-5" />}
            description="6 more documents required"
          />
          
          <StatsCard
            title="Upcoming Deadlines"
            value="1"
            icon={<AlertTriangle className="h-5 w-5" />}
            description="GST filing due on Apr 20"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ComplianceHealth 
            score={65} 
            tasksCompleted={5} 
            totalTasks={12} 
          />
          
          <div className="lg:col-span-2">
            <TasksList tasks={mockTasks} />
          </div>
        </div>
        
        <div>
          <DocumentsCard recentDocuments={mockDocuments} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

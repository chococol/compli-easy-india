
import React, { useState, useEffect } from 'react';
import { FileText, ClipboardList, AlertTriangle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import TasksList from '@/components/dashboard/TasksList';
import ComplianceHealth from '@/components/dashboard/ComplianceHealth';
import DocumentsCard from '@/components/dashboard/DocumentsCard';
import CompanyStatusCard from '@/components/dashboard/CompanyStatusCard';
import { fetchTasks, calculateComplianceHealth, Task, fetchCompanyInfo, CompanyInfo } from '@/utils/tasksService';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

// Sample documents data - in a real app this would come from an API
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
  const { data: tasks = [], isLoading: isLoadingTasks, error: tasksError } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  const { data: companyInfo, isLoading: isLoadingCompany, error: companyError } = useQuery({
    queryKey: ['companyInfo'],
    queryFn: fetchCompanyInfo
  });

  const upcomingTasks = tasks.filter(task => 
    task.status === 'pending' || task.status === 'in-progress'
  ).slice(0, 3);
  
  const pendingTasksCount = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasksCount = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasksCount = tasks.filter(task => task.status === 'overdue').length;
  const healthMetrics = calculateComplianceHealth(tasks);

  const isLoading = isLoadingTasks || isLoadingCompany;
  const error = tasksError || companyError;

  // Show error toast if tasks fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading data",
        description: "Please try again later or contact support if the issue persists.",
        variant: "destructive"
      });
    }
  }, [error]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your company compliance status.
          </p>
        </header>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {companyInfo && (
              <div className="mb-6">
                <CompanyStatusCard companyInfo={companyInfo} />
              </div>
            )}
            
            <div className="grid gap-6 md:grid-cols-3">
              <StatsCard
                title="Pending Tasks"
                value={`${pendingTasksCount}`}
                icon={<ClipboardList className="h-5 w-5" />}
                description={`${inProgressTasksCount} tasks in progress`}
              />
              
              <StatsCard
                title="Documents Uploaded"
                value="2/8"
                icon={<FileText className="h-5 w-5" />}
                description="6 more documents required"
              />
              
              <StatsCard
                title="Overdue Items"
                value={`${overdueTasksCount}`}
                icon={<AlertTriangle className="h-5 w-5" />}
                description={overdueTasksCount > 0 ? "Requires immediate attention" : "Everything is on track"}
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ComplianceHealth 
                score={healthMetrics.score} 
                tasksCompleted={healthMetrics.completedTasks} 
                totalTasks={healthMetrics.totalTasks} 
                nextSteps={healthMetrics.nextSteps}
              />
              
              <div className="lg:col-span-2">
                <TasksList tasks={upcomingTasks} />
              </div>
            </div>
            
            <div>
              <DocumentsCard recentDocuments={mockDocuments} />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;

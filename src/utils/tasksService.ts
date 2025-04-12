import { supabase } from "@/integrations/supabase/client";

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
export type RegistrationStatus = 'not-started' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  regulatoryReference?: string;
}

export interface CompanyInfo {
  id: string;
  name: string;
  registrationStatus: RegistrationStatus;
  industry: string;
  registrationDate?: string;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('compliance_deadlines')
    .select('*')
    .order('due_date', { ascending: true });

  if (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }

  // Convert to Task interface format
  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    dueDate: new Date(item.due_date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    category: item.category,
    priority: item.priority as TaskPriority,
    status: item.status as TaskStatus,
    regulatoryReference: (item as any).regulatory_reference
  }));
};

export const updateTaskStatus = async (id: string, status: TaskStatus): Promise<void> => {
  const { error } = await supabase
    .from('compliance_deadlines')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

// Calculate compliance health based on tasks
export const calculateComplianceHealth = (tasks: Task[]) => {
  if (!tasks.length) return { score: 100, completedTasks: 0, totalTasks: 0, nextSteps: [] };
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  // Basic score calculation: completed tasks percentage minus penalties for overdue tasks
  let score = Math.round((completedTasks / totalTasks) * 100);
  
  // Penalty for overdue tasks (each overdue task reduces score by 10%)
  score = Math.max(0, score - (overdueTasks * 10));
  
  // Generate next steps based on task status
  const nextSteps = [];
  
  if (overdueTasks > 0) {
    nextSteps.push("Address overdue compliance tasks immediately");
  }
  
  if (pendingTasks > 0) {
    nextSteps.push("Complete pending regulatory requirements");
  }
  
  if (score < 70) {
    nextSteps.push("Schedule a compliance review session");
  }
  
  return {
    score,
    completedTasks,
    totalTasks,
    nextSteps
  };
};

// Mock function for company info - in a real app, this would fetch from Supabase
export const fetchCompanyInfo = async (): Promise<CompanyInfo> => {
  // This would be replaced with an actual API call in a production environment
  return {
    id: "comp-123",
    name: "Acme Corporation",
    registrationStatus: "in-progress" as RegistrationStatus,
    industry: "Technology",
    registrationDate: "Jun 15, 2025"
  };
};

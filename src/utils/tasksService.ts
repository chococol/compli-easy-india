
import { supabase } from "@/integrations/supabase/client";

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
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
    status: item.status as TaskStatus
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
  if (!tasks.length) return { score: 100, completedTasks: 0, totalTasks: 0 };
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  
  // Basic score calculation: completed tasks percentage minus penalties for overdue tasks
  let score = Math.round((completedTasks / totalTasks) * 100);
  
  // Penalty for overdue tasks (each overdue task reduces score by 10%)
  score = Math.max(0, score - (overdueTasks * 10));
  
  return {
    score,
    completedTasks,
    totalTasks
  };
};

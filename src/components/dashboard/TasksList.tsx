
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ChevronRight, FileCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskStatus } from '@/utils/tasksService';

interface TasksListProps {
  tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
          View all
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <FileText className="mx-auto h-10 w-10 opacity-25 mb-3" />
              <p>No upcoming tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{task.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                    <TaskStatusBadge status={task.status} />
                  </div>
                  {task.regulatoryReference && (
                    <div className="flex items-center gap-1 mt-1">
                      <FileCode className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{task.regulatoryReference}</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/tasks/${task.id}`)}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TaskStatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const badgeClasses = {
    'pending': 'status-badge-pending',
    'in-progress': 'status-badge-in-progress',
    'completed': 'status-badge-completed',
    'overdue': 'status-badge-overdue',
  };
  
  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'overdue': 'Overdue',
  };
  
  return (
    <Badge className={`status-badge ${badgeClasses[status]}`}>
      {statusLabels[status]}
    </Badge>
  );
};

export default TasksList;


import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Calendar, FileText } from 'lucide-react';

// Define task types
type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  category: string;
  assignedTo?: string;
}

// Sample tasks data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Upload PAN Card',
    description: 'Upload a scanned copy of your PAN card for verification.',
    dueDate: 'Apr 15, 2025',
    status: 'pending',
    category: 'Document Collection',
  },
  {
    id: '2',
    title: 'Review Company Details',
    description: 'Verify company information for registration accuracy.',
    dueDate: 'Apr 18, 2025',
    status: 'in-progress',
    category: 'Verification',
    assignedTo: 'Rahul S.',
  },
  {
    id: '3',
    title: 'Verify Director Information',
    description: 'Confirm details of all directors for registration purposes.',
    dueDate: 'Apr 20, 2025',
    status: 'pending',
    category: 'Verification',
  },
  {
    id: '4',
    title: 'Submit GST Registration Form',
    description: 'Complete and submit the GST registration application.',
    dueDate: 'Apr 25, 2025',
    status: 'pending',
    category: 'Government Filing',
  },
  {
    id: '5',
    title: 'Approve Logo Design',
    description: 'Review and approve company logo design for official documents.',
    dueDate: 'Apr 5, 2025',
    status: 'overdue',
    category: 'Branding',
  },
  {
    id: '6',
    title: 'Sign Digital Signature Certificate',
    description: 'Apply for the Digital Signature Certificate required for MCA filings.',
    dueDate: 'Apr 12, 2025',
    status: 'completed',
    category: 'Registration',
    assignedTo: 'Priya M.',
  },
];

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter tasks based on search query and active tab
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && task.status === 'pending';
    if (activeTab === 'in-progress') return matchesSearch && task.status === 'in-progress';
    if (activeTab === 'completed') return matchesSearch && task.status === 'completed';
    if (activeTab === 'overdue') return matchesSearch && task.status === 'overdue';
    
    return false;
  });
  
  // Get counts for each status
  const getCounts = () => {
    const counts = {
      all: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => t.status === 'overdue').length,
    };
    return counts;
  };
  
  const counts = getCounts();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage your compliance tasks
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </header>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 md:w-[600px]">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {counts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">
                {counts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress
              <Badge variant="secondary" className="ml-2">
                {counts['in-progress']}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              <Badge variant="secondary" className="ml-2">
                {counts.completed}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue
              <Badge variant="secondary" className="ml-2">
                {counts.overdue}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <TaskList tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <TaskList tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-6">
            <TaskList tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <TaskList tasks={filteredTasks} />
          </TabsContent>
          
          <TabsContent value="overdue" className="mt-6">
            <TaskList tasks={filteredTasks} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const getStatusBadge = (status: TaskStatus) => {
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
  
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground opacity-25 mb-4" />
            <h3 className="text-lg font-medium mb-1">No tasks found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{task.title}</h3>
                    {getStatusBadge(task.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                    <span>Category: {task.category}</span>
                    {task.assignedTo && (
                      <span>Assigned to: {task.assignedTo}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Button>View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TasksPage;

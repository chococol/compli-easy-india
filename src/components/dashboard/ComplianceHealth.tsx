
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ComplianceHealthProps {
  score: number;
  tasksCompleted: number;
  totalTasks: number;
}

const ComplianceHealth: React.FC<ComplianceHealthProps> = ({
  score,
  tasksCompleted,
  totalTasks,
}) => {
  // Helper function to determine score color
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Compliance Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Overall Score</div>
              <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</div>
            </div>
            <div className="h-20 w-20 relative flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                <path
                  className="stroke-muted"
                  fill="none"
                  strokeWidth="3"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${score >= 80 ? 'stroke-green-500' : score >= 60 ? 'stroke-yellow-500' : 'stroke-red-500'}`}
                  fill="none"
                  strokeWidth="3"
                  strokeDasharray={`${score}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tasks Completed</span>
              <span className="text-sm font-medium">{tasksCompleted}/{totalTasks}</span>
            </div>
            <Progress value={(tasksCompleted / totalTasks) * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceHealth;

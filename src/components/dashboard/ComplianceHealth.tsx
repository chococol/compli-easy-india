
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ComplianceHealthProps {
  score: number;
  tasksCompleted: number;
  totalTasks: number;
  nextSteps?: string[];
}

const ComplianceHealth: React.FC<ComplianceHealthProps> = ({
  score,
  tasksCompleted,
  totalTasks,
  nextSteps = []
}) => {
  // Helper function to determine score color
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600 dark:text-green-400';
    if (value >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Helper function to determine score icon
  const getScoreIcon = (value: number) => {
    if (value >= 80) return <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />;
    if (value >= 60) return <Info className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />;
    return <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />;
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

          {nextSteps.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                {getScoreIcon(score)}
                <span>Recommended Actions</span>
              </h4>
              <ul className="text-sm space-y-1.5">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="rounded-full bg-primary/10 text-primary px-1.5 text-xs mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceHealth;

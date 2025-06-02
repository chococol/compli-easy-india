
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

interface ComplianceStatsProps {
  totalCompliances: number;
  completedCompliances: number;
  pendingCompliances: number;
  overdueCompliances: number;
}

const ComplianceStats: React.FC<ComplianceStatsProps> = ({
  totalCompliances,
  completedCompliances,
  pendingCompliances,
  overdueCompliances,
}) => {
  const completionRate = totalCompliances > 0 ? Math.round((completedCompliances / totalCompliances) * 100) : 0;

  const stats = [
    {
      title: 'Total Compliances',
      value: totalCompliances,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: completedCompliances,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending',
      value: pendingCompliances,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Overdue',
      value: overdueCompliances,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-md`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.title === 'Completed' && (
              <p className="text-xs text-muted-foreground">
                {completionRate}% completion rate
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ComplianceStats;

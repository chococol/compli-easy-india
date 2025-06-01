
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ChevronRight, FileCode, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type CompliancePriority = 'low' | 'medium' | 'high';
export type ComplianceStatus = 'pending-review' | 'under-process' | 'completed';

export interface Compliance {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  category: string;
  priority: CompliancePriority;
  status: ComplianceStatus;
  regulatoryReference?: string;
  isCustom?: boolean;
}

interface CompliancesListProps {
  compliances: Compliance[];
}

const CompliancesList: React.FC<CompliancesListProps> = ({ compliances }) => {
  const navigate = useNavigate();
  
  const getStatusIcon = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending-review': return <Clock className="h-3 w-3 text-yellow-600" />;
      case 'under-process': return <AlertCircle className="h-3 w-3 text-blue-600" />;
      case 'completed': return <CheckCircle2 className="h-3 w-3 text-green-600" />;
    }
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium">Upcoming Compliances</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/compliances')}>
          View all
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-3">
          {compliances.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <ClipboardCheck className="mx-auto h-10 w-10 opacity-25 mb-3" />
              <p>No upcoming compliances</p>
            </div>
          ) : (
            compliances.map((compliance) => (
              <div key={compliance.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors border-l-4 border-l-primary/20">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(compliance.status)}
                    <span className="font-medium">{compliance.title}</span>
                    {compliance.isCustom && (
                      <Badge variant="outline" className="text-xs">Custom</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Due: {compliance.dueDate}</span>
                    <ComplianceStatusBadge status={compliance.status} />
                  </div>
                  {compliance.regulatoryReference && (
                    <div className="flex items-center gap-1">
                      <FileCode className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{compliance.regulatoryReference}</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/compliances`)}>
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

const ComplianceStatusBadge: React.FC<{ status: ComplianceStatus }> = ({ status }) => {
  const badgeClasses = {
    'pending-review': 'status-badge-pending',
    'under-process': 'status-badge-in-progress',
    'completed': 'status-badge-completed',
  };
  
  const statusLabels = {
    'pending-review': 'Pending Review',
    'under-process': 'Under Process',
    'completed': 'Completed',
  };
  
  return (
    <Badge className={`status-badge ${badgeClasses[status]}`}>
      {statusLabels[status]}
    </Badge>
  );
};

export default CompliancesList;

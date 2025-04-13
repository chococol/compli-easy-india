
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BuildingIcon, Calendar } from 'lucide-react';

export type RegistrationStatus = 'not-started' | 'in-progress' | 'completed';

export interface CompanyInfo {
  id: string;
  name: string;
  registrationStatus: RegistrationStatus;
  industry: string;
  registrationDate?: string;
}

interface CompanyStatusCardProps {
  companyInfo: CompanyInfo;
}

const CompanyStatusCard: React.FC<CompanyStatusCardProps> = ({ companyInfo }) => {
  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Not Started</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Company Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BuildingIcon className="h-10 w-10 text-muted-foreground opacity-70" />
            <div>
              <h3 className="text-xl font-semibold">{companyInfo.name}</h3>
              <p className="text-sm text-muted-foreground">{companyInfo.industry}</p>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Registration Status</span>
              {getStatusBadge(companyInfo.registrationStatus)}
            </div>
            
            {companyInfo.registrationDate && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Registration Date: {companyInfo.registrationDate}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyStatusCard;

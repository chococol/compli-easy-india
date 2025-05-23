
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TeamMember {
  name: string;
  position: string;
  email: string;
  phone: string;
}

interface AccountantFirmProps {
  firm: {
    name: string;
    address: string;
    contactPerson: string;
    email: string;
    phone: string;
    website: string;
    clientSince: string;
    services: string[];
    teamMembers: TeamMember[];
  };
}

const AccountantFirmSection: React.FC<AccountantFirmProps> = ({ firm }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accounting Firm</CardTitle>
          <CardDescription>Information about your accounting firm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">{firm.name}</h3>
                <p className="text-muted-foreground mt-1 mb-4">Client since {formatDate(firm.clientSince)}</p>
                
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Address</TableCell>
                      <TableCell>{firm.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Primary Contact</TableCell>
                      <TableCell>{firm.contactPerson}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>
                        <a href={`mailto:${firm.email}`} className="text-primary hover:underline">
                          {firm.email}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phone</TableCell>
                      <TableCell>
                        <a href={`tel:${firm.phone}`} className="text-primary hover:underline">
                          {firm.phone}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Website</TableCell>
                      <TableCell>
                        <a 
                          href={firm.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {firm.website}
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Services Provided</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {firm.services.map((service, index) => (
                    <Badge key={index} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Team Members</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {firm.teamMembers.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                        <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline block mt-1">
                          {member.email}
                        </a>
                        <a href={`tel:${member.phone}`} className="text-sm text-muted-foreground">
                          {member.phone}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountantFirmSection;

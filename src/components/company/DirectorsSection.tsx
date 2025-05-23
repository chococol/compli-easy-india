
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface Director {
  id: string;
  name: string;
  position: string;
  appointmentDate: string;
  email: string;
  phone: string;
  address: string;
  din: string;
}

interface DirectorsSectionProps {
  directors: Director[];
}

const DirectorsSection: React.FC<DirectorsSectionProps> = ({ directors }) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Board of Directors</CardTitle>
        <CardDescription>Information about the company's directors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {directors.map(director => (
            <Card key={director.id} className="mb-4">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-lg">{getInitials(director.name)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{director.name}</h3>
                      <p className="text-muted-foreground">{director.position}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">DIN</TableCell>
                              <TableCell>{director.din}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Appointment Date</TableCell>
                              <TableCell>{formatDate(director.appointmentDate)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Email</TableCell>
                              <TableCell>
                                <a href={`mailto:${director.email}`} className="text-primary hover:underline">
                                  {director.email}
                                </a>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Phone</TableCell>
                              <TableCell>
                                <a href={`tel:${director.phone}`} className="text-primary hover:underline">
                                  {director.phone}
                                </a>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Address</TableCell>
                              <TableCell>{director.address}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectorsSection;

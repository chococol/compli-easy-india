
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Shareholder {
  id: string;
  name: string;
  shareholding: string;
  shareClass: string;
  sharesHeld: string;
  dateAcquired: string;
  email: string;
  phone: string;
}

interface ShareholdersSectionProps {
  shareholders: Shareholder[];
}

const ShareholdersSection: React.FC<ShareholdersSectionProps> = ({ shareholders }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shareholders</CardTitle>
          <CardDescription>Information about company's shareholders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Shareholders Pie Chart could be added here */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Shareholding</TableHead>
                  <TableHead>Share Class</TableHead>
                  <TableHead>Shares Held</TableHead>
                  <TableHead>Date Acquired</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shareholders.map((shareholder) => (
                  <TableRow key={shareholder.id}>
                    <TableCell className="font-medium">{shareholder.name}</TableCell>
                    <TableCell>{shareholder.shareholding}</TableCell>
                    <TableCell>{shareholder.shareClass}</TableCell>
                    <TableCell>{shareholder.sharesHeld}</TableCell>
                    <TableCell>{formatDate(shareholder.dateAcquired)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <a href={`mailto:${shareholder.email}`} className="text-primary hover:underline">
                          {shareholder.email}
                        </a>
                        <a href={`tel:${shareholder.phone}`} className="text-muted-foreground text-sm">
                          {shareholder.phone}
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareholdersSection;

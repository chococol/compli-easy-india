
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface CompanyDetailsProps {
  company: {
    name: string;
    registrationNumber: string;
    incorporationDate: string;
    registeredAddress: string;
    businessType: string;
    industry: string;
    fiscalYear: string;
    taxId: string;
    website: string;
    email: string;
    phone: string;
    status: string;
    description: string;
  };
}

const CompanyDetailsSection: React.FC<CompanyDetailsProps> = ({ company }) => {
  // Format incorporation date for display
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
          <CardTitle>Company Information</CardTitle>
          <CardDescription>General information about your company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{company.name}</h3>
            <p className="text-muted-foreground">{company.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Registration Details</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Registration No.</TableCell>
                      <TableCell>{company.registrationNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Date of Incorporation</TableCell>
                      <TableCell>{formatDate(company.incorporationDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tax ID</TableCell>
                      <TableCell>{company.taxId}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Status</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {company.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Business Information</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Business Type</TableCell>
                      <TableCell>{company.businessType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Industry</TableCell>
                      <TableCell>{company.industry}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fiscal Year</TableCell>
                      <TableCell>{company.fiscalYear}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Contact Information</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Registered Address</TableCell>
                      <TableCell>{company.registeredAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Email</TableCell>
                      <TableCell>{company.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Phone</TableCell>
                      <TableCell>{company.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Website</TableCell>
                      <TableCell>
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {company.website}
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailsSection;

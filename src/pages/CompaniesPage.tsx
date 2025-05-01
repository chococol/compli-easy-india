
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Building, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Dummy data for companies
const dummyCompanies = [
  {
    id: '1',
    name: 'TechInnovate Solutions',
    type: 'Private Limited',
    cin: 'U72900TN2020PTC123456',
    pan: 'AAACT1234A',
    gstin: '33AAACT1234A1Z5',
    pendingCompliancesCount: 3,
    documentsCount: 12
  },
  {
    id: '2',
    name: 'Green Earth Exports',
    type: 'LLP',
    cin: 'L12345MH2018PLC098765',
    pan: 'AABCG4567B',
    gstin: '27AABCG4567B1ZQ',
    pendingCompliancesCount: 1,
    documentsCount: 8
  },
  {
    id: '3',
    name: 'Infinite Retail Services',
    type: 'Proprietorship',
    cin: '',
    pan: 'BKIPK7890C',
    gstin: '07BKIPK7890C1ZR',
    pendingCompliancesCount: 5,
    documentsCount: 4
  },
  {
    id: '4',
    name: 'Quantum Healthcare',
    type: 'Public Limited',
    cin: 'L85110KA2015PLC080123',
    pan: 'AADCQ2468D',
    gstin: '29AADCQ2468D2ZP',
    pendingCompliancesCount: 0,
    documentsCount: 15
  },
];

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCompanies = searchQuery 
    ? dummyCompanies.filter(company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (company.cin && company.cin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        company.pan.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dummyCompanies;

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground mt-1">
              Manage companies and their compliance requirements
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/professional/companies/add')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        </header>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building className="h-4 w-4" /> {company.name}
                </CardTitle>
                <CardDescription>{company.type}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  {company.cin && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CIN:</span>
                      <span className="font-medium">{company.cin}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PAN:</span>
                    <span className="font-medium">{company.pan}</span>
                  </div>
                  {company.gstin && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GSTIN:</span>
                      <span className="font-medium">{company.gstin}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/50 p-4 border-t">
                <div className="text-xs">
                  <span className="font-semibold">{company.pendingCompliancesCount}</span> pending compliances
                </div>
                <div className="text-xs">
                  <span className="font-semibold">{company.documentsCount}</span> documents
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate(`/professional/companies/${company.id}`)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CompaniesPage;

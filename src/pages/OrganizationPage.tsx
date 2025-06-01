import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, User, Crown, TrendingUp } from 'lucide-react';
import CompanyDetailsSection from '@/components/company/CompanyDetailsSection';
import DirectorsSection from '@/components/company/DirectorsSection';
import ShareholdersSection from '@/components/company/ShareholdersSection';

// Dummy data for company details
const dummyCompanyData = {
  name: 'ABC Corporation',
  registrationNumber: 'REG123456789',
  incorporationDate: '2020-05-15',
  registeredAddress: '123 Business Street, Corporate City, 56789',
  businessType: 'Private Limited Company',
  industry: 'Technology',
  fiscalYear: 'April - March',
  taxId: 'TAX987654321',
  website: 'https://abccorp.example.com',
  email: 'contact@abccorp.example.com',
  phone: '+1 (555) 123-4567',
  status: 'Active',
  description: 'ABC Corporation is a technology company specializing in software development and digital solutions.'
};

// Dummy data for directors
const dummyDirectors = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Chief Executive Officer',
    appointmentDate: '2020-05-15',
    email: 'john.smith@abccorp.example.com',
    phone: '+1 (555) 111-2222',
    address: '456 Executive Lane, Corporate City, 56789',
    din: 'DIN0001122' // Director Identification Number
  },
  {
    id: '2',
    name: 'Jane Doe',
    position: 'Chief Financial Officer',
    appointmentDate: '2020-05-15',
    email: 'jane.doe@abccorp.example.com',
    phone: '+1 (555) 333-4444',
    address: '789 Finance Avenue, Corporate City, 56789',
    din: 'DIN0003344'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    position: 'Chief Technology Officer',
    appointmentDate: '2020-06-01',
    email: 'michael.johnson@abccorp.example.com',
    phone: '+1 (555) 555-6666',
    address: '101 Tech Boulevard, Corporate City, 56789',
    din: 'DIN0005566'
  }
];

// Dummy data for shareholders
const dummyShareholders = [
  {
    id: '1',
    name: 'John Smith',
    shareholding: '35%',
    shareClass: 'Ordinary',
    sharesHeld: '35,000',
    dateAcquired: '2020-05-15',
    email: 'john.smith@abccorp.example.com',
    phone: '+1 (555) 111-2222'
  },
  {
    id: '2',
    name: 'Jane Doe',
    shareholding: '25%',
    shareClass: 'Ordinary',
    sharesHeld: '25,000',
    dateAcquired: '2020-05-15',
    email: 'jane.doe@abccorp.example.com',
    phone: '+1 (555) 333-4444'
  },
  {
    id: '3',
    name: 'Venture Capital Partners',
    shareholding: '20%',
    shareClass: 'Preferred',
    sharesHeld: '20,000',
    dateAcquired: '2020-06-15',
    email: 'investments@vcpartners.example.com',
    phone: '+1 (555) 777-8888'
  },
  {
    id: '4',
    name: 'Employee Stock Option Pool',
    shareholding: '15%',
    shareClass: 'Ordinary',
    sharesHeld: '15,000',
    dateAcquired: '2020-07-01',
    email: 'hr@abccorp.example.com',
    phone: '+1 (555) 999-0000'
  },
  {
    id: '5',
    name: 'Michael Johnson',
    shareholding: '5%',
    shareClass: 'Ordinary',
    sharesHeld: '5,000',
    dateAcquired: '2020-06-01',
    email: 'michael.johnson@abccorp.example.com',
    phone: '+1 (555) 555-6666'
  }
];

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('organization');

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
          <p className="text-muted-foreground mt-1">
            Manage your entity structure and information
          </p>
        </header>

        <Tabs defaultValue="organization" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Entity Info</span>
            </TabsTrigger>
            <TabsTrigger value="associates" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Associates</span>
            </TabsTrigger>
            <TabsTrigger value="stakeholders" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Stakeholders</span>
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Assets</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="organization" className="mt-6">
            <CompanyDetailsSection company={dummyCompanyData} />
          </TabsContent>
          
          <TabsContent value="associates" className="mt-6">
            <DirectorsSection directors={dummyDirectors} />
          </TabsContent>
          
          <TabsContent value="stakeholders" className="mt-6">
            <ShareholdersSection shareholders={dummyShareholders} />
          </TabsContent>
          
          <TabsContent value="assets" className="mt-6">
            <AssetsSection />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const AssetsSection = () => {
  const dummyAssets = [
    {
      id: '1',
      type: 'Subsidiary Entity',
      name: 'ABC Tech Solutions Pvt Ltd',
      ownership: '75%',
      location: 'Mumbai, Maharashtra',
      acquiredDate: '2021-03-15',
      value: '₹50,00,000'
    },
    {
      id: '2',
      type: 'Commercial Property',
      name: 'Office Complex - Sector 18',
      ownership: '100%',
      location: 'Gurgaon, Haryana',
      acquiredDate: '2020-08-20',
      value: '₹2,50,00,000'
    },
    {
      id: '3',
      type: 'Intellectual Property',
      name: 'Software Patent - ABC CRM',
      ownership: '100%',
      location: 'India',
      acquiredDate: '2022-01-10',
      value: '₹15,00,000'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Portfolio</CardTitle>
          <CardDescription>
            Assets, subsidiaries, and properties owned by your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dummyAssets.map((asset) => (
              <Card key={asset.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{asset.name}</span>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {asset.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Ownership:</span>
                        <br />
                        {asset.ownership}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span>
                        <br />
                        {asset.location}
                      </div>
                      <div>
                        <span className="font-medium">Acquired:</span>
                        <br />
                        {asset.acquiredDate}
                      </div>
                      <div>
                        <span className="font-medium">Value:</span>
                        <br />
                        {asset.value}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationPage;

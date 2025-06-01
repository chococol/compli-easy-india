import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, User, Crown, MapPin } from 'lucide-react';
import CompanyDetailsSection from '@/components/company/CompanyDetailsSection';
import DirectorsSection from '@/components/company/DirectorsSection';
import ShareholdersSection from '@/components/company/ShareholdersSection';
import AccountantFirmSection from '@/components/company/AccountantFirmSection';

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

// Dummy data for accountant firm
const dummyAccountantFirm = {
  name: 'Johnson & Associates',
  address: '456 Accounting Avenue, Financial District, 56789',
  contactPerson: 'Robert Johnson',
  email: 'rjohnson@johnsonassociates.example.com',
  phone: '+1 (555) 987-6543',
  website: 'https://johnsonassociates.example.com',
  clientSince: '2020-05-20',
  services: [
    'Tax Preparation',
    'Financial Audits',
    'Bookkeeping',
    'Financial Advisory',
    'Compliance Management'
  ],
  teamMembers: [
    {
      name: 'Robert Johnson',
      position: 'Lead Accountant',
      email: 'rjohnson@johnsonassociates.example.com',
      phone: '+1 (555) 987-6543'
    },
    {
      name: 'Sarah Williams',
      position: 'Tax Specialist',
      email: 'swilliams@johnsonassociates.example.com',
      phone: '+1 (555) 876-5432'
    },
    {
      name: 'David Thompson',
      position: 'Audit Manager',
      email: 'dthompson@johnsonassociates.example.com',
      phone: '+1 (555) 765-4321'
    }
  ]
};

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('organization');

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization structure and information
          </p>
        </header>

        <Tabs defaultValue="organization" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 md:w-[700px]">
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Organization</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
            </TabsTrigger>
            <TabsTrigger value="shareholders" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Shareholders</span>
            </TabsTrigger>
            <TabsTrigger value="ownerships" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <span className="hidden sm:inline">Ownerships</span>
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Professional</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="organization" className="mt-6">
            <CompanyDetailsSection company={dummyCompanyData} />
          </TabsContent>
          
          <TabsContent value="management" className="mt-6">
            <DirectorsSection directors={dummyDirectors} />
          </TabsContent>
          
          <TabsContent value="shareholders" className="mt-6">
            <ShareholdersSection shareholders={dummyShareholders} />
          </TabsContent>
          
          <TabsContent value="ownerships" className="mt-6">
            <OwnershipsSection />
          </TabsContent>
          
          <TabsContent value="professional" className="mt-6">
            <AccountantFirmSection firm={dummyAccountantFirm} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const OwnershipsSection = () => {
  const dummyOwnerships = [
    {
      id: '1',
      type: 'Subsidiary Company',
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
          <CardTitle>Ownership Portfolio</CardTitle>
          <CardDescription>
            Assets, subsidiaries, and properties owned by your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {dummyOwnerships.map((ownership) => (
              <Card key={ownership.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{ownership.name}</span>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {ownership.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Ownership:</span>
                        <br />
                        {ownership.ownership}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span>
                        <br />
                        {ownership.location}
                      </div>
                      <div>
                        <span className="font-medium">Acquired:</span>
                        <br />
                        {ownership.acquiredDate}
                      </div>
                      <div>
                        <span className="font-medium">Value:</span>
                        <br />
                        {ownership.value}
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

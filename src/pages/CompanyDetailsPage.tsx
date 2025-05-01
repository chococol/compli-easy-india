
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, FileText, ClipboardCheck, Key, Download, Calendar, Eye, EyeOff, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DocumentUpload from '@/components/documents/DocumentUpload';

// Dummy document data
const dummyDocuments = [
  {
    id: '1',
    file_name: 'certificate_of_incorporation.pdf',
    document_type: 'incorporation',
    description: 'Company registration document',
    file_type: 'pdf',
    file_size: 2500000,
    uploaded_at: '2024-04-15T10:30:00Z',
    file_path: 'documents/company1/certificate.pdf',
    public_url: 'https://example.com/documents/certificate.pdf'
  },
  {
    id: '2',
    file_name: 'gst_certificate.pdf',
    document_type: 'gst',
    description: 'GST registration certificate',
    file_type: 'pdf',
    file_size: 1800000,
    uploaded_at: '2024-04-10T14:20:00Z',
    file_path: 'documents/company1/gst.pdf',
    public_url: 'https://example.com/documents/gst.pdf'
  },
  {
    id: '3',
    file_name: 'financial_statement_2023.xlsx',
    document_type: 'financial',
    description: 'Annual financial statements',
    file_type: 'xlsx',
    file_size: 3500000,
    uploaded_at: '2024-03-28T09:15:00Z',
    file_path: 'documents/company1/finance.xlsx',
    public_url: 'https://example.com/documents/finance.xlsx'
  }
];

// Dummy compliance data
const dummyCompliances = [
  {
    id: '1',
    name: 'Form 3',
    description: 'Annual financial statement filing',
    deadline: '2024-06-30T23:59:59Z',
    status: 'pending',
    isDefault: true
  },
  {
    id: '2',
    name: 'Form 8',
    description: 'Change in director details',
    deadline: '2024-05-15T23:59:59Z',
    status: 'completed',
    isDefault: true
  },
  {
    id: '3',
    name: 'Form 11',
    description: 'Annual return filing',
    deadline: '2024-07-30T23:59:59Z',
    status: 'pending',
    isDefault: true
  },
  {
    id: '4',
    name: 'ITR Filing',
    description: 'Income Tax Return for FY 2023-24',
    deadline: '2024-07-31T23:59:59Z',
    status: 'pending',
    isDefault: true
  },
  {
    id: '5',
    name: 'GST Return',
    description: 'Monthly GST filing',
    deadline: '2024-05-20T23:59:59Z',
    status: 'pending',
    isDefault: false
  }
];

// Dummy credentials data
const dummyCredentials = [
  {
    id: '1',
    portal: 'MCA Portal',
    username: 'tech_innovate_mca',
    password: '************',
    notes: 'Login for MCA filings'
  },
  {
    id: '2',
    portal: 'GST Portal',
    username: 'tech_innovate_gst',
    password: '************',
    notes: 'For GST filing and returns'
  },
  {
    id: '3',
    portal: 'Income Tax Portal',
    username: 'techinnovate@tax',
    password: '************',
    notes: 'For ITR filing'
  }
];

// Dummy company data
const dummyCompanyData = {
  id: '1',
  name: 'TechInnovate Solutions',
  type: 'Private Limited',
  cin: 'U72900TN2020PTC123456',
  pan: 'AAACT1234A',
  tan: 'CHET12345A',
  gstin: '33AAACT1234A1Z5',
  email: 'info@techinnovate.com',
  phone: '9876543210',
  address: '123, Tech Park, Chennai, Tamil Nadu - 600001'
};

const CompanyDetailsPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswords, setShowPasswords] = useState({});
  
  const company = dummyCompanyData;
  
  // Filter documents based on search query
  const filteredDocuments = searchQuery 
    ? dummyDocuments.filter(doc => 
        doc.file_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : dummyDocuments;

  // Show/hide password toggle
  const togglePasswordVisibility = (credentialId) => {
    setShowPasswords(prev => ({
      ...prev,
      [credentialId]: !prev[credentialId]
    }));
  };
  
  const handleDocumentUploadSuccess = () => {
    // Would fetch updated documents in real implementation
    console.log('Document uploaded successfully');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/professional/companies')}
              >
                Companies
              </Button>
              <span>/</span>
              <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              {company.type} • {company.cin}
            </p>
          </div>
          <Button onClick={() => navigate(`/professional/companies/${companyId}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Company
          </Button>
        </header>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">PAN</div>
              <div>{company.pan}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">TAN</div>
              <div>{company.tan || 'Not Available'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">GSTIN</div>
              <div>{company.gstin || 'Not Registered'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Email</div>
              <div>{company.email}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Phone</div>
              <div>{company.phone}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Address</div>
              <div>{company.address}</div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="compliances" className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4" />
              <span>Compliances</span>
            </TabsTrigger>
            <TabsTrigger value="credentials" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>Credentials Manager</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Documents Tab Content */}
          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-sm">
                <Input
                  placeholder="Search documents..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DocumentUpload 
                clientId={companyId || '1'} 
                onSuccess={handleDocumentUploadSuccess}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base truncate">{doc.file_name}</CardTitle>
                    <CardDescription>
                      {new Date(doc.uploaded_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {(doc.file_size / 1024 / 1024).toFixed(2)} MB • {doc.file_type.toUpperCase()}
                    </div>
                  </CardContent>
                  <div className="flex border-t p-2">
                    <Button variant="ghost" size="sm" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Compliances Tab Content */}
          <TabsContent value="compliances" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Compliance Requirements</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Compliance
              </Button>
            </div>
            
            <div className="space-y-4">
              {dummyCompliances.map((compliance) => (
                <Card key={compliance.id} className={compliance.status === 'completed' ? 'border-green-200' : ''}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {compliance.name}
                          {compliance.isDefault && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              Default
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription>{compliance.description}</CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        compliance.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Deadline: {new Date(compliance.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                  <div className="flex border-t p-2">
                    <Button variant="ghost" size="sm" className="w-full">
                      Update Status
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      Edit Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Credentials Tab Content */}
          <TabsContent value="credentials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Stored Credentials</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Credential
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {dummyCredentials.map((credential) => (
                <Card key={credential.id}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{credential.portal}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Username</span>
                        <span className="text-sm font-medium">{credential.username}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Password</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {showPasswords[credential.id] ? 'password123' : '************'}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => togglePasswordVisibility(credential.id)}
                          >
                            {showPasswords[credential.id] ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </div>
                      {credential.notes && (
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground">Notes</span>
                          <p className="text-sm">{credential.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="flex border-t p-2">
                    <Button variant="ghost" size="sm" className="w-full">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive">
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyDetailsPage;

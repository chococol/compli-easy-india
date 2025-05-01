
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Document = {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadedAt: string;
  fileSize: string;
};

const ClientDocumentsPage = () => {
  const { clientId } = useParams();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        // Mock data - in a real app, fetch from your database
        setTimeout(() => {
          setClientName('Acme Corporation');
          setDocuments([
            {
              id: '1',
              name: 'Certificate of Incorporation.pdf',
              type: 'PDF',
              category: 'Registration Documents',
              uploadedAt: '2025-04-15',
              fileSize: '2.3 MB'
            },
            {
              id: '2',
              name: 'Board Resolution.pdf',
              type: 'PDF',
              category: 'Corporate Documents',
              uploadedAt: '2025-04-12',
              fileSize: '1.8 MB'
            },
            {
              id: '3',
              name: 'GST Registration Certificate.pdf',
              type: 'PDF',
              category: 'Tax Documents',
              uploadedAt: '2025-04-10',
              fileSize: '1.2 MB'
            },
            {
              id: '4',
              name: 'Annual Financial Statements.xlsx',
              type: 'XLSX',
              category: 'Financial Documents',
              uploadedAt: '2025-04-08',
              fileSize: '3.5 MB'
            }
          ]);
          
          setIsLoading(false);
        }, 800);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch client documents",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, [clientId, toast]);
  
  const uploadDocument = () => {
    toast({
      title: "Feature coming soon",
      description: "Document upload functionality will be available shortly.",
    });
  };
  
  const requestDocument = () => {
    toast({
      title: "Feature coming soon",
      description: "Document request functionality will be available shortly.",
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{clientName} - Documents</h1>
            <p className="text-muted-foreground mt-1">
              View and manage client documents
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={requestDocument}>
              <Plus className="mr-2 h-4 w-4" />
              Request Document
            </Button>
            <Button onClick={uploadDocument}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Repository</CardTitle>
            <CardDescription>
              All documents related to {clientName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
                <p className="text-muted-foreground mt-1">
                  Upload or request documents from your client
                </p>
                <Button className="mt-4" onClick={uploadDocument}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload First Document
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Size</th>
                      <th className="text-left py-3 px-2">Uploaded</th>
                      <th className="text-right py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map(doc => (
                      <tr key={doc.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-primary" />
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{doc.category}</td>
                        <td className="py-3 px-2">{doc.type}</td>
                        <td className="py-3 px-2">{doc.fileSize}</td>
                        <td className="py-3 px-2">{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                        <td className="py-3 px-2 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientDocumentsPage;

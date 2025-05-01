
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentsList, { Document } from '@/components/documents/DocumentsList';
import DocumentRequest from '@/components/documents/DocumentRequest';

// Dummy data for documents
const dummyDocuments = [
  {
    id: '1',
    file_name: 'certificate_of_incorporation.pdf',
    document_type: 'incorporation',
    description: 'Company registration document',
    file_type: 'pdf',
    file_size: 2500000,
    uploaded_at: '2024-04-15T10:30:00Z',
    file_path: 'documents/client1/certificate.pdf',
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
    file_path: 'documents/client1/gst.pdf',
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
    file_path: 'documents/client1/finance.xlsx',
    public_url: 'https://example.com/documents/finance.xlsx'
  }
];

const ClientDocumentsPage = () => {
  const { clientId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments);
  const [isLoading, setIsLoading] = useState(false);
  const [clientName, setClientName] = useState('ABC Corporation');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(dummyDocuments);

  useEffect(() => {
    // Filter documents based on search query
    if (!searchQuery.trim()) {
      setFilteredDocuments(documents);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = documents.filter(doc => 
      doc.file_name.toLowerCase().includes(query) || 
      doc.document_type.toLowerCase().includes(query) || 
      (doc.description && doc.description.toLowerCase().includes(query))
    );
    
    setFilteredDocuments(filtered);
  }, [searchQuery, documents]);
  
  const handleDocumentUploadSuccess = () => {
    // In a real app, we'd fetch the updated document list
    // For now just show a success message
    toast({
      title: "Success",
      description: "Document uploaded successfully",
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
            <DocumentRequest clientId={clientId || ''} clientName={clientName} />
            <DocumentUpload 
              clientId={clientId || ''} 
              onSuccess={handleDocumentUploadSuccess} 
            />
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
            <DocumentsList 
              documents={filteredDocuments}
              isLoading={isLoading}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
              noDocumentsMessage="No documents uploaded yet for this client"
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientDocumentsPage;

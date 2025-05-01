
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentsList, { Document } from '@/components/documents/DocumentsList';
import DocumentRequest from '@/components/documents/DocumentRequest';

const ClientDocumentsPage = () => {
  const { clientId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!clientId || !user) return;
      
      setIsLoading(true);
      try {
        // Fetch client info
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('name')
          .eq('id', clientId)
          .eq('professional_id', user.id)
          .single();
          
        if (clientError) throw clientError;
        
        setClientName(clientData.name);
        
        // Fetch documents
        const { data: documentsData, error: documentsError } = await supabase
          .from('client_documents')
          .select('*')
          .eq('client_id', clientId)
          .order('uploaded_at', { ascending: false });
          
        if (documentsError) throw documentsError;
        
        setDocuments(documentsData || []);
        setFilteredDocuments(documentsData || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch client documents",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, [clientId, toast, user]);
  
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
  
  const handleDocumentUploadSuccess = async () => {
    // Refresh documents list after successful upload
    if (!clientId || !user) return;
    
    try {
      const { data, error } = await supabase
        .from('client_documents')
        .select('*')
        .eq('client_id', clientId)
        .order('uploaded_at', { ascending: false });
        
      if (error) throw error;
      
      setDocuments(data || []);
      setFilteredDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to refresh documents",
        variant: "destructive",
      });
    }
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

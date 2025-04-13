
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Document type definition
export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadedAt: string;
  uploadedBy?: string;
  fileSize: string;
  file?: File;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'PAN Card.pdf',
    type: 'PDF',
    category: 'Identity Document',
    uploadedAt: 'Apr 10, 2025',
    fileSize: '1.2 MB',
  },
  {
    id: '2',
    name: 'Address Proof.pdf',
    type: 'PDF',
    category: 'Identity Document',
    uploadedAt: 'Apr 8, 2025',
    fileSize: '2.4 MB',
  },
  {
    id: '3',
    name: 'Company Logo.png',
    type: 'PNG',
    category: 'Branding',
    uploadedAt: 'Apr 5, 2025',
    fileSize: '0.8 MB',
  },
  {
    id: '4',
    name: 'Director ID Proof.jpg',
    type: 'JPG',
    category: 'Identity Document',
    uploadedAt: 'Apr 3, 2025',
    uploadedBy: 'Rajesh K.',
    fileSize: '1.5 MB',
  },
  {
    id: '5',
    name: 'Business Plan.docx',
    type: 'DOCX',
    category: 'Business Document',
    uploadedAt: 'Mar 30, 2025',
    fileSize: '3.1 MB',
  },
];

// Document categories
export const documentCategories = [
  'All Documents',
  'Identity Document',
  'Business Document',
  'Branding',
  'Certificates',
  'Other',
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // In a real app, this would be an API call to fetch documents
        // For now, we'll just use our mock data
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        setDocuments(mockDocuments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch documents');
        setLoading(false);
        toast.error('Failed to load documents');
      }
    };

    fetchDocuments();
  }, []);

  // Upload a new document
  const uploadDocument = async (document: Omit<Document, 'id' | 'uploadedAt'>) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to upload the document
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      const newDocument: Document = {
        ...document,
        id: `doc-${Date.now()}`,
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      toast.success('Document uploaded successfully!');
      return newDocument;
    } catch (err) {
      setError('Failed to upload document');
      toast.error('Failed to upload document');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // View a document
  const viewDocument = (id: string) => {
    const document = documents.find(doc => doc.id === id);
    if (!document) {
      toast.error('Document not found');
      return;
    }
    
    // In a real app, this would open the document in a viewer
    toast.info(`Viewing document: ${document.name}`);
    return document;
  };

  // Download a document
  const downloadDocument = (id: string) => {
    const document = documents.find(doc => doc.id === id);
    if (!document) {
      toast.error('Document not found');
      return;
    }
    
    // In a real app, this would download the document
    toast.success(`Downloading document: ${document.name}`);
    return document;
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to delete the document
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success('Document deleted successfully!');
    } catch (err) {
      setError('Failed to delete document');
      toast.error('Failed to delete document');
    } finally {
      setLoading(false);
    }
  };

  // Get recent documents (for dashboard)
  const getRecentDocuments = (limit: number = 3) => {
    return documents.slice(0, limit);
  };

  return {
    documents,
    loading,
    error,
    uploadDocument,
    viewDocument,
    downloadDocument,
    deleteDocument,
    getRecentDocuments,
  };
};

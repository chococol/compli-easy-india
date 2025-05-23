
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
  url?: string;
  userId?: string;
}

// Document categories
export const documentCategories = [
  'All Documents',
  'Identity Document',
  'Business Document',
  'Branding',
  'Certificates',
  'Other',
];

// Dummy documents data
const dummyDocuments: Document[] = [
  {
    id: '1',
    name: 'Business Registration.pdf',
    type: 'PDF',
    category: 'Business Document',
    uploadedAt: 'May 15, 2025',
    uploadedBy: 'user@example.com',
    fileSize: '2.5 MB',
    url: 'https://example.com/documents/business-reg.pdf',
    userId: 'user-1'
  },
  {
    id: '2',
    name: 'Tax Certificate.pdf',
    type: 'PDF',
    category: 'Certificates',
    uploadedAt: 'May 14, 2025',
    uploadedBy: 'user@example.com',
    fileSize: '1.2 MB',
    url: 'https://example.com/documents/tax-cert.pdf',
    userId: 'user-1'
  },
  {
    id: '3',
    name: 'Company Logo.png',
    type: 'PNG',
    category: 'Branding',
    uploadedAt: 'May 10, 2025',
    uploadedBy: 'user@example.com',
    fileSize: '500 KB',
    url: 'https://example.com/documents/logo.png',
    userId: 'user-1'
  },
  {
    id: '4',
    name: 'ID Document.pdf',
    type: 'PDF',
    category: 'Identity Document',
    uploadedAt: 'May 8, 2025',
    uploadedBy: 'user@example.com',
    fileSize: '1.8 MB',
    url: 'https://example.com/documents/id.pdf',
    userId: 'user-1'
  },
  {
    id: '5',
    name: 'Business Plan.docx',
    type: 'DOCX',
    category: 'Business Document',
    uploadedAt: 'May 5, 2025',
    uploadedBy: 'user@example.com',
    fileSize: '3.2 MB',
    url: 'https://example.com/documents/plan.docx',
    userId: 'user-1'
  },
  {
    id: '6',
    name: 'Financial Report.xlsx',
    type: 'XLSX',
    category: 'Business Document',
    uploadedAt: 'May 1, 2025',
    uploadedBy: 'user@example.com',
    fileSize: '4.5 MB',
    url: 'https://example.com/documents/finance.xlsx',
    userId: 'user-1'
  }
];

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload a new document
  const uploadDocument = async (document: Omit<Document, 'id' | 'uploadedAt'>) => {
    try {
      // Simulate upload delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new document with generated ID and current date
      const newDocument: Document = {
        ...document,
        id: `doc-${Date.now()}`,
        uploadedAt: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      };
      
      // Add to documents array
      setDocuments(prev => [newDocument, ...prev]);
      toast.success('Document uploaded successfully!');
      
      return newDocument;
    } catch (err) {
      console.error('Upload error:', err);
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
    
    toast.info(`Downloading document: ${document.name}`);
    
    return document;
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      setLoading(true);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
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

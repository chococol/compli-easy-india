import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

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
  userId?: string; // Add userId to track document ownership
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

export const useDocuments = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get the current user from auth context

  // Function to fetch documents from Supabase
  const fetchDocumentsFromSupabase = async () => {
    try {
      if (!user) {
        return [];
      }

      // Create a folder for the user's documents
      const userFolder = `user_${user.id}`;
      
      // We'll use the existing storage bucket for documents
      const { data: files, error } = await supabase.storage
        .from('documents')
        .list(userFolder, { sortBy: { column: 'created_at', order: 'desc' } });

      if (error) {
        throw error;
      }

      // Convert storage objects to our Document interface
      const documents: Document[] = files ? files.map(file => ({
        id: file.id,
        name: file.name,
        type: file.metadata?.mimetype?.split('/')[1]?.toUpperCase() || 'PDF',
        category: file.metadata?.category || 'Other',
        uploadedAt: new Date(file.created_at || Date.now()).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        fileSize: `${Math.round((file.metadata?.size || 0) / 1024)} KB`,
        url: supabase.storage.from('documents').getPublicUrl(`${userFolder}/${file.name}`).data.publicUrl,
        userId: user.id
      })) : [];

      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  // Mock documents for development/testing when Supabase isn't connected
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

  // Fetch documents query
  const { data: documents = [], isLoading: loading } = useQuery({
    queryKey: ['documents', user?.id],  // Add user ID to query key for proper caching
    queryFn: async () => {
      try {
        // Skip if no user is logged in
        if (!user) {
          return [];
        }

        // Check if Supabase storage is available by trying to list buckets
        try {
          // First, check if the documents bucket exists
          const { data, error } = await supabase.storage.getBucket('documents');
          
          if (error) {
            // If there's an error, try to create the bucket
            const { error: createError } = await supabase.storage.createBucket('documents', {
              public: true
            });
            
            // If we can't create it either, use mock data
            if (createError) {
              console.log('Cannot create bucket, using mock data:', createError);
              return mockDocuments;
            }
          }
          
          // Create a folder for the user if needed
          const userFolder = `user_${user.id}`;
          
          // Check if user folder exists, if not it will be created on first upload
          
          // If we made it here, the bucket exists or was created, so fetch documents
          return fetchDocumentsFromSupabase();
        } catch (err) {
          console.log('Error accessing Supabase storage, using mock data:', err);
          return mockDocuments;
        }
      } catch (err) {
        console.log('Using mock data due to error:', err);
        return mockDocuments;
      }
    },
    enabled: !!user, // Only run the query if a user is logged in
  });

  // Upload document mutation
  const uploadMutation = useMutation({
    mutationFn: async (document: Omit<Document, 'id' | 'uploadedAt'>) => {
      try {
        if (!document.file || !user) {
          throw new Error('No file provided or user not logged in');
        }

        // Try to use Supabase storage
        try {
          // Create a folder for the user's documents
          const userFolder = `user_${user.id}`;
          
          // Create a unique file name to avoid collisions
          const fileName = `${Date.now()}-${document.name}`;
          const filePath = `${userFolder}/${fileName}`;
          
          // Upload the file to Supabase storage
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, document.file, {
              cacheControl: '3600',
              upsert: false,
            });
            
          if (uploadError) throw uploadError;
          
          // Get the public URL for the uploaded file
          const { data } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath);
            
          // Return the new document object
          const newDocument: Document = {
            ...document,
            id: `doc-${Date.now()}`,
            uploadedAt: new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }),
            url: data.publicUrl,
            userId: user.id
          };
          
          return newDocument;
        } catch (err) {
          console.error("Supabase upload failed, using mock data:", err);
          // Fall back to mock behavior for demo purposes
          const newDocument: Document = {
            ...document,
            id: `doc-${Date.now()}`,
            uploadedAt: new Date().toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }),
            userId: user?.id
          };
          
          return newDocument;
        }
      } catch (err) {
        console.error('Upload error:', err);
        throw err;
      }
    },
    onSuccess: (newDocument) => {
      // Add the new document to the documents list
      queryClient.setQueryData(['documents', user?.id], (oldData: Document[] = []) => [
        newDocument,
        ...oldData,
      ]);
      toast.success('Document uploaded successfully!');
    },
    onError: (err) => {
      setError('Failed to upload document');
      toast.error('Failed to upload document');
    },
  });

  // Upload a new document
  const uploadDocument = async (document: Omit<Document, 'id' | 'uploadedAt'>) => {
    return uploadMutation.mutateAsync(document);
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
    
    if (document.url) {
      // If we have a URL, open it in a new tab
      window.open(document.url, '_blank');
    } else {
      // Mock download for demo purposes
      toast.success(`Downloading document: ${document.name}`);
    }
    
    return document;
  };

  // Delete a document
  const deleteDocument = async (id: string) => {
    try {
      const document = documents.find(doc => doc.id === id);
      if (!document) {
        toast.error('Document not found');
        return;
      }

      // Try to delete from Supabase if possible
      try {
        // Extract the filename from the URL if it exists
        if (document.url && user) {
          const userFolder = `user_${user.id}`;
          const urlParts = document.url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `${userFolder}/${fileName}`;
          
          const { error } = await supabase.storage
            .from('documents')
            .remove([filePath]);
              
          if (error) throw error;
        }
      } catch (err) {
        console.error("Supabase delete failed:", err);
        // Continue with optimistic UI update even if Supabase delete fails
      }

      // Update the local cache
      queryClient.setQueryData(['documents', user?.id], (oldData: Document[] = []) => 
        oldData.filter(doc => doc.id !== id)
      );
      
      toast.success('Document deleted successfully!');
    } catch (err) {
      setError('Failed to delete document');
      toast.error('Failed to delete document');
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

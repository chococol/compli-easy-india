
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

  // Function to ensure the documents bucket exists
  const ensureDocumentsBucket = async () => {
    try {
      // Check if the documents bucket exists
      const { data, error } = await supabase.storage.getBucket('documents');
      
      if (error) {
        // If there's an error, try to create the bucket
        const { error: createError } = await supabase.storage.createBucket('documents', {
          public: true
        });
        
        if (createError) {
          console.error('Cannot create bucket:', createError);
          return false;
        }
      }
      return true;
    } catch (err) {
      console.error('Error accessing Supabase storage:', err);
      return false;
    }
  };

  // Function to fetch documents from Supabase
  const fetchDocumentsFromSupabase = async () => {
    try {
      if (!user) {
        return [];
      }

      // Ensure bucket exists
      const bucketExists = await ensureDocumentsBucket();
      if (!bucketExists) {
        return [];
      }

      // Create a folder for the user's documents
      const userFolder = `user_${user.id}`;
      
      try {
        // We'll use the existing storage bucket for documents
        const { data: files, error } = await supabase.storage
          .from('documents')
          .list(userFolder, { sortBy: { column: 'created_at', order: 'desc' } });

        if (error) {
          // If error is about folder not existing, it's a new user with no documents
          if (error.message.includes('does not exist')) {
            return [];
          }
          throw error;
        }

        // Convert storage objects to our Document interface
        const documents: Document[] = files ? await Promise.all(files.map(async file => {
          // Get public URL for each file
          const { data: urlData } = supabase.storage
            .from('documents')
            .getPublicUrl(`${userFolder}/${file.name}`);
            
          return {
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
            url: urlData.publicUrl,
            userId: user.id,
            uploadedBy: user.email
          };
        })) : [];

        return documents;
      } catch (err) {
        // If this fails, it's likely because the folder doesn't exist yet
        console.log('User folder might not exist yet:', err);
        return [];
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  // Fetch documents query
  const { data: documents = [], isLoading: loading } = useQuery({
    queryKey: ['documents', user?.id],  // Add user ID to query key for proper caching
    queryFn: fetchDocumentsFromSupabase,
    enabled: !!user, // Only run the query if a user is logged in
  });

  // Upload document mutation
  const uploadMutation = useMutation({
    mutationFn: async (document: Omit<Document, 'id' | 'uploadedAt'>) => {
      try {
        if (!document.file || !user) {
          throw new Error('No file provided or user not logged in');
        }

        // Ensure bucket exists
        const bucketExists = await ensureDocumentsBucket();
        if (!bucketExists) {
          throw new Error('Failed to create storage bucket');
        }

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
            contentType: document.file.type,
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
    
    if (document.url) {
      window.open(document.url, '_blank');
    } else {
      toast.error('Document URL not available');
    }
    
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
      toast.error('Document URL not available');
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

      if (document.url && user) {
        // Extract the filename from the URL
        const urlParts = document.url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const userFolder = `user_${user.id}`;
        const filePath = `${userFolder}/${fileName}`;
        
        const { error } = await supabase.storage
          .from('documents')
          .remove([filePath]);
            
        if (error) {
          console.error("Supabase delete failed:", error);
          toast.error('Failed to delete from storage');
          return;
        }
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

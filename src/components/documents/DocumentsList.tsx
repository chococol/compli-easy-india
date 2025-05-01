
import React from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Document {
  id: string;
  file_name: string;
  document_type: string;
  description?: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  file_path: string;
  public_url?: string;
}

interface DocumentsListProps {
  documents: Document[];
  isLoading: boolean;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  noDocumentsMessage?: string;
}

const DocumentsList: React.FC<DocumentsListProps> = ({ 
  documents, 
  isLoading, 
  onSearch,
  searchQuery = '',
  noDocumentsMessage = 'No documents found'
}) => {
  const { toast } = useToast();

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'incorporation':
        return 'Certificate of Incorporation';
      case 'pan':
        return 'PAN Card';
      case 'gst':
        return 'GST Certificate';
      case 'financial':
        return 'Financial Statements';
      case 'tax':
        return 'Tax Returns';
      case 'compliance':
        return 'Compliance Certificate';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleDownload = async (document: Document) => {
    try {
      // If we have a public URL, use it directly
      if (document.public_url) {
        window.open(document.public_url, '_blank');
        return;
      }
      
      // Otherwise, download using Supabase Storage
      const { data, error } = await supabase.storage
        .from('client-documents')
        .download(document.file_path);
      
      if (error) throw error;
      
      // Create a download link using the browser's document object
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.file_name;
      window.document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(link);
    } catch (error: any) {
      toast({
        title: 'Download Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleView = (document: Document) => {
    // If we have a public URL, use it to view the document
    if (document.public_url) {
      window.open(document.public_url, '_blank');
    } else {
      toast({
        title: 'View Failed',
        description: 'Document viewing is not available',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between items-center py-4 border-b">
            <div className="space-y-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {onSearch && (
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-5 w-5"
              onClick={() => onSearch('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      {documents.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-semibold">{noDocumentsMessage}</h3>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">{doc.file_name}</div>
                      {doc.description && (
                        <div className="text-xs text-muted-foreground">{doc.description}</div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getDocumentTypeLabel(doc.document_type)}</TableCell>
                <TableCell>{formatFileSize(doc.file_size)}</TableCell>
                <TableCell>{new Date(doc.uploaded_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(doc)}
                    title="View Document"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(doc)}
                    title="Download Document"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DocumentsList;

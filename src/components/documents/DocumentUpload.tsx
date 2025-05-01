
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DocumentUploadProps {
  clientId: string;
  onSuccess?: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ clientId, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !docType) {
      toast({
        title: 'Missing Information',
        description: 'Please select a file and document type',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload file to Supabase Storage - Using a simulated dummy flow
      const fileExt = file.name.split('.').pop();
      const fileName = `dummy-${Date.now()}.${fileExt}`;
      const filePath = `documents/${clientId}/${fileName}`;

      // Simulate Supabase storage operations
      console.log('Would upload file to:', filePath);

      // 2. Get public URL for the file - Dummy URL
      const publicUrl = `https://example.com/documents/${fileName}`;

      // 3. Store document metadata in database - Simulation
      console.log('Would store document metadata:', {
        client_id: clientId,
        file_name: file.name,
        file_type: fileExt,
        document_type: docType,
        description: description,
        file_size: file.size,
        file_path: filePath,
        public_url: publicUrl,
      });

      toast({
        title: 'Document Uploaded',
        description: 'File has been successfully uploaded',
      });

      // Reset form and close dialog
      setFile(null);
      setDocType('');
      setDescription('');
      setOpen(false);

      // Notify parent component to refresh document list
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a document to the client's records
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="docType">Document Type</Label>
            <Select
              value={docType}
              onValueChange={setDocType}
              disabled={isUploading}
            >
              <SelectTrigger id="docType">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incorporation">Certificate of Incorporation</SelectItem>
                <SelectItem value="pan">PAN Card</SelectItem>
                <SelectItem value="gst">GST Certificate</SelectItem>
                <SelectItem value="financial">Financial Statements</SelectItem>
                <SelectItem value="tax">Tax Returns</SelectItem>
                <SelectItem value="compliance">Compliance Certificates</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              disabled={isUploading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUpload;

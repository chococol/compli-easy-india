
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X } from 'lucide-react';

interface Compliance {
  id: string;
  title: string;
  category: string;
  description: string;
  dueDate: string;
}

interface FileComplianceDialogProps {
  children: React.ReactNode;
  compliance: Compliance;
  onFile: (documents: string[]) => void;
}

const FileComplianceDialog: React.FC<FileComplianceDialogProps> = ({
  children,
  compliance,
  onFile
}) => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulate document URLs (in real app, these would be actual upload URLs)
    const newDocuments = files.map(file => `uploaded/${file.name}`);
    setDocuments(prev => [...prev, ...newDocuments]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onFile(documents);
    setOpen(false);
    setDocuments([]);
    setNotes('');
    setUploadedFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>File Compliance: {compliance.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium">{compliance.title}</h3>
                <p className="text-sm text-muted-foreground">{compliance.description}</p>
                <p className="text-sm">
                  <span className="font-medium">Category:</span> {compliance.category}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Due Date:</span> {new Date(compliance.dueDate).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Upload Documents</Label>
              <div className="mt-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, JPG, PNG (MAX. 10MB)</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes or comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={uploadedFiles.length === 0}
              className="flex-1"
            >
              Submit Filing
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileComplianceDialog;

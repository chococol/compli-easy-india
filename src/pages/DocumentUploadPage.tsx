import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileText, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDocuments, documentCategories } from '@/hooks/useDocuments';
import { useAuth } from '@/contexts/AuthContext';

// Form validation schema
const formSchema = z.object({
  documentName: z.string().min(1, { message: 'Document name is required' }),
  documentCategory: z.string().min(1, { message: 'Document category is required' }),
  file: z.instanceof(File, { message: 'File is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const DocumentUploadPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadDocument } = useDocuments();
  const { user } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentName: '',
      documentCategory: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      form.setValue('file', file);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    form.setValue('file', undefined as any);
  };

  const onSubmit = async (data: FormValues) => {
    setIsUploading(true);
    
    try {
      if (!user) {
        toast.error('You must be logged in to upload documents');
        navigate('/auth');
        return;
      }

      await uploadDocument({
        name: data.documentName,
        type: selectedFile?.type.split('/')[1].toUpperCase() || 'PDF',
        category: data.documentCategory,
        fileSize: `${Math.round((selectedFile?.size || 0) / 1024)} KB`,
        file: selectedFile!,
        uploadedBy: user.email,
        userId: user.id
      });

      navigate('/documents');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Upload Document</h1>
          <p className="text-muted-foreground mt-1">
            Upload important documents for your business
          </p>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload a New Document</CardTitle>
            <CardDescription>
              Accepted file formats: PDF, JPEG, PNG, DOC, DOCX
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="documentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter document name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give your document a clear descriptive name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="documentCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {documentCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Categorize your document for better organization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Upload File</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          {!selectedFile ? (
                            <div 
                              className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={() => document.getElementById('file-upload')?.click()}
                            >
                              <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                              <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                              <p className="text-xs text-muted-foreground">
                                PDF, JPEG, PNG, DOC, DOCX (Max 10MB)
                              </p>
                              <Input 
                                id="file-upload" 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">{selectedFile.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {Math.round(selectedFile.size / 1024)} KB
                                  </p>
                                </div>
                              </div>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                onClick={clearSelectedFile}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          <Input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            onChange={handleFileChange}
                            accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/documents')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isUploading || !selectedFile}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Document'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DocumentUploadPage;

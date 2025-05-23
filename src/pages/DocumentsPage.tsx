
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Upload, FileText, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocuments, documentCategories, Document } from '@/hooks/useDocuments';

const DocumentsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, loading, downloadDocument, viewDocument } = useDocuments();
  const [activeCategory, setActiveCategory] = useState('All Documents');
  
  // Filter documents based on search query and active category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'All Documents') return matchesSearch;
    return matchesSearch && doc.category === activeCategory;
  });

  // Handle document view
  const handleViewDocument = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  // Handle document download
  const handleDownloadDocument = (documentId: string) => {
    downloadDocument(documentId);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Store and access all your important business documents
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => navigate('/documents/upload')}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </header>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <p>Loading documents...</p>
          </div>
        ) : (
          <Tabs 
            defaultValue="All Documents" 
            onValueChange={setActiveCategory}
            className="space-y-4"
          >
            <TabsList className="flex flex-wrap">
              {documentCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {documentCategories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {filteredDocuments.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground opacity-25 mb-4" />
                      <h3 className="text-lg font-medium mb-1">No documents found</h3>
                      <p className="text-muted-foreground text-sm">
                        Try adjusting your search or upload new documents
                      </p>
                      <Button className="mt-4" onClick={() => navigate('/documents/upload')}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDocuments.map((doc) => (
                      <DocumentCard 
                        key={doc.id} 
                        document={doc} 
                        onView={handleViewDocument}
                        onDownload={handleDownloadDocument}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

const DocumentCard: React.FC<{ 
  document: Document,
  onView: (id: string) => void,
  onDownload: (id: string) => void
}> = ({ document, onView, onDownload }) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-muted p-4 flex items-center justify-center border-b h-40">
        <FileText className="h-16 w-16 text-muted-foreground opacity-50" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-1 truncate" title={document.name}>
          {document.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {document.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {document.fileSize}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Uploaded on {document.uploadedAt}
          {document.uploadedBy && ` by ${document.uploadedBy}`}
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="w-full" onClick={() => onView(document.id)}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="w-full" onClick={() => onDownload(document.id)}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsPage;

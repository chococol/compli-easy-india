
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocuments, Document } from '@/hooks/useDocuments';

interface DocumentsCardProps {
  recentDocuments?: Document[];
}

const DocumentsCard: React.FC<DocumentsCardProps> = ({ recentDocuments }) => {
  const navigate = useNavigate();
  const { getRecentDocuments } = useDocuments();
  
  // If recentDocuments are not provided, use the hook to get them
  const documents = recentDocuments || getRecentDocuments(3);
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium">Documents</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate('/documents/upload')}>
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/documents')}>
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          {documents.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <FileText className="mx-auto h-10 w-10 opacity-25 mb-3" />
              <p>No documents yet</p>
              <Button 
                variant="link" 
                onClick={() => navigate('/documents/upload')}
                className="mt-2"
              >
                Upload your first document
              </Button>
            </div>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {doc.category} • Uploaded {doc.uploadedAt}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate(`/documents/${doc.id}`)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsCard;

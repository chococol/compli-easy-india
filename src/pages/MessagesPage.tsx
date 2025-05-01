
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, Building, Plus } from 'lucide-react';

// Dummy messages data
const dummyMessages = [
  {
    id: '1',
    companyId: '1',
    companyName: 'TechInnovate Solutions',
    subject: 'Annual compliance documents required',
    preview: 'Please upload the annual financial statements for the year ending March 2024...',
    date: '2024-04-20T09:30:00Z',
    isRead: true,
  },
  {
    id: '2',
    companyId: '2',
    companyName: 'Green Earth Exports',
    subject: 'GST filing reminder',
    preview: 'This is a reminder that your GST filing for Q1 is due next week. Please ensure...',
    date: '2024-04-22T14:15:00Z',
    isRead: false,
  },
  {
    id: '3',
    companyId: '3',
    companyName: 'Infinite Retail Services',
    subject: 'Payment confirmation',
    preview: 'We confirm the receipt of your payment for ITR filing services. Your invoice...',
    date: '2024-04-18T11:45:00Z',
    isRead: true,
  },
  {
    id: '4',
    companyId: '4',
    companyName: 'Quantum Healthcare',
    subject: 'Document verification',
    preview: 'We need to verify some details in the documents you submitted. Could you please...',
    date: '2024-04-23T10:20:00Z',
    isRead: false,
  },
  {
    id: '5',
    companyId: '1',
    companyName: 'TechInnovate Solutions',
    subject: 'Director KYC completion',
    preview: 'The Director KYC process has been completed successfully. You can now proceed...',
    date: '2024-04-15T16:05:00Z',
    isRead: true,
  }
];

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  
  const filteredMessages = searchQuery 
    ? dummyMessages.filter(message => 
        message.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dummyMessages;
  
  const selectedMessage = dummyMessages.find(message => message.id === selectedMessageId);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground mt-1">
              Communicate with your clients
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </header>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4 xl:col-span-3 space-y-4">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id}
                className={`cursor-pointer transition-colors ${
                  selectedMessageId === message.id 
                    ? 'border-primary' 
                    : message.isRead 
                      ? '' 
                      : 'bg-muted/30'
                }`}
                onClick={() => setSelectedMessageId(message.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">{message.companyName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className={`text-sm mt-2 ${!message.isRead && 'font-semibold'}`}>
                    {message.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {message.preview}
                  </p>
                </CardContent>
              </Card>
            ))}
            
            {filteredMessages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No messages found
              </div>
            )}
          </div>
          
          <div className="md:col-span-7 lg:col-span-8 xl:col-span-9">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedMessage.subject}</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        {selectedMessage.companyName} • {new Date(selectedMessage.date).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reply</Button>
                      <Button variant="outline" size="sm">Forward</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>Dear Accounting Professional,</p>
                    <p>{selectedMessage.preview}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
                    <p>Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
                    <p>Best regards,<br />Client Support Team</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No message selected</h3>
                  <p className="text-muted-foreground mt-2">
                    Select a message to view its contents
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface DocumentRequestProps {
  clientId: string;
  clientName: string;
}

const DocumentRequest: React.FC<DocumentRequestProps> = ({ clientId, clientName }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [docType, setDocType] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!docType || !subject || !message || !emailTo) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // This is a dummy implementation
      console.log('Would send request to:', emailTo);
      console.log('Request details:', {
        clientId,
        professionalId: user?.id,
        documentType: docType,
        subject,
        message,
        emailTo,
        status: 'pending'
      });

      // Wait a bit to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Document Request Sent',
        description: `Your request has been sent to ${emailTo}`,
      });

      // Reset form and close dialog
      setDocType('');
      setSubject('');
      setMessage('');
      setEmailTo('');
      setOpen(false);
    } catch (error: any) {
      toast({
        title: 'Request Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-populate message if client name and document type are selected
  React.useEffect(() => {
    if (clientName && docType) {
      const docTypeLabel = docType === 'other' ? 'document' : docType.replace('_', ' ');
      setSubject(`${docTypeLabel.charAt(0).toUpperCase() + docTypeLabel.slice(1)} Required for ${clientName}`);
      setMessage(`Please provide the ${docTypeLabel} for ${clientName} at your earliest convenience.\n\nThank you.`);
    }
  }, [clientName, docType]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Request Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Document from Client</DialogTitle>
          <DialogDescription>
            Send a document request email to your client
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="emailTo">Client Email</Label>
            <Input
              id="emailTo"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              placeholder="client@example.com"
              type="email"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="docType">Document Type</Label>
            <Select
              value={docType}
              onValueChange={setDocType}
              disabled={isSubmitting}
            >
              <SelectTrigger id="docType">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incorporation_certificate">Certificate of Incorporation</SelectItem>
                <SelectItem value="pan_card">PAN Card</SelectItem>
                <SelectItem value="gst_certificate">GST Certificate</SelectItem>
                <SelectItem value="financial_statements">Financial Statements</SelectItem>
                <SelectItem value="tax_returns">Tax Returns</SelectItem>
                <SelectItem value="compliance_certificate">Compliance Certificate</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRequest;

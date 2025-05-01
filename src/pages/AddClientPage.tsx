
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const clientFormSchema = z.object({
  name: z.string().min(2, { message: 'Client name must be at least 2 characters' }),
  company_type: z.string().min(1, { message: 'Please select a company type' }),
  id_type: z.string().min(1, { message: 'Please select an identification type' }),
  identification: z.string().min(1, { message: 'Please enter the identification number' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

const AddClientPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      company_type: '',
      id_type: '',
      identification: '',
      email: '',
      phone: '',
      address: '',
    },
  });
  
  const onSubmit = async (data: ClientFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to add a client',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const { error } = await supabase.from('clients').insert({
        professional_id: user.id,
        name: data.name,
        company_type: data.company_type,
        id_type: data.id_type,
        identification: data.identification,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        compliance_status: 'pending',
      });
      
      if (error) throw error;
      
      toast({
        title: 'Client Added',
        description: 'The client has been successfully added',
      });
      
      navigate('/professional/clients');
    } catch (error: any) {
      toast({
        title: 'Failed to add client',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Add New Client</h1>
          <p className="text-muted-foreground mt-1">
            Create a new client record to manage their compliance
          </p>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Enter the client's basic details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="private_limited">Private Limited</SelectItem>
                            <SelectItem value="public_limited">Public Limited</SelectItem>
                            <SelectItem value="llp">LLP</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="proprietorship">Proprietorship</SelectItem>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="id_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ID type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PAN">PAN</SelectItem>
                            <SelectItem value="CIN">CIN</SelectItem>
                            <SelectItem value="GSTIN">GSTIN</SelectItem>
                            <SelectItem value="TAN">TAN</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="identification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ID number" {...field} />
                        </FormControl>
                        <FormDescription>
                          The PAN, CIN, GSTIN or other identification number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="client@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/professional/clients')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Client</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddClientPage;

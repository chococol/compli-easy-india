
import React, { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Briefcase, FileText } from 'lucide-react';

const clientFormSchema = z.object({
  name: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  company_type: z.string().min(1, { message: 'Please select a company type' }),
  cin: z.string().optional(),
  pan: z.string().length(10, { message: 'PAN must be exactly 10 characters' }),
  tan: z.string().optional(),
  is_gst_registered: z.boolean().default(false),
  gstin: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => {
  // If GST is registered, GSTIN is required
  if (data.is_gst_registered && !data.gstin) {
    return false;
  }
  return true;
}, {
  message: "GSTIN is required when registered for GST",
  path: ["gstin"]
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

const AddClientPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isGstRegistered, setIsGstRegistered] = useState(false);
  
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      company_type: '',
      cin: '',
      pan: '',
      tan: '',
      is_gst_registered: false,
      gstin: '',
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
      const clientData = {
        professional_id: user.id,
        name: data.name,
        company_type: data.company_type,
        cin: data.cin || null,
        pan: data.pan,
        tan: data.tan || null,
        is_gst_registered: data.is_gst_registered,
        gstin: data.is_gst_registered ? data.gstin : null,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        compliance_status: 'pending',
      };
      
      const { error } = await supabase.from('clients').insert(clientData);
      
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

  const handleGstRegisteredChange = (checked: boolean) => {
    setIsGstRegistered(checked);
    form.setValue('is_gst_registered', checked);
    if (!checked) {
      form.setValue('gstin', '');
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
                        <FormLabel className="flex items-center gap-2">
                          <Building className="h-4 w-4" /> Company Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
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
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" /> Company Type
                        </FormLabel>
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
                    name="cin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> CIN
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter CIN" {...field} />
                        </FormControl>
                        <FormDescription>
                          Corporate Identity Number (if applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> PAN
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PAN" {...field} />
                        </FormControl>
                        <FormDescription>
                          Permanent Account Number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> TAN
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter TAN" {...field} />
                        </FormControl>
                        <FormDescription>
                          Tax Deduction Account Number (if applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="is_gst_registered"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={(checked) => {
                              handleGstRegisteredChange(checked === true);
                            }} 
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            GST Registered
                          </FormLabel>
                          <FormDescription>
                            Check if the company is registered for GST
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {isGstRegistered && (
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <FileText className="h-4 w-4" /> GSTIN
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter GSTIN" {...field} />
                          </FormControl>
                          <FormDescription>
                            Goods and Services Tax Identification Number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
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

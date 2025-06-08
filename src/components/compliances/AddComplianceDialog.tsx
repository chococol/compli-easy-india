
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Search, Shield, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AvailableCompliance {
  id: string;
  title: string;
  description: string;
  canFileSelf?: boolean;
  requiresCA?: boolean;
}

interface AddComplianceDialogProps {
  children: React.ReactNode;
  availableCompliances: Record<string, AvailableCompliance[]>;
  onAdd: (compliance: AvailableCompliance & { category: string }, dueDate: string) => void;
  complianceType: 'company' | 'licenses' | 'taxes';
}

const AddComplianceDialog: React.FC<AddComplianceDialogProps> = ({
  children,
  availableCompliances,
  onAdd,
  complianceType
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompliance, setSelectedCompliance] = useState<(AvailableCompliance & { category: string }) | null>(null);
  const [dueDate, setDueDate] = useState<Date>();

  const handleAdd = () => {
    if (selectedCompliance && dueDate) {
      onAdd(selectedCompliance, format(dueDate, 'yyyy-MM-dd'));
      setOpen(false);
      setSelectedCompliance(null);
      setDueDate(undefined);
      setSearchQuery('');
    }
  };

  const filteredCompliances = Object.entries(availableCompliances).reduce((acc, [category, compliances]) => {
    const filtered = compliances.filter(compliance =>
      compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      compliance.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, AvailableCompliance[]>);

  const getDialogTitle = () => {
    switch(complianceType) {
      case 'company': return 'Add Company Compliance';
      case 'licenses': return 'Add License';
      case 'taxes': return 'Add Tax Obligation';
      default: return 'Add Compliance';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!selectedCompliance ? (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search ${complianceType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="space-y-6">
                {Object.entries(filteredCompliances).map(([category, compliances]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3">{category}</h3>
                    <div className="grid gap-3">
                      {compliances.map((compliance) => (
                        <Card 
                          key={compliance.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedCompliance({ ...compliance, category })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium">{compliance.title}</h4>
                                  {compliance.requiresCA && (
                                    <Badge variant="destructive" className="text-xs flex items-center gap-1">
                                      <AlertTriangle className="h-3 w-3" />
                                      Requires CA
                                    </Badge>
                                  )}
                                  {compliance.canFileSelf && (
                                    <Badge variant="default" className="text-xs flex items-center gap-1">
                                      <Shield className="h-3 w-3" />
                                      Self Filing
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {compliance.description}
                                </p>
                              </div>
                              <Badge variant="outline">{category}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
                
                {Object.keys(filteredCompliances).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No {complianceType} found matching your search.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCompliance(null)}
                >
                  ← Back to list
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{selectedCompliance.title}</h3>
                        {selectedCompliance.requiresCA && (
                          <Badge variant="destructive" className="text-xs flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Requires CA
                          </Badge>
                        )}
                        {selectedCompliance.canFileSelf && (
                          <Badge variant="default" className="text-xs flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Self Filing
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{selectedCompliance.description}</p>
                    </div>
                    <Badge variant="outline">{selectedCompliance.category}</Badge>
                  </div>
                  
                  {selectedCompliance.requiresCA && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">CA Assistance Required</p>
                          <p className="text-xs text-yellow-700">
                            This compliance requires professional assistance from a Chartered Accountant. 
                            Direct self-filing is not permitted.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select due date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleAdd}
                  disabled={!dueDate}
                  className="flex-1"
                >
                  Add {complianceType === 'company' ? 'Compliance' : complianceType === 'licenses' ? 'License' : 'Tax Obligation'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddComplianceDialog;

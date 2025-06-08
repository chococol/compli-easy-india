import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Calendar, Upload, Clock, CheckCircle2, Building2, FileText, Receipt, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import AddComplianceDialog from '@/components/compliances/AddComplianceDialog';
import FileComplianceDialog from '@/components/compliances/FileComplianceDialog';

type ComplianceStatus = 'pending' | 'filed' | 'under-review' | 'completed';

interface Compliance {
  id: string;
  title: string;
  category: string;
  description: string;
  dueDate: string;
  status: ComplianceStatus;
  filedDate?: string;
  documents?: string[];
  canFileSelf: boolean;
  requiresCA: boolean;
}

// Company Annual Compliances (LLP)
const companyAnnualCompliances = {
  'Annual Returns': [
    { id: 'form-8', title: 'Form 8 - Statement of Account and Solvency', description: 'Annual filing of statement of account and solvency for LLP', canFileSelf: true, requiresCA: false },
    { id: 'form-11', title: 'Form 11 - Annual Return of LLP', description: 'Annual return to be filed with ROC containing details of LLP', canFileSelf: true, requiresCA: false },
  ],
  'Incorporation & Changes': [
    { id: 'form-2', title: 'Form 2 - Incorporation Document', description: 'For incorporation of LLP', canFileSelf: false, requiresCA: true },
    { id: 'form-3', title: 'Form 3 - Change in Designated Partners', description: 'For appointment/cessation of designated partners', canFileSelf: true, requiresCA: false },
    { id: 'form-4', title: 'Form 4 - Change in Partners', description: 'For admission/retirement of partners', canFileSelf: true, requiresCA: false },
    { id: 'form-5', title: 'Form 5 - Change in Name', description: 'For change in name of LLP', canFileSelf: false, requiresCA: true },
    { id: 'form-15', title: 'Form 15 - Notice of Closure', description: 'Notice for closure of place of business', canFileSelf: true, requiresCA: false },
  ],
  'Address & Registered Office': [
    { id: 'form-16', title: 'Form 16 - Notice of Situation of Registered Office', description: 'Notice of situation/change of registered office', canFileSelf: true, requiresCA: false },
  ],
  'Compliance & Regulatory': [
    { id: 'form-12', title: 'Form 12 - Application for Reservation of Name', description: 'Application for reservation of name for LLP', canFileSelf: true, requiresCA: false },
    { id: 'form-17', title: 'Form 17 - Application for directions or clarifications', description: 'Application to Central Government for directions', canFileSelf: false, requiresCA: true },
    { id: 'form-18', title: 'Form 18 - Application for Compounding', description: 'Application for compounding of offences', canFileSelf: false, requiresCA: true },
    { id: 'form-23', title: 'Form 23 - Application for conversion from firm to LLP', description: 'Application for conversion of firm/company to LLP', canFileSelf: false, requiresCA: true },
    { id: 'form-24', title: 'Form 24 - Application for conversion from company to LLP', description: 'Application for conversion of company to LLP', canFileSelf: false, requiresCA: true },
  ]
};

// Comprehensive License Types in India
const licenseTypes = {
  'Business & Trade Licenses': [
    { id: 'shops-est', title: 'Shops and Establishment License', description: 'Mandatory for all commercial establishments' },
    { id: 'trade-license', title: 'Municipal Trade License', description: 'Required from local municipal corporation' },
    { id: 'msme-udyog', title: 'MSME/Udyog Aadhaar Registration', description: 'For micro, small and medium enterprises' },
    { id: 'startup-india', title: 'Startup India Certificate', description: 'Recognition and benefits for startups' },
    { id: 'import-export', title: 'Import Export Code (IEC)', description: 'Mandatory for import/export business' },
  ],
  'Professional & Service Licenses': [
    { id: 'ca-practice', title: 'Certificate of Practice (CA)', description: 'For Chartered Accountants to practice' },
    { id: 'cs-practice', title: 'Certificate of Practice (CS)', description: 'For Company Secretaries to practice' },
    { id: 'advocate-practice', title: 'Advocate License', description: 'For legal practitioners' },
    { id: 'medical-practice', title: 'Medical Practice License', description: 'For medical practitioners and clinics' },
    { id: 'dental-practice', title: 'Dental Practice License', description: 'For dental practitioners' },
    { id: 'nursing-home', title: 'Nursing Home License', description: 'For healthcare facilities' },
    { id: 'pathology-lab', title: 'Pathology Lab License', description: 'For diagnostic laboratories' },
    { id: 'pharmacy-license', title: 'Drug License for Pharmacy', description: 'For pharmaceutical retail/wholesale' },
  ],
  'Food & Beverage Licenses': [
    { id: 'fssai-basic', title: 'FSSAI Basic Registration', description: 'For small food businesses (turnover < 12 lakhs)' },
    { id: 'fssai-state', title: 'FSSAI State License', description: 'For medium food businesses (turnover 12 lakhs - 20 crores)' },
    { id: 'fssai-central', title: 'FSSAI Central License', description: 'For large food businesses (turnover > 20 crores)' },
    { id: 'liquor-license', title: 'Liquor License', description: 'For sale and consumption of alcoholic beverages' },
    { id: 'eating-house', title: 'Eating House License', description: 'For restaurants and eating establishments' },
  ],
  'Manufacturing & Industrial': [
    { id: 'factory-license', title: 'Factory License', description: 'Under Factories Act for manufacturing units' },
    { id: 'boiler-license', title: 'Boiler License', description: 'For operation of steam boilers' },
    { id: 'explosive-license', title: 'Explosive License', description: 'For handling explosive materials' },
    { id: 'drug-manufacturing', title: 'Drug Manufacturing License', description: 'For pharmaceutical manufacturing' },
    { id: 'pollution-clearance', title: 'Pollution Control Clearance', description: 'Environmental clearance for industries' },
  ],
  'Transport & Logistics': [
    { id: 'transport-license', title: 'Transport License', description: 'For goods and passenger transport' },
    { id: 'driving-license', title: 'Commercial Driving License', description: 'For commercial vehicle drivers' },
    { id: 'fitness-certificate', title: 'Vehicle Fitness Certificate', description: 'For commercial vehicles' },
    { id: 'permits-goods', title: 'Goods Carriage Permit', description: 'For goods transportation vehicles' },
    { id: 'permits-passenger', title: 'Passenger Vehicle Permit', description: 'For passenger transportation' },
  ],
  'Construction & Real Estate': [
    { id: 'building-plan', title: 'Building Plan Approval', description: 'From local development authority' },
    { id: 'completion-certificate', title: 'Completion Certificate', description: 'After construction completion' },
    { id: 'occupancy-certificate', title: 'Occupancy Certificate', description: 'For occupation of building' },
    { id: 'rera-registration', title: 'RERA Registration', description: 'For real estate projects and agents' },
    { id: 'lift-license', title: 'Lift License', description: 'For installation and operation of lifts' },
  ],
  'Digital & Technology': [
    { id: 'digital-signature', title: 'Digital Signature Certificate', description: 'For electronic authentication' },
    { id: 'bis-license', title: 'BIS License', description: 'For electronic and IT products' },
    { id: 'telecommunications', title: 'Telecommunications License', description: 'For telecom service providers' },
    { id: 'broadcasting', title: 'Broadcasting License', description: 'For TV/Radio broadcasting' },
  ],
  'Financial Services': [
    { id: 'nbfc-license', title: 'NBFC License', description: 'For Non-Banking Financial Companies' },
    { id: 'money-changer', title: 'Money Changer License', description: 'For foreign exchange services' },
    { id: 'chit-fund', title: 'Chit Fund License', description: 'For chit fund operations' },
    { id: 'insurance-broker', title: 'Insurance Broker License', description: 'For insurance brokerage' },
  ]
};

// Comprehensive Tax Types in India
const taxTypes = {
  'Goods & Services Tax (GST)': [
    { id: 'gstr-1', title: 'GSTR-1 - Outward Supplies', description: 'Monthly/Quarterly return for outward supplies' },
    { id: 'gstr-3b', title: 'GSTR-3B - Summary Return', description: 'Monthly summary return with tax payment' },
    { id: 'gstr-2a', title: 'GSTR-2A - Auto-populated ITC', description: 'Auto-populated Input Tax Credit statement' },
    { id: 'gstr-2b', title: 'GSTR-2B - Auto-generated ITC', description: 'Auto-generated Input Tax Credit statement' },
    { id: 'gstr-4', title: 'GSTR-4 - Composition Scheme', description: 'Quarterly return for composition taxpayers' },
    { id: 'gstr-5', title: 'GSTR-5 - Non-Resident', description: 'Monthly return for non-resident taxpayers' },
    { id: 'gstr-6', title: 'GSTR-6 - Input Service Distributor', description: 'Monthly return for Input Service Distributors' },
    { id: 'gstr-7', title: 'GSTR-7 - TDS Deductors', description: 'Monthly return for TDS deductors under GST' },
    { id: 'gstr-8', title: 'GSTR-8 - E-commerce Operators', description: 'Monthly return for e-commerce operators' },
    { id: 'gstr-9', title: 'GSTR-9 - Annual Return', description: 'Annual return for regular taxpayers' },
    { id: 'gstr-9c', title: 'GSTR-9C - Reconciliation Statement', description: 'Annual reconciliation statement (audited)' },
  ],
  'Income Tax': [
    { id: 'itr-1', title: 'ITR-1 (Sahaj) - Individual', description: 'For individuals with salary/pension/interest income' },
    { id: 'itr-2', title: 'ITR-2 - Individual/HUF', description: 'For individuals/HUF with capital gains/foreign income' },
    { id: 'itr-3', title: 'ITR-3 - Individual/HUF Business', description: 'For individuals/HUF having business income' },
    { id: 'itr-4', title: 'ITR-4 (Sugam) - Presumptive', description: 'For presumptive income from business/profession' },
    { id: 'itr-5', title: 'ITR-5 - LLP/AOP/BOI', description: 'For LLP, AOP, BOI, artificial juridical persons' },
    { id: 'itr-6', title: 'ITR-6 - Company', description: 'For companies other than claiming exemption u/s 11' },
    { id: 'itr-7', title: 'ITR-7 - Trust/Political Party', description: 'For trusts, political parties, institutions' },
  ],
  'Tax Deducted at Source (TDS)': [
    { id: 'tds-quarterly', title: 'Quarterly TDS Return', description: 'Quarterly return for TDS deducted' },
    { id: 'tds-24q', title: 'Form 24Q - Salary TDS', description: 'Quarterly TDS return for salary payments' },
    { id: 'tds-26q', title: 'Form 26Q - Non-Salary TDS', description: 'Quarterly TDS return for non-salary payments' },
    { id: 'tds-27q', title: 'Form 27Q - TDS on Immovable Property', description: 'Quarterly TDS return for property transactions' },
    { id: 'tds-27eq', title: 'Form 27EQ - TCS Return', description: 'Quarterly return for Tax Collected at Source' },
  ],
  'Tax Collected at Source (TCS)': [
    { id: 'tcs-quarterly', title: 'Quarterly TCS Return', description: 'Quarterly return for TCS collected' },
    { id: 'tcs-27eq', title: 'Form 27EQ - TCS Return', description: 'Quarterly TCS return for specified transactions' },
    { id: 'tcs-scrap', title: 'TCS on Scrap Sale', description: 'TCS collection on sale of scrap' },
    { id: 'tcs-foreign-remittance', title: 'TCS on Foreign Remittance', description: 'TCS on overseas tour packages/education' },
  ],
  'Employee Related Taxes': [
    { id: 'pf-return', title: 'PF Monthly Return', description: 'Monthly Provident Fund return' },
    { id: 'esi-return', title: 'ESI Monthly Return', description: 'Monthly Employee State Insurance return' },
    { id: 'pt-return', title: 'Professional Tax Return', description: 'State-wise professional tax return' },
    { id: 'lwf-return', title: 'Labour Welfare Fund', description: 'State labour welfare fund contribution' },
  ],
  'State & Local Taxes': [
    { id: 'vat-return', title: 'VAT Return (where applicable)', description: 'Value Added Tax return for applicable states' },
    { id: 'property-tax', title: 'Property Tax', description: 'Municipal property tax' },
    { id: 'water-tax', title: 'Water Tax', description: 'Municipal water tax/charges' },
    { id: 'electricity-duty', title: 'Electricity Duty', description: 'State electricity duty' },
  ],
  'Specialized Taxes': [
    { id: 'advance-tax', title: 'Advance Tax Payment', description: 'Quarterly advance tax payments' },
    { id: 'self-assessment', title: 'Self Assessment Tax', description: 'Additional tax payment with return filing' },
    { id: 'wealth-tax', title: 'Wealth Tax (if applicable)', description: 'Wealth tax for high net worth individuals' },
    { id: 'gift-tax', title: 'Gift Tax Implications', description: 'Tax implications on gifts received' },
  ]
};

const CompliancesPage = () => {
  const [myCompliances, setMyCompliances] = useState<Compliance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('company');

  const addCompliance = (complianceData: any, dueDate: string) => {
    const newCompliance: Compliance = {
      id: Date.now().toString(),
      title: complianceData.title,
      category: complianceData.category || 'General',
      description: complianceData.description,
      dueDate,
      status: 'pending',
      canFileSelf: complianceData.canFileSelf || true,
      requiresCA: complianceData.requiresCA || false
    };
    
    setMyCompliances(prev => [...prev, newCompliance]);
    toast({
      title: "Compliance Added",
      description: `${complianceData.title} has been added to your compliances.`,
    });
  };

  const fileCompliance = (complianceId: string, documents: string[]) => {
    setMyCompliances(prev => 
      prev.map(compliance => 
        compliance.id === complianceId 
          ? { 
              ...compliance, 
              status: 'filed' as ComplianceStatus, 
              filedDate: new Date().toISOString().split('T')[0],
              documents 
            }
          : compliance
      )
    );
    
    toast({
      title: "Compliance Filed",
      description: "Your compliance has been successfully filed.",
    });
  };

  const getStatusIcon = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'filed': return <Upload className="h-4 w-4 text-blue-600" />;
      case 'under-review': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    }
  };

  const getStatusColor = (status: ComplianceStatus) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under-review': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
    }
  };

  const getCurrentCompliances = () => {
    switch(activeTab) {
      case 'company': return companyAnnualCompliances;
      case 'licenses': return licenseTypes;
      case 'taxes': return taxTypes;
      default: return {};
    }
  };

  const filteredCompliances = myCompliances
    .filter(compliance => {
      const matchesSearch = compliance.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           compliance.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by current tab
      const matchesTab = 
        (activeTab === 'company' && compliance.category.includes('Annual')) ||
        (activeTab === 'licenses' && compliance.category.includes('License')) ||
        (activeTab === 'taxes' && compliance.category.includes('Tax'));
      
      return matchesSearch && (searchQuery || matchesTab);
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <MainLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your company compliances, licenses, and tax obligations
            </p>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company Annual Compliances
            </TabsTrigger>
            <TabsTrigger value="licenses" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Licenses
            </TabsTrigger>
            <TabsTrigger value="taxes" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Taxes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search company compliances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Badge variant="outline">LLP Structure</Badge>
              </div>
              <AddComplianceDialog 
                availableCompliances={companyAnnualCompliances}
                onAdd={addCompliance}
                complianceType="company"
              >
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company Compliance
                </Button>
              </AddComplianceDialog>
            </div>
            
            {/* Display compliance cards */}
            <div className="grid gap-4">
              {filteredCompliances.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">No company compliances found</p>
                    <p className="text-muted-foreground text-sm">
                      Add your company compliances to track deadlines and requirements
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredCompliances.map((compliance) => (
                  <Card key={compliance.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(compliance.status)}
                            <h3 className="font-semibold text-lg">{compliance.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {compliance.category}
                            </Badge>
                            {compliance.requiresCA && (
                              <Badge variant="destructive" className="text-xs">
                                Requires CA
                              </Badge>
                            )}
                            {compliance.canFileSelf && (
                              <Badge variant="default" className="text-xs">
                                Self Filing
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            {compliance.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(compliance.dueDate).toLocaleDateString()}
                            </span>
                            {compliance.filedDate && (
                              <span className="text-muted-foreground">
                                Filed: {new Date(compliance.filedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(compliance.status)}>
                            {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1)}
                          </Badge>
                          
                          {compliance.status === 'pending' && (
                            <FileComplianceDialog 
                              compliance={compliance}
                              onFile={(documents) => fileCompliance(compliance.id, documents)}
                            >
                              <Button size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                File
                              </Button>
                            </FileComplianceDialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <div className="flex items-center justify-between">
              <Input
                placeholder="Search licenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              <AddComplianceDialog 
                availableCompliances={licenseTypes}
                onAdd={addCompliance}
                complianceType="licenses"
              >
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add License
                </Button>
              </AddComplianceDialog>
            </div>
            
            {/* Same compliance cards structure for licenses */}
            <div className="grid gap-4">
              {filteredCompliances.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">No licenses found</p>
                    <p className="text-muted-foreground text-sm">
                      Add licenses to track renewal dates and requirements
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredCompliances.map((compliance) => (
                  <Card key={compliance.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(compliance.status)}
                            <h3 className="font-semibold text-lg">{compliance.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {compliance.category}
                            </Badge>
                            {compliance.requiresCA && (
                              <Badge variant="destructive" className="text-xs">
                                Requires CA
                              </Badge>
                            )}
                            {compliance.canFileSelf && (
                              <Badge variant="default" className="text-xs">
                                Self Filing
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            {compliance.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(compliance.dueDate).toLocaleDateString()}
                            </span>
                            {compliance.filedDate && (
                              <span className="text-muted-foreground">
                                Filed: {new Date(compliance.filedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(compliance.status)}>
                            {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1)}
                          </Badge>
                          
                          {compliance.status === 'pending' && (
                            <FileComplianceDialog 
                              compliance={compliance}
                              onFile={(documents) => fileCompliance(compliance.id, documents)}
                            >
                              <Button size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                File
                              </Button>
                            </FileComplianceDialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="taxes" className="space-y-6">
            <div className="flex items-center justify-between">
              <Input
                placeholder="Search tax obligations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              <AddComplianceDialog 
                availableCompliances={taxTypes}
                onAdd={addCompliance}
                complianceType="taxes"
              >
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tax Obligation
                </Button>
              </AddComplianceDialog>
            </div>
            
            {/* Same compliance cards structure for taxes */}
            <div className="grid gap-4">
              {filteredCompliances.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">No tax obligations found</p>
                    <p className="text-muted-foreground text-sm">
                      Add tax obligations to track filing deadlines
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredCompliances.map((compliance) => (
                  <Card key={compliance.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(compliance.status)}
                            <h3 className="font-semibold text-lg">{compliance.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {compliance.category}
                            </Badge>
                            {compliance.requiresCA && (
                              <Badge variant="destructive" className="text-xs">
                                Requires CA
                              </Badge>
                            )}
                            {compliance.canFileSelf && (
                              <Badge variant="default" className="text-xs">
                                Self Filing
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">
                            {compliance.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(compliance.dueDate).toLocaleDateString()}
                            </span>
                            {compliance.filedDate && (
                              <span className="text-muted-foreground">
                                Filed: {new Date(compliance.filedDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(compliance.status)}>
                            {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1)}
                          </Badge>
                          
                          {compliance.status === 'pending' && (
                            <FileComplianceDialog 
                              compliance={compliance}
                              onFile={(documents) => fileCompliance(compliance.id, documents)}
                            >
                              <Button size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                File
                              </Button>
                            </FileComplianceDialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompliancesPage;

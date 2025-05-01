import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, FileCheck, Shield, Building, Layers, CheckCircle, Landmark, TrendingUp, GanttChart, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (user) {
      if (userProfile?.role === 'professional') {
        navigate('/professional/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, userProfile, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate('/mission')}>Our Mission</Button>
            <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
            <Button variant="ghost" onClick={() => navigate('/contact')}>Contact</Button>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button onClick={() => navigate('/auth')}>Get Started</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Revolutionizing Ease of Doing Business in India
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Your all-in-one platform that simplifies company registration, streamlines compliance, and breaks down regulatory barriers for Indian entrepreneurs.
          </p>
          
          <Tabs defaultValue="business" className="max-w-3xl mx-auto mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="business">For Businesses</TabsTrigger>
              <TabsTrigger value="professional">For CA/CS Professionals</TabsTrigger>
            </TabsList>
            <TabsContent value="business" className="mt-6 text-center">
              <p className="text-lg mb-6">A complete solution for entrepreneurs and businesses to manage compliance requirements</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
                  Start Your Business Journey <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/mission')}>
                  Learn About Our Mission
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="professional" className="mt-6 text-center">
              <p className="text-lg mb-6">Powerful tools for CA and CS professionals to manage multiple client businesses</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate('/auth?role=professional')} className="gap-2">
                  Join as Professional <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/mission')}>
                  Learn About Our Mission
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Transforming Business in India</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CompliEasy is dedicated to improving India's business environment through innovative solutions that address key challenges faced by entrepreneurs and professionals.
            </p>
          </div>
          
          <Tabs defaultValue="business" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="business">Businesses</TabsTrigger>
              <TabsTrigger value="professional">CA/CS Professionals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="business">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rapid Business Registration</h3>
                  <p className="text-muted-foreground">
                    Register your company in days, not months. We streamline the process across all Indian regulatory bodies.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <GanttChart className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Simplified Compliance</h3>
                  <p className="text-muted-foreground">
                    Navigate India's complex regulatory landscape with ease through our automated compliance tools and expert guidance.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Government Interface</h3>
                  <p className="text-muted-foreground">
                    Interact seamlessly with various Indian government departments through our simplified dashboard.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="professional">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Client Management</h3>
                  <p className="text-muted-foreground">
                    Manage all your clients from a single dashboard with detailed status tracking and reporting.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Deadline Tracking</h3>
                  <p className="text-muted-foreground">
                    Never miss important filing deadlines with automated reminders and scheduling tools.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Document Management</h3>
                  <p className="text-muted-foreground">
                    Securely store, share, and manage all client documents in one centralized system.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Business Impact Stats */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Making an Impact on Indian Business</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is helping transform India's business environment through measurable improvements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <p className="text-muted-foreground">Reduction in registration time compared to traditional methods</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Compliance requirements automated across different business types</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-muted-foreground">Indian businesses already using our platform</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">₹10Cr+</div>
              <p className="text-muted-foreground">Saved in potential compliance penalties for our clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How CompliEasy Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes business registration and compliance management simple.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up and create your business profile in minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Entity Type</h3>
              <p className="text-muted-foreground">
                Select your business structure with our guided selection tool.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Documents</h3>
              <p className="text-muted-foreground">
                Upload the required documents through our secure platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Compliant</h3>
              <p className="text-muted-foreground">
                Manage ongoing compliance with our tools and reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - updated for dual audience */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Compliance Management?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of entrepreneurs and professionals who are navigating India's business landscape with ease using CompliEasy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
              Sign Up as Business <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth?role=professional')} className="gap-2">
              Sign Up as Professional <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-muted-foreground text-sm">
                Transforming the ease of doing business in India through simplified registration and compliance management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/auth')}>Onboarding</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/dashboard')}>Compliance</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/documents')}>Document Management</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/pricing')}>Pricing</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/mission')}>Our Mission</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/about')}>About Us</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/contact')}>Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CompliEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

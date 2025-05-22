import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Users, TrendingUp, CheckCircle, Calendar, FileCheck, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/layout/ThemeToggle';

const Partner = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => navigate('/mission')}>Our Mission</Button>
            <Button variant="ghost" onClick={() => navigate('/partner')}>Partner with Us</Button>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button onClick={() => navigate('/auth')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Partner With CompliEasy
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            A revolutionary platform for CA/CS professionals to expand their practice and provide enhanced services to clients.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/auth?role=professional')} className="gap-2">
              Join as Professional <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Benefits of Partnering With Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our revolutionary platform as a CA or CS professional and transform how you serve your clients through our technology-powered solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Expand Your Client Base</CardTitle>
                <CardDescription>
                  Connect with businesses seeking professional compliance services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Access to a growing network of businesses needing compliance support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Built-in lead generation from our business users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Enhanced visibility through our professional directory</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Handshake className="h-6 w-6" />
                </div>
                <CardTitle>Streamlined Operations</CardTitle>
                <CardDescription>
                  Automate routine tasks and focus on high-value services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Cloud-based secure document management system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Automated compliance deadline reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Digital workflow management for client engagements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Grow Your Practice</CardTitle>
                <CardDescription>
                  Scale your services effectively with our technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Manage multiple clients through a single dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Track billable time and automate invoicing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <span>Detailed analytics to identify growth opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How the Partnership Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our revolutionary platform is designed to integrate seamlessly with your practice and enhance your service delivery.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your professional account and complete your profile with your expertise and services.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Onboarding</h3>
              <p className="text-muted-foreground">
                Complete a brief onboarding process to get familiar with our platform features.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Management</h3>
              <p className="text-muted-foreground">
                Add your existing clients or connect with new ones through our platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Service Delivery</h3>
              <p className="text-muted-foreground">
                Use our tools to provide enhanced services and grow your practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Professionals Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from CA/CS professionals who are already partnering with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-4">
                  "CompliEasy has revolutionized how I manage my clients' compliance needs. The automated reminders and document management system have saved me countless hours of administrative work."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-medium text-lg">
                    RS
                  </div>
                  <div>
                    <p className="font-medium">Rajiv Sharma</p>
                    <p className="text-sm text-muted-foreground">Chartered Accountant, Delhi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-4">
                  "Since partnering with CompliEasy, I've been able to expand my client base by 40%. The platform's lead generation and professional directory have been invaluable for my practice growth."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-medium text-lg">
                    AP
                  </div>
                  <div>
                    <p className="font-medium">Ananya Patel</p>
                    <p className="text-sm text-muted-foreground">Company Secretary, Mumbai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join our growing network of professionals and take advantage of our revolutionary platform to expand your practice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/auth?role=professional')} className="gap-2">
              Sign Up as Professional <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Schedule a Demo
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
                Revolutionizing the ease of doing business in India through simplified registration and compliance management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/auth')}>Onboarding</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/dashboard')}>Compliance</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/documents')}>Document Management</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/mission')}>Our Mission</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/about')}>About Us</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/contact')}>Contact</Button></li>
                <li><Button variant="link" className="h-auto p-0" onClick={() => navigate('/partner')}>Partner with Us</Button></li>
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

export default Partner;

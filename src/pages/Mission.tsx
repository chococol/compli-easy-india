
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Building, Shield, Landmark, GanttChart, Award } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Mission = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full py-6 px-4 md:py-8 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Our Mission</h1>
        
        <div className="mb-6 md:mb-10 space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">Simplifying Business in India</h2>
          <p className="text-base md:text-lg text-muted-foreground">
            At CompliEasy, our mission is to transform the business landscape in India by breaking down regulatory barriers 
            and simplifying compliance procedures for entrepreneurs and businesses of all sizes.
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            We believe that entrepreneurial energy should be focused on innovation and growth, not paperwork 
            and regulatory navigation. That's why we've built a platform that makes company registration and 
            compliance management simpler, faster, and more accessible.
          </p>
        </div>

        <Card className="mb-6 md:mb-10">
          <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">How We're Improving Ease of Doing Business</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <Building className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Simplified Registration</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Reducing the time to register a business from weeks to days through streamlined processes and expert guidance.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <GanttChart className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Compliance Automation</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Automating regulatory compliance tracking and reminders to prevent missed deadlines and penalties.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <Landmark className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Government Interface</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Creating a simplified interface for interacting with government departments and regulatory bodies.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Growth Enablement</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Allowing businesses to focus on growth by handling their administrative burdens and regulatory requirements.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6 md:mb-10">
          <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Our Goals</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-3 md:mb-4">
                  <Award className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Empower 100,000+ Businesses</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Help over 100,000 entrepreneurs successfully establish and maintain their businesses in India by 2026.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-3 md:mb-4">
                  <Shield className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">100% Compliance Success</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Achieve 100% on-time compliance rate for all businesses using our platform.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center sm:col-span-2 md:col-span-1">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-3 md:mb-4">
                  <Lightbulb className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Policy Advocacy</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Advocate for regulatory reforms to further simplify doing business in India.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-auto border-t py-4 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-center text-xs md:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CompliEasy. All rights reserved.
          </p>
          <nav className="flex gap-4 text-xs md:text-sm text-muted-foreground">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Mission;

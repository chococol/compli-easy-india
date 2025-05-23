
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Globe, Award } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">About CompliEasy</h1>
        
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At CompliEasy, we're on a mission to simplify the complex world of regulatory compliance for businesses in India. 
              We believe that entrepreneurs should focus on growing their businesses, not navigating complex bureaucratic requirements.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Simplifying Compliance</h3>
                <p className="text-muted-foreground">
                  We're committed to making regulatory compliance accessible, affordable, and understandable for businesses of all sizes.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Globe className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Supporting Business Growth</h3>
                <p className="text-muted-foreground">
                  By handling the complexities of compliance, we help businesses focus on what they do best - innovation and growth.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              CompliEasy was founded in 2023 by a team of entrepreneurs who had experienced firsthand the challenges of navigating India's complex regulatory landscape.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              After spending countless hours dealing with paperwork, missed deadlines, and confusing requirements, our founders decided there had to be a better way. They assembled a team of legal experts, compliance specialists, and software developers to create a platform that would make compliance management simple and stress-free.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, CompliEasy serves thousands of businesses across India, from startups to established enterprises, helping them stay compliant and focus on growth.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're a diverse team of experts in legal compliance, technology, and customer service, all dedicated to making your compliance journey smooth and hassle-free.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="flex flex-col items-center text-center">
                <Users className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Leadership</h3>
                <p className="text-muted-foreground">
                  Our leadership team brings decades of experience in regulatory compliance, legal services, and technology innovation.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <Award className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Our customer success team is always ready to assist you with any compliance challenges you might face.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-auto border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CompliEasy. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default About;

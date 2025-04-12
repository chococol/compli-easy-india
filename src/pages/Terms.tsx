import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Last updated: April 12, 2025
            </p>
            
            <div className="prose prose-sm max-w-none">
              <p>
                Please read these Terms of Service ("Terms") carefully before using the CompliEasy website and services operated by CompliEasy ("us", "we", or "our").
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Service</h2>
              <p>
                CompliEasy provides an online platform for business registration and compliance management services in India. Our services include but are not limited to company registration, compliance tracking, document management, and regulatory filing assistance.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">4. Fees and Payment</h2>
              <p>
                Some of our services require payment. By subscribing to a paid service, you agree to pay the fees associated with the selected subscription plan. All fees are non-refundable unless otherwise specified.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">5. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of CompliEasy and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation of Liability</h2>
              <p>
                In no event shall CompliEasy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at legal@complieasy.com.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;

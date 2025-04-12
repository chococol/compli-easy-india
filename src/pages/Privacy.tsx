import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Last updated: April 12, 2025
            </p>
            
            <div className="prose prose-sm max-w-none">
              <p>
                At CompliEasy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you register for our services, express interest in obtaining information about us or our products, or otherwise contact us. The personal information we collect may include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name, email address, phone number, and other contact details</li>
                <li>Business information such as company name, entity type, and registration details</li>
                <li>Financial information for billing purposes</li>
                <li>Information shared in communications with us</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Sending administrative information, updates, and promotional communications</li>
                <li>Protecting our services and users</li>
                <li>Complying with legal obligations</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">3. Disclosure of Your Information</h2>
              <p>
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With service providers who perform services on our behalf</li>
                <li>With regulatory authorities when required by law</li>
                <li>In connection with a business transaction such as a merger or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">4. Security of Your Information</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no security system is impenetrable, and we cannot guarantee the absolute security of your data.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided below.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at privacy@complieasy.com.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;

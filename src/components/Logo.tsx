
import React from 'react';
import { FileCheck } from 'lucide-react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 font-bold text-lg ${className}`}>
      <FileCheck className="h-6 w-6 text-brand-teal" />
      <span>CompliEasy</span>
    </div>
  );
};

export default Logo;

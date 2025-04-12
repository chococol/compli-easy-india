
import React from 'react';
import { FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-lg ${className}`}>
      <FileCheck className="h-6 w-6 text-brand-teal" />
      <span>CompliEasy</span>
    </Link>
  );
};

export default Logo;

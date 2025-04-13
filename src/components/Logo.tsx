
import React from 'react';
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-lg ${className}`}>
      <Building className="h-6 w-6 text-primary" />
      <span>CompliEasy</span>
    </Link>
  );
};

export default Logo;

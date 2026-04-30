'use client';

import { Calendar, User, Shield, Info } from 'lucide-react';
import { getClaimAsDate } from '@/lib/jwt-tools';

interface ClaimBadgeProps {
  claim: string;
  value: any;
}

export default function ClaimBadge({ claim, value }: ClaimBadgeProps) {
  const isDate = ['exp', 'iat', 'nbf'].includes(claim);
  
  const getIcon = () => {
    if (claim === 'sub') return <User className="w-3 h-3" />;
    if (isDate) return <Calendar className="w-3 h-3" />;
    if (claim === 'iss') return <Shield className="w-3 h-3" />;
    return <Info className="w-3 h-3" />;
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/30 border border-border rounded-lg">
      <div className="text-primary">{getIcon()}</div>
      <div className="flex flex-col">
        <span className="text-[8px] font-bold uppercase text-muted-foreground">{claim}</span>
        <span className="text-[10px] font-medium truncate max-w-[120px]">
          {isDate ? getClaimAsDate(value) : value.toString()}
        </span>
      </div>
    </div>
  );
}

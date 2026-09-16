import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyShieldBadge = ({ text = "Zero-PII Aggregated Analytics & k-Anonymity Guard", size = "sm" }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50/90 border border-brand-200 text-brand-800 rounded-full font-medium ${size === 'xs' ? 'text-[11px]' : 'text-xs'}`}>
      <ShieldCheck className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
      <span className="truncate">{text}</span>
      <Lock className="w-3 h-3 text-brand-500 opacity-60 flex-shrink-0" />
    </div>
  );
};

export default PrivacyShieldBadge;

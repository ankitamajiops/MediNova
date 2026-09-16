import React from 'react';

export const RiskBadge = ({ level = 'LOW', showPulse = true, size = 'md', className = '' }) => {
  const normalizedLevel = String(level).toUpperCase();

  const configs = {
    HIGH: {
      bg: 'bg-rose-50 border-rose-200 text-rose-700',
      dot: 'bg-rose-500',
      pulseClass: 'beacon-high-risk',
      label: 'High Risk',
      icon: '🔴',
      desc: 'Strong cluster pattern requiring official verification'
    },
    MODERATE: {
      bg: 'bg-amber-50 border-amber-200 text-amber-700',
      dot: 'bg-amber-500',
      pulseClass: 'animate-pulse',
      label: 'Moderate Risk',
      icon: '🟡',
      desc: 'Higher-than-usual reports detected'
    },
    LOW: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      dot: 'bg-emerald-500',
      pulseClass: '',
      label: 'Low Risk / Normal',
      icon: '🟢',
      desc: 'Normal baseline activity'
    }
  };

  const current = configs[normalizedLevel] || configs.LOW;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 space-x-1.5',
    md: 'text-xs md:text-sm px-2.5 py-1 space-x-2',
    lg: 'text-sm md:text-base px-3.5 py-1.5 space-x-2.5 font-semibold'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full border font-medium ${current.bg} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title={current.desc}
    >
      <span className="relative flex h-2 w-2">
        {showPulse && normalizedLevel !== 'LOW' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dot}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`}></span>
      </span>
      <span>{current.label}</span>
    </span>
  );
};

export default RiskBadge;

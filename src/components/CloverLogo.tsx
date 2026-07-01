import React from 'react';

export default function CloverLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-[2px] rotate-45 ${className}`}>
      <div className="bg-brand-green rounded-tl-full rounded-tr-sm rounded-bl-sm rounded-br-md"></div>
      <div className="bg-brand-green rounded-tr-full rounded-tl-sm rounded-br-sm rounded-bl-md"></div>
      <div className="bg-brand-green rounded-bl-full rounded-tl-sm rounded-br-sm rounded-tr-md"></div>
      <div className="bg-brand-green rounded-br-full rounded-bl-sm rounded-tr-sm rounded-tl-md"></div>
    </div>
  );
}

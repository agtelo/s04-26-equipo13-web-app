import React from 'react';

export const Logo: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    {/* Funnel style arrows >< separated */}
    <path d="M4 4l6 8-6 8" />
    <path d="M20 4l-6 8 6 8" />
  </svg>
);

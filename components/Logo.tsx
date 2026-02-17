
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-16 w-auto" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto overflow-visible">
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0076bd" />
            <stop offset="100%" stopColor="#009a4e" />
          </linearGradient>
          <linearGradient id="sail1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0076bd" />
            <stop offset="100%" stopColor="#009a4e" />
          </linearGradient>
        </defs>
        
        {/* Sailboat Icon Group */}
        <g transform="translate(150, 20)">
          {/* Left Sail */}
          <path d="M40 0 L0 70 L40 70 Z" fill="url(#sail1Gradient)" />
          {/* Right Sail */}
          <path d="M50 10 L80 70 L50 70 Z" fill="url(#sail1Gradient)" />
          
          {/* Sea Waves */}
          <path d="M-20 80 Q10 65 40 80 Q70 95 100 80" stroke="#0076bd" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M-10 90 Q20 75 50 90 Q80 105 110 90" stroke="#009a4e" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>

        {/* Brand Text */}
        <text x="200" y="170" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="500" fontSize="56" textAnchor="middle" letterSpacing="6" fill="url(#brandGradient)">
          HORN TRAVEL
        </text>
      </svg>
    </div>
  );
};

export default Logo;

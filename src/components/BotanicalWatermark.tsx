import React from 'react';
import { ThemeKey } from '../types';

interface BotanicalWatermarkProps {
  theme: ThemeKey;
  className?: string;
}

export const BotanicalWatermark: React.FC<BotanicalWatermarkProps> = ({ theme, className = '' }) => {
  return (
    <div className={`pointer-events-none absolute bottom-0 right-1 opacity-25 select-none transition-opacity duration-300 group-hover:opacity-40 ${className}`}>
      {theme === 'peach' && (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-rose-900">
          <path d="M50,90 Q55,60 70,40 Q85,20 60,15 Q35,10 40,35 Q45,60 50,90" />
          <path d="M55,65 Q75,60 82,50 Q75,45 60,55" />
          <path d="M48,50 Q30,45 22,35 Q30,30 45,40" />
          <circle cx="60" cy="18" r="4" fill="currentColor" opacity="0.3" />
          <circle cx="70" cy="28" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      )}

      {theme === 'gold' && (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-amber-900">
          <path d="M50,95 Q52,65 65,45" />
          <circle cx="68" cy="40" r="10" strokeDasharray="3 3" />
          <path d="M68,30 L68,50 M58,40 L78,40" />
          <path d="M51,75 Q68,70 75,60" />
          <circle cx="77" cy="58" r="5" />
          <path d="M49,60 Q32,55 25,45" />
          <circle cx="23" cy="43" r="6" />
        </svg>
      )}

      {theme === 'lavender' && (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-purple-900">
          <path d="M50,95 Q48,60 52,30 Q54,15 50,10" />
          <ellipse cx="46" cy="20" rx="4" ry="8" transform="rotate(-25 46 20)" fill="currentColor" opacity="0.25" />
          <ellipse cx="56" cy="22" rx="4" ry="8" transform="rotate(25 56 22)" fill="currentColor" opacity="0.25" />
          <ellipse cx="44" cy="35" rx="4" ry="8" transform="rotate(-30 44 35)" fill="currentColor" opacity="0.25" />
          <ellipse cx="58" cy="38" rx="4" ry="8" transform="rotate(30 58 38)" fill="currentColor" opacity="0.25" />
          <ellipse cx="45" cy="50" rx="5" ry="9" transform="rotate(-35 45 50)" fill="currentColor" opacity="0.25" />
          <ellipse cx="57" cy="53" rx="5" ry="9" transform="rotate(35 57 53)" fill="currentColor" opacity="0.25" />
        </svg>
      )}

      {theme === 'mint' && (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-teal-900">
          <path d="M40,95 Q55,65 65,30 Q70,15 65,10" />
          <path d="M52,70 Q70,65 78,55 Q65,50 54,65" fill="currentColor" opacity="0.2" />
          <path d="M48,52 Q30,48 24,38 Q38,36 49,48" fill="currentColor" opacity="0.2" />
          <path d="M58,38 Q74,32 78,22 Q65,20 59,33" fill="currentColor" opacity="0.2" />
        </svg>
      )}

      {theme === 'periwinkle' && (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-indigo-900">
          <path d="M50,95 Q48,65 60,40" />
          <circle cx="62" cy="35" r="5" fill="currentColor" opacity="0.3" />
          <circle cx="54" cy="27" r="4" fill="currentColor" opacity="0.3" />
          <circle cx="70" cy="27" r="4" fill="currentColor" opacity="0.3" />
          <circle cx="54" cy="43" r="4" fill="currentColor" opacity="0.3" />
          <circle cx="70" cy="43" r="4" fill="currentColor" opacity="0.3" />
          <path d="M50,75 Q32,70 26,60" />
          <circle cx="24" cy="58" r="4" fill="currentColor" opacity="0.25" />
        </svg>
      )}

      {theme === 'rose' && (
        <svg width="74" height="74" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-pink-900">
          <path d="M50,95 Q52,65 65,40" />
          <circle cx="68" cy="35" r="9" stroke="currentColor" opacity="0.4" />
          <circle cx="68" cy="35" r="4" fill="currentColor" opacity="0.3" />
          <path d="M51,70 Q35,65 28,52" />
          <circle cx="26" cy="50" r="6" stroke="currentColor" opacity="0.4" />
        </svg>
      )}
    </div>
  );
};

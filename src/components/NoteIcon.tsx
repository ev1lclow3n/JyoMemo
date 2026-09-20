import React from 'react';
import {
  Sparkles,
  Heart,
  Moon,
  Star,
  Feather,
  Leaf,
} from 'lucide-react';
import { IconKey } from '../types';

interface NoteIconProps {
  iconType: IconKey;
  className?: string;
}

export const NoteIcon: React.FC<NoteIconProps> = ({ iconType, className = 'w-4 h-4' }) => {
  switch (iconType) {
    case 'leaf':
      return <Leaf className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'moon':
      return <Moon className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'feather':
      return <Feather className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

import React from 'react';
import { Save, Check, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  notesCount: number;
  onManualSave: () => void;
  isSaving: boolean;
  saveFeedback: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  notesCount,
  onManualSave,
  isSaving,
  saveFeedback,
}) => {
  return (
    <footer className="relative z-20 flex items-center justify-between px-3 sm:px-6 md:px-8 pb-2 sm:pb-3 md:pb-4 pt-1 select-none">
      {/* Left: Notes Count Pill Indicator */}
      <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-sm text-[10px] sm:text-xs font-medium text-pink-200/90">
        <Heart className="h-3 w-3 fill-pink-400/80 text-pink-400" />
        <span className="hidden xs:inline">{notesCount} {notesCount === 1 ? 'thought' : 'thoughts'}</span>
        <span className="xs:hidden">{notesCount}</span>
      </div>

      {/* Center: Delicate Butterfly Ornament */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2 text-white/50 text-xs">
          <span className="h-[1px] w-6 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-xs sm:text-sm md:text-base opacity-85">🦋</span>
          <span className="h-[1px] w-6 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-white/40" />
        </div>
        <p className="font-script text-sm sm:text-lg md:text-xl text-white/90 tracking-wider drop-shadow-sm mt-0.5">
          ♡ Jyoti's Thoughts ♡
        </p>
      </div>

      {/* Right: Save Pill Button */}
      <motion.button
        id="save-notes-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onManualSave}
        disabled={isSaving}
        className={`group relative flex items-center gap-1.5 sm:gap-2 rounded-full border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-lg transition-all duration-300 ${
          saveFeedback
            ? 'border-emerald-400/80 bg-emerald-700/80 text-white shadow-emerald-500/25'
            : 'border-purple-300/40 bg-purple-900/60 text-white hover:border-pink-300 hover:bg-purple-800/70 hover:shadow-pink-500/20'
        }`}
      >
        <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-200 transition-transform group-hover:scale-110" />
        <span>{saveFeedback ? 'Saved' : 'Save'}</span>
        <div
          className={`flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full transition-colors ${
            saveFeedback ? 'bg-emerald-400 text-emerald-950' : 'border border-white/40 bg-white/10 text-white/80'
          }`}
        >
          <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 stroke-[3]" />
        </div>
      </motion.button>
    </footer>
  );
};

import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface AddNoteCardProps {
  onClick: () => void;
  className?: string;
}

export const AddNoteCard: React.FC<AddNoteCardProps> = ({ onClick, className = '' }) => {
  return (
    <motion.button
      id="add-note-card-button"
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 border-dashed border-white/40 bg-white/10 p-2.5 sm:p-4 md:p-5 text-center shadow-md transition-all duration-200 hover:border-pink-300/80 hover:bg-white/15 hover:shadow-pink-500/15 focus:outline-none ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white/95 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-pink-200 group-hover:bg-pink-400/20">
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:rotate-90" />
        </div>
        <span className="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-white drop-shadow-sm transition-colors group-hover:text-pink-100">
          Add Note
        </span>
        <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-pink-300 text-pink-300 drop-shadow transition-transform duration-300 group-hover:scale-125" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-400/0 via-purple-300/0 to-cyan-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
    </motion.button>
  );
};

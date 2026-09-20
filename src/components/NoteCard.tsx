import React, { useState } from 'react';
import { Heart, CheckCircle2, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { NoteItem } from '../types';
import { THEMES } from '../constants/themes';
import { NoteIcon } from './NoteIcon';
import { BotanicalWatermark } from './BotanicalWatermark';

interface NoteCardProps {
  note: NoteItem;
  onUpdate: (updatedNote: NoteItem) => void;
  onDelete: (id: string) => void;
  onEdit: (note: NoteItem) => void;
  saveStatus?: string;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onUpdate,
  onDelete,
  onEdit,
  saveStatus = 'Saved automatically',
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = THEMES[note.theme] || THEMES.peach;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate({
      ...note,
      isFavorite: !note.isFavorite,
      updatedAt: Date.now(),
    });
  };

  const renderFormattedContent = () => {
    if (!note.content || note.content.trim() === '') {
      return (
        <span className="italic text-stone-600/80 text-[11px] sm:text-xs">
          Tap to add your thoughts... ♡
        </span>
      );
    }

    const lines = note.content.split('\n');
    return (
      <div className="space-y-0.5 sm:space-y-1">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*');
          const bulletText = isBullet ? trimmed.replace(/^[-•*]\s*/, '') : trimmed;

          return (
            <div key={idx} className="flex items-start gap-1 leading-snug">
              {isBullet && (
                <span className="text-[10px] sm:text-xs select-none opacity-80 mt-0.5 text-stone-800">•</span>
              )}
              <span className="text-[11px] sm:text-xs md:text-[13px] font-medium tracking-tight text-stone-800">
                {bulletText}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      id={`note-card-${note.id}`}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      onClick={() => onEdit(note)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border bg-gradient-to-br p-2.5 sm:p-3.5 md:p-4 shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer ${theme.cardBg} ${theme.borderColor}`}
    >
      {/* Top Header: Mood Icon + PROMINENT Title on Left, Actions on Right */}
      <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-black/5 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div className={`flex h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded-lg text-stone-900 transition-transform group-hover:scale-105 ${theme.iconBg}`}>
            <NoteIcon iconType={note.iconType} className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
          </div>
          {/* High-visibility Title that NEVER clips or hides */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-stone-900 truncate leading-tight">
            {note.title || 'Untitled Thought'}
          </h3>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {/* Quick Menu Button */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-full text-stone-700/80 hover:text-stone-900 hover:bg-black/10 transition-colors"
              title="Note Options"
            >
              <MoreVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {showMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-6 z-30 w-28 rounded-xl bg-white/98 p-1 shadow-xl border border-stone-200/80 text-xs text-stone-800"
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(note);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-rose-50 text-stone-700"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onDelete(note.id);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-red-50 text-rose-600"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            )}
          </div>

          {/* Favorite Heart Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={toggleFavorite}
            className="p-1 text-stone-700 hover:text-rose-600 transition-colors"
            title={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform ${
                note.isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-700/80'
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* Middle Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar my-1 pr-1">
        {renderFormattedContent()}
      </div>

      {/* Bottom Footer: Auto-save status and Botanical Watermark */}
      <div className="relative z-10 flex items-center justify-between pt-0.5 border-t border-black/5 shrink-0">
        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-[11px] font-medium tracking-tight text-stone-700/90">
          <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-700 shrink-0" />
          <span className="truncate">{saveStatus}</span>
        </div>
      </div>

      {/* Botanical Watermark */}
      <BotanicalWatermark theme={note.theme} />
    </motion.div>
  );
};

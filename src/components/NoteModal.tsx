import React, { useState, useEffect } from 'react';
import { X, Check, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NoteItem, ThemeKey, IconKey } from '../types';
import { THEMES } from '../constants/themes';
import { NoteIcon } from './NoteIcon';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  initialNote?: NoteItem | null;
}

const AVAILABLE_ICONS: IconKey[] = ['leaf', 'star', 'heart', 'moon', 'sparkles', 'feather'];
const AVAILABLE_THEMES: ThemeKey[] = ['peach', 'gold', 'lavender', 'mint', 'periwinkle', 'rose'];

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialNote,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [iconType, setIconType] = useState<IconKey>('sparkles');
  const [theme, setTheme] = useState<ThemeKey>('peach');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
      setIconType(initialNote.iconType);
      setTheme(initialNote.theme);
      setIsFavorite(!!initialNote.isFavorite);
    } else {
      setTitle('');
      setContent('');
      setIconType('sparkles');
      setTheme('peach');
      setIsFavorite(false);
    }
  }, [initialNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onSave({
      id: initialNote?.id,
      title: title.trim() || 'Untitled Thought',
      content,
      iconType,
      theme,
      isFavorite,
    });
    onClose();
  };

  const addBullet = () => {
    setContent((prev) => (prev ? `${prev}\n• ` : '• '));
  };

  const addHeart = () => {
    setContent((prev) => `${prev} ♡`);
  };

  const addSparkle = () => {
    setContent((prev) => `${prev} ✨`);
  };

  const currentThemeConfig = THEMES[theme];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl sm:rounded-3xl border border-pink-300/30 bg-[#140e2b] p-4 sm:p-6 text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  {initialNote ? 'Edit Thought' : "Write in Jyoti's Notes"}
                </h2>
                <p className="text-xs text-white/60">Organize your beautiful thoughts ♡</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200/80 mb-1">
                Thought Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Big Dreams, Reminders, Notes..."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-sm text-white placeholder-white/40 shadow-inner focus:border-pink-400 focus:bg-white/15 focus:outline-none"
                autoFocus
              />
            </div>

            {/* Content Textarea with Helper Buttons */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200/80">
                  Thought Content
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={addBullet}
                    className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80 hover:bg-white/20 hover:text-white"
                  >
                    + Bullet •
                  </button>
                  <button
                    type="button"
                    onClick={addHeart}
                    className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-pink-300 hover:bg-white/20"
                  >
                    + ♡
                  </button>
                  <button
                    type="button"
                    onClick={addSparkle}
                    className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-amber-200 hover:bg-white/20"
                  >
                    + ✨
                  </button>
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your dreams, memories, or tasks here... Use new lines or - bullet points"
                rows={4}
                className="custom-scrollbar w-full rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white placeholder-white/40 shadow-inner focus:border-pink-400 focus:bg-white/15 focus:outline-none"
              />
            </div>

            {/* Color Palette Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200/80 mb-1.5">
                Pastel Aesthetic
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVAILABLE_THEMES.map((tKey) => {
                  const t = THEMES[tKey];
                  const isSelected = theme === tKey;
                  return (
                    <button
                      key={tKey}
                      type="button"
                      onClick={() => setTheme(tKey)}
                      className={`relative flex flex-col items-center justify-center rounded-xl p-2 transition-all ${
                        isSelected
                          ? 'ring-2 ring-pink-400 scale-105 shadow-md shadow-pink-500/20'
                          : 'opacity-70 hover:opacity-100 hover:scale-102'
                      } bg-gradient-to-br ${t.cardBg}`}
                    >
                      <div className="h-4 w-4 rounded-full border border-black/10 flex items-center justify-center">
                        {isSelected && <Check className="h-3 w-3 text-stone-900" />}
                      </div>
                      <span className="mt-1 text-[9px] font-bold text-stone-800 line-clamp-1">
                        {t.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-pink-200/80 mb-1.5">
                Thought Icon
              </label>
              <div className="flex items-center gap-2">
                {AVAILABLE_ICONS.map((iKey) => {
                  const isSelected = iconType === iKey;
                  return (
                    <button
                      key={iKey}
                      type="button"
                      onClick={() => setIconType(iKey)}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                        isSelected
                          ? 'border-pink-400 bg-pink-500/30 text-pink-200 scale-110 shadow-sm'
                          : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <NoteIcon iconType={iKey} className="h-4 w-4" />
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`ml-auto flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs transition-all ${
                    isFavorite
                      ? 'border-rose-400/80 bg-rose-500/20 text-rose-300'
                      : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
                  <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:brightness-110"
              >
                <span>Save ♡</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

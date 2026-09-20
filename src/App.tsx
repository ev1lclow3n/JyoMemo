import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NoteItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AddNoteCard } from './components/AddNoteCard';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import { Plus, Heart } from 'lucide-react';

const STORAGE_KEY = 'jyoti_thoughts_notes_v1';

export default function App() {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading notes from localStorage:', e);
    }
    return [];
  });

  const [isNightMode, setIsNightMode] = useState(false);
  const [isButterflyFlickering, setIsButterflyFlickering] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [saveStatusText, setSaveStatusText] = useState('Saved automatically');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save whenever notes change
  useEffect(() => {
    setSaveStatusText('Saving...');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        setSaveStatusText('Saved automatically');
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
        setSaveStatusText('Save failed');
      }
    }, 350);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [notes]);

  // Butterfly Click & Manual Save Handler
  const handleButterflySave = () => {
    setIsSaving(true);
    setIsButterflyFlickering(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      setSaveFeedback(true);
      setSaveStatusText('Saved automatically');
      showToast('Thoughts saved for Jyoti ♡ 🦋');
      setTimeout(() => setSaveFeedback(false), 2000);
      setTimeout(() => setIsButterflyFlickering(false), 2400);
    } catch (e) {
      console.error(e);
      showToast('Could not save thoughts.');
      setIsButterflyFlickering(false);
    } finally {
      setIsSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateOrUpdateNote = (
    noteData: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
  ) => {
    if (noteData.id) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteData.id
            ? {
                ...n,
                ...noteData,
                updatedAt: Date.now(),
              }
            : n
        )
      );
      showToast('Thought updated ♡');
    } else {
      const newNote: NoteItem = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        title: noteData.title,
        content: noteData.content,
        iconType: noteData.iconType,
        theme: noteData.theme,
        isFavorite: noteData.isFavorite,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
      showToast('New thought added ♡');
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    showToast('Thought deleted');
  };

  const handleUpdateNote = (updated: NoteItem) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const openNewNoteModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note: NoteItem) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  // 6 slots layout (Slot 0 is Add Note, Slots 1-5 are notes or empty write slots)
  const MAX_NOTES_DISPLAY = 5;
  const displayNotes = notes.slice(0, MAX_NOTES_DISPLAY);
  const emptySlotsCount = Math.max(0, MAX_NOTES_DISPLAY - displayNotes.length);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#070512] select-none flex items-center justify-center font-body">
      {/* ================= BACKGROUND & REALISTIC BUTTERFLY ================= */}
      {/* 1. Ambient Wallpaper Backdrop (Clean dark aesthetic, NO blurry butterfly in background) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/clean_dark_bg.jpg"
          alt="Ambient Background"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-all duration-700 ${
            isNightMode ? 'brightness-75 saturate-100' : 'brightness-90 saturate-105'
          }`}
          style={{
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Soft elegant vignette */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isNightMode
              ? 'bg-gradient-to-b from-[#080413]/70 via-transparent to-[#080413]/80'
              : 'bg-gradient-to-b from-[#0a0518]/40 via-transparent to-[#0d0722]/60'
          }`}
        />
      </div>

      {/* 2. Realistic Fine-Art Butterfly Specimen - Razor-Sharp, Zero Glow, True 3D Flutter */}
      <div
        onClick={handleButterflySave}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto cursor-pointer select-none"
        title="Click the butterfly to flutter wings & save thoughts ♡"
        style={{ perspective: '1400px' }}
      >
        <div
          className="relative w-[92vw] max-w-[380px] sm:max-w-[540px] md:max-w-[660px] lg:max-w-[760px] aspect-[1408/768] pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Left Wing (Hinged at right edge / center body line at 50% - Flutters freely with NO duplicate underneath) */}
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/2 overflow-visible pointer-events-none select-none ${
              isButterflyFlickering ? 'butterfly-rapid-left' : 'butterfly-flicker-left'
            }`}
            style={{
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <img
              src="/butterfly_left_wing.png"
              alt="Left Wing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-fill select-none pointer-events-none"
            />
          </div>

          {/* Right Wing (Hinged at left edge / center body line at 50% - Flutters freely with NO duplicate underneath) */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 w-1/2 overflow-visible pointer-events-none select-none ${
              isButterflyFlickering ? 'butterfly-rapid-right' : 'butterfly-flicker-right'
            }`}
            style={{
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <img
              src="/butterfly_right_wing.png"
              alt="Right Wing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-fill select-none pointer-events-none"
            />
          </div>

          {/* Central Body & Antennae (Anchored seamlessly on top of hinge axis - crystal clear, perfectly stationary) */}
          <div className="absolute inset-0 pointer-events-none select-none z-10">
            <img
              src="/butterfly_body.png"
              alt="Butterfly Body & Antennae"
              referrerPolicy="no-referrer"
              className="w-full h-full object-fill select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Main App Container: Fully responsive across phone, tablet, and desktop */}
      <div className="relative z-20 flex flex-col justify-between w-full h-full max-w-7xl mx-auto p-2 sm:p-3 md:p-5 overflow-hidden transition-all duration-300 pointer-events-none">
        {/* Top Header - pointer-events-auto for interactions */}
        <div className="pointer-events-auto">
          <Header
            isNightMode={isNightMode}
            onToggleNightMode={() => setIsNightMode(!isNightMode)}
            onButterflyClick={handleButterflySave}
            isFlickering={isButterflyFlickering}
          />
        </div>

        {/* Notes Grid: 2 columns x 3 rows on mobile, 3 columns x 2 rows on tablet and desktop */}
        <main className="flex-1 min-h-0 my-1 px-1.5 sm:px-3 md:px-5 pointer-events-auto">
          <div className="h-full w-full grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-2 sm:gap-3 md:gap-4">
            {/* Box 1: Add Note Card */}
            <AddNoteCard onClick={openNewNoteModal} className="h-full min-h-0" />

            {/* Existing Notes */}
            <AnimatePresence mode="popLayout">
              {displayNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onUpdate={handleUpdateNote}
                  onDelete={handleDeleteNote}
                  onEdit={openEditNoteModal}
                  saveStatus={saveStatusText}
                />
              ))}
            </AnimatePresence>

            {/* Empty Slots */}
            {Array.from({ length: emptySlotsCount }).map((_, idx) => (
              <motion.button
                key={`empty-slot-${idx}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={openNewNoteModal}
                className="group relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-black/45 p-2 sm:p-3 md:p-4 text-center transition-all duration-200 hover:border-pink-300/50 hover:bg-black/60 hover:shadow-md focus:outline-none"
              >
                <div className="flex flex-col items-center gap-1 opacity-70 transition-opacity group-hover:opacity-95">
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-pink-200">
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-white/90 truncate max-w-[130px]">
                    Thought Space ♡
                  </span>
                  <p className="text-[9px] sm:text-[10px] text-pink-200/80">Tap to write</p>
                </div>
              </motion.button>
            ))}
          </div>
        </main>

        {/* Bottom Footer - pointer-events-auto */}
        <div className="pointer-events-auto">
          <Footer
            notesCount={notes.length}
            onManualSave={handleButterflySave}
            isSaving={isSaving}
            saveFeedback={saveFeedback}
          />
        </div>
      </div>

      {/* Note Creator/Editor Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdateNote}
        initialNote={editingNote}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-pink-300/40 bg-[#120d26] px-4 py-2 text-xs font-semibold text-pink-200 shadow-2xl"
          >
            <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

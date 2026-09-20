import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  isNightMode: boolean;
  onToggleNightMode: () => void;
  onButterflyClick: () => void;
  isFlickering?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isNightMode,
  onToggleNightMode,
  onButterflyClick,
  isFlickering = false,
}) => {
  return (
    <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 pt-2 sm:pt-4 pb-2 select-none">
      {/* Left: Branding & Subtitle */}
      <div className="flex items-center gap-3">
        {/* Artistic Butterfly Emblem */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={onButterflyClick}
          className="relative group cursor-pointer select-none rounded-full transition-all focus:outline-none"
          title="Click to flutter butterfly wings & save thoughts ♡"
        >
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden border border-white/20 bg-black/60 shadow-md flex items-center justify-center p-1">
            <img
              src="/butterfly_specimen.png"
              alt="Fine Art Butterfly"
              referrerPolicy="no-referrer"
              className={`h-full w-full object-contain transition-transform duration-300 ${
                isFlickering ? 'scale-125 rotate-3' : 'group-hover:scale-110'
              }`}
            />
          </div>
        </motion.button>

        {/* Title and Tagline */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="font-script text-3xl sm:text-4xl text-white tracking-wide">
              Jyoti's
            </span>
            <span className="text-xl sm:text-2xl font-light tracking-wide text-white/95">
              Thoughts
            </span>
          </div>
          <p className="mt-1 text-[11px] sm:text-xs font-normal tracking-wide text-white/80">
            Same mind &nbsp;·&nbsp; More clarity &nbsp;·&nbsp; Beautiful chaos ♡
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2.5">
        {/* Night / Ambient Light Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleNightMode}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 shadow-md transition-colors hover:border-white/40 hover:bg-black/70"
          title={isNightMode ? 'Night Mode Active' : 'Switch to Darker Mode'}
        >
          {isNightMode ? (
            <Moon className="h-4 w-4 text-purple-200 fill-purple-200/30" />
          ) : (
            <Sun className="h-4 w-4 text-amber-200" />
          )}
        </motion.button>

        {/* Butterfly Badge Quick-Save Trigger */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onButterflyClick}
          className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 p-1 shadow-md transition-all hover:border-white/40 overflow-hidden group"
          title="Save thoughts & flutter butterfly wings ♡"
        >
          <img
            src="/butterfly_specimen.png"
            alt="Butterfly Art"
            referrerPolicy="no-referrer"
            className={`h-full w-full object-contain rounded-full transition-transform duration-300 ${
              isFlickering ? 'scale-125 rotate-4' : 'group-hover:scale-110'
            }`}
          />
        </motion.button>
      </div>
    </header>
  );
};

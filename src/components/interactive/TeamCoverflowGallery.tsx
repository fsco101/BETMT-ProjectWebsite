import React, { useState, useEffect, useRef } from 'react';
import { TeamMember } from '../../types/pneumatic';

interface TeamCoverflowGalleryProps {
  members: TeamMember[];
  onSelectMember?: (member: TeamMember) => void;
}

export const TeamCoverflowGallery: React.FC<TeamCoverflowGalleryProps> = ({
  members,
  onSelectMember
}) => {
  const [activeIndex, setActiveIndex] = useState(2); // Start on 3rd member for visual balance
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const prevMember = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const nextMember = () => {
    setActiveIndex((prev) => Math.min(members.length - 1, prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextMember();
      } else {
        prevMember();
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextMember();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevMember();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [members.length]);

  const activeMember = members[activeIndex] || members[0];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="3D Researcher Coverflow Gallery"
      className="relative w-full max-w-5xl mx-auto py-6 sm:py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16324F] dark:focus-visible:ring-sky-400 rounded-xl select-none"
    >
      {/* 3D Perspective Stage with Touch Swipe Handling */}
      <div
        className="relative w-full h-[340px] sm:h-[420px] md:h-[460px] overflow-hidden flex items-center justify-center touch-pan-y"
        style={{ perspective: '800px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {members.map((member, i) => {
          const d = i - activeIndex;
          const side = Math.sign(d);
          const abs = Math.abs(d);
          const isActive = i === activeIndex;

          // Exact mathematical transform from BrewedOps motion library specification:
          // Active sits at translateZ(40px)
          // Sides pushed out with translateX(sign(d) * (74% + (|d| - 1) * 28%)),
          // pushed back with translateZ(-120px - |d| * 40px) and rotateY(-sign(d) * 58deg)
          const translateX = abs === 0 ? 0 : side * (74 + (abs - 1) * 28);
          const translateZ = abs === 0 ? 40 : -120 - abs * 40;
          const rotateY = prefersReducedMotion ? 0 : abs === 0 ? 0 : -side * 58;
          const zIndex = 15 - abs;
          const isVisible = abs <= 3;
          const opacity = abs > 2 ? 0 : abs === 2 ? 0.35 : abs === 1 ? 0.75 : 1;

          return (
            <button
              key={member.id}
              type="button"
              aria-label={`Select ${member.name}`}
              aria-pressed={isActive}
              onClick={() => {
                if (isActive && onSelectMember) {
                  onSelectMember(member);
                } else {
                  setActiveIndex(i);
                }
              }}
              style={{
                transform: `translate3d(-50%, -50%, 0) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity: isVisible ? opacity : 0,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'transform 0.8s var(--ml-spring), opacity 0.6s ease'
              }}
              className="absolute left-1/2 top-1/2 w-[210px] sm:w-[260px] md:w-[290px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E2135] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500 will-change-transform"
            >
              <div className="relative w-full h-full bg-slate-200 dark:bg-slate-900 overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    className="w-full h-full object-cover object-top pointer-events-none"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-5xl">person</span>
                  </div>
                )}

                {/* Badge Number */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-xs bg-[#16324F]/85 text-white font-mono text-[10px] font-bold backdrop-blur-xs">
                  #{String(i + 1).padStart(2, '0')}
                </div>

                {/* Active Highlight Glow Border */}
                {isActive && (
                  <div className="absolute inset-0 border-2 border-amber-400 pointer-events-none rounded-xl" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Member Name Display & Controls (Interactive.md Item 5) */}
      <div className="mt-4 flex flex-col items-center justify-center space-y-3 text-center">
        
        {/* Active Member Name & Info */}
        <div className="min-h-[64px] flex flex-col items-center justify-center">
          <h3 className="font-sans font-extrabold text-lg sm:text-2xl text-[#16324F] dark:text-white uppercase tracking-tight transition-all duration-300">
            {activeMember.name}
          </h3>
          <p className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold font-mono mt-1">
            Student Researcher #{String(activeIndex + 1).padStart(2, '0')} of {members.length} · BET-MT Batch 2023
          </p>
        </div>

        {/* Navigation Arrows & Dot Pagination */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={prevMember}
            disabled={activeIndex === 0}
            aria-label="Previous researcher"
            className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#162238] flex items-center justify-center text-[#16324F] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {members.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Jump to researcher ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-6 h-2 bg-[#16324F] dark:bg-sky-400'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextMember}
            disabled={activeIndex === members.length - 1}
            aria-label="Next researcher"
            className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#162238] flex items-center justify-center text-[#16324F] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
          Tip: Click covers, use Left/Right arrows, or click dots to navigate
        </p>

      </div>
    </div>
  );
};

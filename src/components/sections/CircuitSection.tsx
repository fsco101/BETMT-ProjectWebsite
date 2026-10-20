import React, { useState, useEffect, useRef } from 'react';
import { circuitStages } from '../../data/circuitStages';
import { CircuitStage } from '../../types/pneumatic';
import { CircuitDetailDrawer } from '../modals/CircuitDetailDrawer';
import { useLightbox } from '../../context/LightboxContext';

export const CircuitSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<CircuitStage | null>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isHorizontalMode, setIsHorizontalMode] = useState(true);
  const { openLightbox } = useLightbox();

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Scroll to a specific stage index smoothly
  const scrollToStage = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    if (!isHorizontalMode) {
      const card = trackRef.current?.querySelectorAll<HTMLElement>('.circuit-card-item')[index];
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const maxScroll = section.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const targetScroll = sectionTop + (index / (circuitStages.length - 1)) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;
    if (!section || !track) return;

    const checkHorizontalMode = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isDesktop = window.innerWidth >= 1024;
      return isDesktop && !prefersReduced;
    };

    let isHorizontal = checkHorizontalMode();
    setIsHorizontalMode(isHorizontal);

    const updateHeight = () => {
      if (!isHorizontal || !section || !track) {
        section.style.height = 'auto';
        track.style.transform = 'none';
        if (progressBar) progressBar.style.transform = 'scaleX(1)';
        return;
      }
      // Height = track width - viewport width + viewport height
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const travel = Math.max(0, trackWidth - viewportWidth);
      const totalHeight = travel + viewportHeight;
      section.style.height = `${totalHeight}px`;
    };

    let rafId: number | null = null;

    const updateScroll = () => {
      if (!isHorizontal || !section || !track) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollY = window.scrollY;
      const maxScroll = section.offsetHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      // progress = clamp(scrollY - section.offsetTop, 0, section.offsetHeight - innerHeight) / (section.offsetHeight - innerHeight)
      const progress = Math.min(1, Math.max(0, (scrollY - sectionTop) / maxScroll));
      const travel = track.scrollWidth - window.innerWidth;

      track.style.transform = `translate3d(${(-progress * travel).toFixed(1)}px, 0, 0)`;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      // Highlight the card nearest the viewport center
      const cardElements = track.querySelectorAll<HTMLElement>('.circuit-card-item');
      const viewportCenter = window.innerWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;

      cardElements.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      setActiveStageIndex(closestIdx);
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScroll();
          rafId = null;
        });
      }
    };

    const onResize = () => {
      const mode = checkHorizontalMode();
      isHorizontal = mode;
      setIsHorizontalMode(mode);
      updateHeight();
      updateScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial setup with multiple delays to account for font & image loading reflows
    const timer1 = setTimeout(() => {
      updateHeight();
      updateScroll();
    }, 100);

    const timer2 = setTimeout(() => {
      updateHeight();
      updateScroll();
    }, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const activeStage = circuitStages[activeStageIndex] || circuitStages[0];

  return (
    <section
      id="system-components"
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-[#0B132B] transition-colors"
      style={{
        // Section height will be set to (track width - viewport width + viewport height) via JS on desktop
        minHeight: isHorizontalMode ? '100vh' : 'auto',
      }}
    >
      {/* Sticky Parent Child (100vh) on desktop, static container on mobile */}
      <div
        className={
          isHorizontalMode
            ? 'sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 lg:py-7 px-4 sm:px-8 xl:px-12 z-10'
            : 'relative w-full h-auto overflow-visible py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto'
        }
      >
        {/* ================= SECTION TOP HEADER ================= */}
        <div className="flex-none max-w-7xl w-full mx-auto mb-3 sm:mb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  SYSTEM COMPONENTS &amp; GENERATION
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  7 Essential Stages
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#16324F] dark:text-white leading-tight">
                HOW THE SYSTEM WORKS
              </h2>
            </div>

            {/* Live Pipeline Active Stage Indicator & Navigation Trigger */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                  Active Pipeline Stage
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#16324F] dark:text-sky-400 truncate max-w-[280px]">
                  0{activeStage.stageNumber}. {activeStage.name.replace(/^\d+\.\s*/, '')}
                </span>
              </div>

              {isHorizontalMode && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-sm text-amber-500 dark:text-sky-400 animate-bounce">
                    swap_horiz
                  </span>
                  <span>Scroll down to advance pipeline</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= HORIZONTAL / GRID TRACK ================= */}
        <div className="flex-1 flex items-center w-full min-h-0 overflow-hidden my-auto py-2">
          <div
            ref={trackRef}
            className={
              isHorizontalMode
                ? 'flex flex-nowrap gap-6 items-stretch will-change-transform px-4 sm:px-8 xl:px-12'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full'
            }
          >
            {circuitStages.map((stage, idx) => {
              const isCenterActive = isHorizontalMode && idx === activeStageIndex;
              const slideImgs = stage.images && stage.images.length > 0 ? stage.images : [stage.image];
              const slideCaps = stage.imageCaptions || [];

              return (
                <div
                  key={stage.id}
                  data-index={idx}
                  onClick={() => setSelectedStage(stage)}
                  className={`circuit-card-item rounded-xl border flex flex-col justify-between group cursor-pointer transition-all duration-300 ${
                    isHorizontalMode
                      ? 'w-[320px] sm:w-[360px] xl:w-[400px] shrink-0 h-[52vh] sm:h-[56vh] max-h-[500px] min-h-[420px] p-5'
                      : 'w-full p-5 shadow-xs'
                  } ${
                    isCenterActive
                      ? 'bg-amber-50/40 dark:bg-[#122842] border-amber-500 dark:border-sky-400 ring-2 ring-amber-500/30 dark:ring-sky-400/30 shadow-2xl scale-[1.02] z-20'
                      : 'bg-white dark:bg-[#0E2135] border-slate-200 dark:border-slate-800 opacity-90 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-600 shadow-sm'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedStage(stage);
                  }}
                >
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Image Stage Container */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(
                          slideImgs.map((src, i) => ({
                            src,
                            title: `${stage.name} — Photo 0${i + 1}`,
                            caption: slideCaps[i] || stage.description,
                          })),
                          0
                        );
                      }}
                      className="relative aspect-[16/10] sm:aspect-[4/3] max-h-[200px] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 mb-3 group/img cursor-zoom-in shrink-0"
                      title="Click to view full uncropped photos"
                    >
                      <img
                        src={stage.image}
                        alt={stage.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Stage Badge */}
                      <div
                        className={`absolute top-2 left-2 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-sm font-bold shadow-xs transition-colors ${
                          isCenterActive
                            ? 'bg-amber-500 dark:bg-sky-400 text-slate-950 font-extrabold'
                            : 'bg-[#16324F]/90 dark:bg-slate-900/90 text-white'
                        }`}
                      >
                        Stage 0{stage.stageNumber}
                      </div>

                      {/* Multi-photo Indicator */}
                      {slideImgs.length > 1 && (
                        <div className="absolute top-2 right-2 bg-slate-900/80 dark:bg-black/80 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold backdrop-blur-xs">
                          {slideImgs.length} Photos
                        </div>
                      )}

                      {/* Zoom Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-black/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-sm">
                          <span className="material-symbols-outlined text-sm">zoom_in</span>
                          <span>Zoom</span>
                        </span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="min-h-0 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className={`font-sans font-bold text-base sm:text-lg block mb-1 leading-snug transition-colors line-clamp-1 ${
                            isCenterActive
                              ? 'text-amber-600 dark:text-sky-300'
                              : 'text-[#16324F] dark:text-white group-hover:text-amber-600 dark:group-hover:text-sky-400'
                          }`}
                        >
                          {stage.name}
                        </h3>
                        <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 block font-semibold mb-2">
                          {stage.subtitle}
                        </span>

                        {/* Description */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-3">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Metric Footer Bar */}
                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] uppercase tracking-wider font-mono shrink-0">
                    <span className="text-slate-500 dark:text-slate-400 truncate pr-2">
                      {stage.metricLabel}:
                    </span>
                    <span
                      className={`font-bold shrink-0 ${
                        isCenterActive
                          ? 'text-amber-600 dark:text-sky-300'
                          : 'text-[#16324F] dark:text-white'
                      }`}
                    >
                      {stage.metricValue}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM PROGRESS LINE & STAGE SELECTOR ================= */}
        <div className="flex-none max-w-7xl w-full mx-auto pt-3">
          {/* Thin Progress Line with scaleX */}
          <div className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-[#16324F] dark:from-sky-400 dark:via-sky-500 dark:to-teal-400 rounded-full origin-left will-change-transform"
              style={{
                transform: 'scaleX(0)',
                transformOrigin: '0 50%',
              }}
            />
          </div>

          {/* Stage Step Indicators Bar */}
          <div className="flex items-center justify-between mt-2.5 text-xs text-slate-500 dark:text-slate-400">
            {/* Stage Quick Jumps */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[70vw] sm:max-w-none">
              {circuitStages.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => scrollToStage(idx)}
                    className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-amber-500 dark:bg-sky-400 text-slate-950 shadow-xs scale-105'
                        : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                    title={`Jump to Stage 0${stage.stageNumber}: ${stage.name}`}
                  >
                    <span>0{stage.stageNumber}</span>
                    <span className="hidden md:inline font-sans font-normal text-[9px] opacity-80">
                      {stage.subtitle.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Inspection Drawer Trigger */}
            <button
              type="button"
              onClick={() => setSelectedStage(activeStage)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-bold bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] hover:bg-[#0E2135] dark:hover:bg-sky-400 transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <span>Inspect Stage 0{activeStage.stageNumber}</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Technical Modal Drawer */}
      <CircuitDetailDrawer
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
        onSelectStage={(stage) => setSelectedStage(stage)}
      />
    </section>
  );
};


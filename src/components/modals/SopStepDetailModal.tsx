import React, { useEffect } from 'react';
import { SopStep } from '../../types/pneumatic';
import { useLightbox } from '../../context/LightboxContext';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface SopStepDetailModalProps {
  step: SopStep | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onLaunchTraining?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const SopStepDetailModal: React.FC<SopStepDetailModalProps> = ({
  step,
  onClose,
  onPrev,
  onNext,
  onLaunchTraining,
  currentIndex = 0,
  totalCount = 0,
}) => {
  const { openLightbox } = useLightbox();

  // Safe reference-counted body scroll locking
  useBodyScrollLock(!!step);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    if (step) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [step, onClose, onPrev, onNext]);

  if (!step) return null;

  const figures = step.images && step.images.length > 0 ? step.images : [step.image];
  const captions = step.imageCaptions || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0E2135] text-slate-800 dark:text-slate-100 shadow-2xl rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-scaleUp transition-colors my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sop-step-modal-title"
      >
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-[#F8FAFC] dark:bg-[#162238] gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm font-bold shrink-0">
              Step {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber} / {totalCount || 15}
            </span>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block truncate">
                {step.category} · {step.badgePrimary}
              </span>
              <h3
                id="sop-step-modal-title"
                className="font-sans font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight"
              >
                {step.title}
              </h3>
            </div>
          </div>

          {/* Quick Prev / Next Switcher & Close Button */}
          <div className="flex items-center gap-2 shrink-0">
            {onPrev && onNext && totalCount > 1 && (
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Previous Step (Left Arrow)"
                >
                  ← Prev
                </button>
                <span className="text-slate-400 font-mono px-1">
                  {currentIndex + 1} / {totalCount}
                </span>
                <button
                  type="button"
                  onClick={onNext}
                  className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Next Step (Right Arrow)"
                >
                  Next →
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
              title="Close (ESC)"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Media Column (Figures & Captions) */}
            <div className="lg:col-span-6 space-y-3">
              <div className={`grid ${figures.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {figures.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      openLightbox(
                        figures.map((src, i) => ({
                          src,
                          title: `${step.title} — Figure 0${i + 1}`,
                          caption: captions[i] || step.description,
                        })),
                        idx
                      )
                    }
                    className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 aspect-[4/3] group/fig cursor-zoom-in shadow-xs"
                    title="Click to view full uncropped figure"
                  >
                    <img
                      src={imgSrc}
                      alt={captions[idx] || `Figure ${idx + 1}`}
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/fig:scale-105"
                    />
                    <div className="absolute bottom-1.5 left-1.5 bg-[#16324F]/90 dark:bg-slate-900/90 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-semibold backdrop-blur-xs">
                      Figure 0{idx + 1}
                    </div>
                    <div className="absolute inset-0 bg-[#16324F]/20 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/80 text-white text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-md">
                        <span className="material-symbols-outlined text-sm">zoom_in</span>
                        <span>Zoom</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {captions.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {captions.map((cap, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">•</span> {cap}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Right Protocol Specifications & Safety Rules Column */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block mb-1">
                  Step Description
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Mandatory Verification Checklist Box */}
              <div className="p-4 bg-slate-50 dark:bg-[#162238]/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                  Mandatory Verification Standard
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-white font-medium leading-relaxed">
                  {step.verificationCriteria}
                </p>
              </div>

              {/* Key Safety Operating Rule Alert Box */}
              <div className="p-3.5 sm:p-4 rounded-xl border-l-4 border-l-red-500 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3">
                <span className="material-symbols-outlined text-base text-red-600 dark:text-red-400 mt-0.5 shrink-0">
                  warning
                </span>
                <div>
                  <strong className="block text-[10px] sm:text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-bold">
                    Critical Operating Rule
                  </strong>
                  <span className="font-light text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step.keySafetyRule}
                  </span>
                </div>
              </div>

              {/* Status and Tag Info */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-slate-800">
                <span>Ref: ISO 8573-1 &amp; ANSI Z87.1</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Standard Certified</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Footer Controls */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ← Prev Step
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Next Step →
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onLaunchTraining && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLaunchTraining();
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">play_circle</span>
                <span>Launch Interactive Training</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] hover:bg-[#0E2135] dark:hover:bg-sky-400 transition-colors cursor-pointer shadow-sm"
            >
              Close Step
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

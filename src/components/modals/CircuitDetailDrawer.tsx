import React, { useState, useEffect } from 'react';
import { CircuitStage } from '../../types/pneumatic';
import { circuitStages } from '../../data/circuitStages';

interface CircuitDetailDrawerProps {
  stage: CircuitStage | null;
  onClose: () => void;
  onSelectStage?: (stage: CircuitStage) => void;
}

export const CircuitDetailDrawer: React.FC<CircuitDetailDrawerProps> = ({
  stage,
  onClose,
  onSelectStage,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Reset slide index when stage changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [stage?.id]);

  // Keyboard navigation: Escape to close, Arrow keys for slideshow
  useEffect(() => {
    if (!stage) return;

    const slideCount = stage.images?.length || 1;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, onClose]);

  if (!stage) return null;

  const slideImages = stage.images && stage.images.length > 0 ? stage.images : [stage.image];
  const slideCaptions = stage.imageCaptions || [];
  const currentCaption = slideCaptions[currentSlideIndex] || `Figure 0${currentSlideIndex + 1} — ${stage.subtitle}`;

  const currentStageIndex = circuitStages.findIndex((s) => s.id === stage.id);
  const prevStage =
    currentStageIndex > 0
      ? circuitStages[currentStageIndex - 1]
      : circuitStages[circuitStages.length - 1];
  const nextStage =
    currentStageIndex < circuitStages.length - 1
      ? circuitStages[currentStageIndex + 1]
      : circuitStages[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-ink/80 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container */}
      <div
        className="relative w-full max-w-5xl 2xl:max-w-6xl max-h-[92vh] sm:max-h-[88vh] bg-[#FAF9F5] dark:bg-[#18181C] text-charcoal-ink dark:text-[#F4F4F6] shadow-2xl flex flex-col hairline-all z-10 my-auto overflow-hidden animate-scaleUp transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="circuit-modal-title"
      >
        {/* Modal Top Header Bar */}
        <div className="p-3.5 sm:p-5 hairline-b flex items-center justify-between bg-[#FAF9F5] dark:bg-[#18181C] z-20 shrink-0">
          {/* Stage Identification */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="bg-charcoal-ink dark:bg-black text-[#FAF9F5] text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium shrink-0">
              Stage 0{stage.stageNumber} / 08
            </span>
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-subtle-ash dark:text-[#8E8B85] truncate max-w-[170px] sm:max-w-none">
              8-Stage Circuit Specification
            </span>
          </div>

          {/* Quick Stage Stepper Switcher */}
          {onSelectStage && (
            <div className="hidden sm:flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em]">
              <button
                type="button"
                onClick={() => onSelectStage(prevStage)}
                className="px-2.5 py-1 border border-hairline-divider dark:border-[#2B2A2F] text-charcoal-ink dark:text-[#E4E4E7] hover:border-charcoal-ink dark:hover:border-white hover:bg-charcoal-ink dark:hover:bg-white hover:text-[#FAF9F5] dark:hover:text-[#18181C] transition-colors"
                title={`Previous: ${prevStage.name}`}
              >
                ← Stage 0{prevStage.stageNumber}
              </button>
              <button
                type="button"
                onClick={() => onSelectStage(nextStage)}
                className="px-2.5 py-1 border border-hairline-divider dark:border-[#2B2A2F] text-charcoal-ink dark:text-[#E4E4E7] hover:border-charcoal-ink dark:hover:border-white hover:bg-charcoal-ink dark:hover:bg-white hover:text-[#FAF9F5] dark:hover:text-[#18181C] transition-colors"
                title={`Next: ${nextStage.name}`}
              >
                Stage 0{nextStage.stageNumber} →
              </button>
            </div>
          )}

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 border border-charcoal-ink/30 dark:border-white/30 text-charcoal-ink dark:text-white flex items-center justify-center hover:bg-charcoal-ink dark:hover:bg-white hover:text-[#FAF9F5] dark:hover:text-[#121214] transition-colors cursor-pointer text-sm shrink-0"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Two Columns (Left: Slideshow, Right: Contents / Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto lg:overflow-hidden min-h-0">
          
          {/* ================= LEFT COLUMN: IMAGE SLIDESHOW ================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col bg-[#F3EFE6] dark:bg-[#121214] hairline-b lg:hairline-b-0 lg:hairline-r overflow-hidden min-h-0">
            
            {/* Slide Header: Counter & Caption */}
            <div className="px-4 py-2.5 hairline-b bg-[#FAF9F5] dark:bg-[#18181C] flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-subtle-ash dark:text-[#8E8B85] shrink-0">
              <span className="font-medium text-charcoal-ink">
                Figure 0{currentSlideIndex + 1} of 0{slideImages.length}
              </span>
              <span className="truncate max-w-[240px] sm:max-w-[340px]">
                {currentCaption}
              </span>
            </div>

            {/* Slideshow Display Frame */}
            <div className="relative flex-1 min-h-[260px] sm:min-h-[360px] lg:min-h-[400px] bg-charcoal-ink overflow-hidden flex items-center justify-center group">
              <img
                key={currentSlideIndex}
                src={slideImages[currentSlideIndex]}
                alt={`${stage.name} - slide ${currentSlideIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300 animate-fadeIn"
              />

              {/* Manual Slide Controls: Previous Button */}
              {slideImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 border border-charcoal-ink/40 bg-[#FAF9F5]/90 hover:bg-charcoal-ink hover:text-[#FAF9F5] flex items-center justify-center text-lg sm:text-xl font-editorial transition-all shadow-md cursor-pointer z-10"
                  aria-label="Previous image"
                  title="Previous image (Left Arrow)"
                >
                  ‹
                </button>
              )}

              {/* Manual Slide Controls: Next Button */}
              {slideImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 border border-charcoal-ink/40 bg-[#FAF9F5]/90 hover:bg-charcoal-ink hover:text-[#FAF9F5] flex items-center justify-center text-lg sm:text-xl font-editorial transition-all shadow-md cursor-pointer z-10"
                  aria-label="Next image"
                  title="Next image (Right Arrow)"
                >
                  ›
                </button>
              )}

              {/* Bottom Image Position Dots / Floating Badges */}
              {slideImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-charcoal-ink/70 px-2.5 py-1 backdrop-blur-xs z-10">
                  {slideImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-1.5 transition-all ${
                        idx === currentSlideIndex
                          ? 'w-6 bg-[#FAF9F5]'
                          : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Jump to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Manual Thumbnail Strip Bar */}
            {slideImages.length > 1 && (
              <div className="p-3 sm:p-3.5 hairline-t bg-[#FAF9F5] dark:bg-[#18181C] flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
                <div className="flex items-center gap-2">
                  {slideImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-12 h-9 sm:w-14 sm:h-10 overflow-hidden border transition-all cursor-pointer shrink-0 ${
                        idx === currentSlideIndex
                          ? 'border-charcoal-ink dark:border-white ring-2 ring-charcoal-ink/30 dark:ring-white/30 scale-105'
                          : 'border-hairline-divider dark:border-[#2B2A2F] opacity-60 hover:opacity-100'
                      }`}
                      title={`View Slide 0${idx + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="hidden sm:block text-[9px] uppercase tracking-[0.16em] text-subtle-ash dark:text-[#8E8B85] whitespace-nowrap">
                  Click thumbnails or use keyboard ← →
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: CONTENTS / DETAILS ================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5 bg-[#FAF9F5] dark:bg-[#18181C] min-h-0">
            <div className="space-y-4 sm:space-y-5">
              
              {/* Title & Subtitle */}
              <div>
                <h3
                  id="circuit-modal-title"
                  className="font-sans font-extrabold text-xl sm:text-2xl lg:text-3xl text-charcoal-ink dark:text-[#F4F4F6] uppercase tracking-tight leading-tight"
                >
                  {stage.name}
                </h3>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-subtle-ash dark:text-[#8E8B85] block mt-1.5">
                  {stage.subtitle}
                </span>
                <p className="mt-3 text-xs sm:text-sm text-muted-charcoal dark:text-[#A1A1AA] leading-relaxed font-light">
                  {stage.description}
                </p>
              </div>

              {/* Key Metric Card */}
              <div className="hairline-all bg-[#F4F0E8] dark:bg-[#222226] p-3 sm:p-3.5 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash dark:text-[#8E8B85]">
                  {stage.metricLabel}
                </span>
                <span className="font-sans font-bold text-lg sm:text-2xl text-charcoal-ink dark:text-[#F4F4F6]">
                  {stage.metricValue}
                </span>
              </div>

              {/* Technical Specifications Table */}
              <div className="hairline-all bg-[#FAF9F5] dark:bg-[#1E1E22]">
                <div className="p-2.5 sm:p-3 hairline-b bg-[#F1EDE5] dark:bg-[#25252A] text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-charcoal-ink dark:text-[#F4F4F6] font-medium">
                  Calibrated Laboratory Parameters
                </div>
                <div className="divide-y divide-hairline-divider dark:divide-[#2B2A2F]">
                  {stage.detailedSpecs.map((spec, i) => (
                    <div key={i} className="p-2.5 sm:p-3 flex items-center justify-between text-xs font-light">
                      <span className="text-muted-charcoal dark:text-[#A1A1AA] text-[11px] sm:text-xs">{spec.label}</span>
                      <span className="font-medium text-charcoal-ink dark:text-[#F4F4F6] text-right ml-2 text-[11px] sm:text-xs">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ISO Standard Compliance & Maintenance */}
              <div className="space-y-2 text-xs">
                {stage.isoStandard && (
                  <div className="flex items-start gap-2.5 p-2.5 sm:p-3 border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200">
                    <span className="material-symbols-outlined text-base text-emerald-800 dark:text-emerald-400 mt-0.5 shrink-0">
                      verified
                    </span>
                    <div>
                      <strong className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold">
                        Compliance Standard
                      </strong>
                      <span className="text-[11px] sm:text-xs">{stage.isoStandard}</span>
                    </div>
                  </div>
                )}
                {stage.maintenanceInterval && (
                  <div className="flex items-start gap-2.5 p-2.5 sm:p-3 border border-hairline-divider dark:border-[#2B2A2F] bg-[#F4F0E8] dark:bg-[#222226] text-charcoal-ink dark:text-[#F4F4F6]">
                    <span className="material-symbols-outlined text-base text-subtle-ash dark:text-[#8E8B85] mt-0.5 shrink-0">
                      build
                    </span>
                    <div>
                      <strong className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-subtle-ash dark:text-[#8E8B85] font-semibold">
                        Maintenance Schedule
                      </strong>
                      <span className="text-[11px] sm:text-xs">{stage.maintenanceInterval}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-4 hairline-t mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              {onSelectStage ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onSelectStage(prevStage)}
                    className="flex-1 sm:flex-initial px-3 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] border border-hairline-divider dark:border-[#2B2A2F] text-charcoal-ink dark:text-[#E4E4E7] hover:border-charcoal-ink dark:hover:border-white hover:bg-[#F4F0E8] dark:hover:bg-[#25252A] transition-colors cursor-pointer text-center"
                  >
                    ← Prev (0{prevStage.stageNumber})
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectStage(nextStage)}
                    className="flex-1 sm:flex-initial px-3 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] border border-hairline-divider dark:border-[#2B2A2F] text-charcoal-ink dark:text-[#E4E4E7] hover:border-charcoal-ink dark:hover:border-white hover:bg-[#F4F0E8] dark:hover:bg-[#25252A] transition-colors cursor-pointer text-center"
                  >
                    Next (0{nextStage.stageNumber}) →
                  </button>
                </div>
              ) : <div />}

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] border border-charcoal-ink dark:border-white/40 bg-charcoal-ink dark:bg-white text-[#FAF9F5] dark:text-[#121214] hover:bg-transparent dark:hover:bg-transparent hover:text-charcoal-ink dark:hover:text-white transition-colors cursor-pointer text-center font-medium"
              >
                Close Specification
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

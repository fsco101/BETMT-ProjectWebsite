import React, { useState, useEffect } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { SopStepperModal } from '../modals/SopStepperModal';
import { SopStepDetailModal } from '../modals/SopStepDetailModal';
import { SopStep } from '../../types/pneumatic';
import { useStickyCardStack } from '../../hooks/useStickyCardStack';
import { useLightbox } from '../../context/LightboxContext';

interface SopCategoryStackProps {
  cat: { title: string; steps: SopStep[] };
  onSelectStep: (step: SopStep) => void;
}

interface SopStepCardProps {
  step: SopStep;
  stepIdx: number;
  onSelectStep: (step: SopStep) => void;
}

const SopStepCard: React.FC<SopStepCardProps> = ({ step, stepIdx, onSelectStep }) => {
  const { openLightbox } = useLightbox();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const slideImgs = step.images && step.images.length > 0 ? step.images : [step.image];
  const slideCaps = step.imageCaptions || [];
  const hasMultiple = slideImgs.length > 1;

  // Auto-advance slideshow with pause on hover
  useEffect(() => {
    if (!hasMultiple || isHovered) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev < slideImgs.length - 1 ? prev + 1 : 0));
    }, 3500);

    return () => clearInterval(timer);
  }, [hasMultiple, isHovered, slideImgs.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : slideImgs.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev < slideImgs.length - 1 ? prev + 1 : 0));
  };

  const handleSelectDot = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultiple || touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentImageIndex((prev) => (prev < slideImgs.length - 1 ? prev + 1 : 0));
      } else {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : slideImgs.length - 1));
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      key={step.id}
      data-sticky-card
      data-card-id={step.id}
      style={{
        position: 'sticky',
        top: `calc(84px + ${stepIdx} * 12px)`,
        zIndex: 10 + stepIdx,
        transformOrigin: '50% 0'
      }}
      onClick={() => onSelectStep(step)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectStep(step);
        }
      }}
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] shadow-lg mb-6 overflow-hidden transition-all duration-300 group will-change-transform cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 flex flex-col justify-between p-5"
    >
      <div className="flex-1 flex flex-col min-h-0">
        {/* Image Stage Container with Slideshow */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(
              slideImgs.map((src, i) => ({
                src,
                title: `Step 0${step.stepNumber} — ${step.title} (Photo 0${i + 1} of 0${slideImgs.length})`,
                caption: slideCaps[i] || step.description,
              })),
              currentImageIndex
            );
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[16/10] sm:aspect-[4/3] max-h-[220px] sm:max-h-[260px] w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 mb-3 group/img cursor-zoom-in shrink-0 select-none"
          title="Click to view full uncropped photo"
        >
          {/* Active Image */}
          <img
            key={currentImageIndex}
            src={slideImgs[currentImageIndex]}
            alt={`${step.title} - Photo ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 animate-fadeIn"
          />

          {/* Stage / Step Badge */}
          <div className="absolute top-2 left-2 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-sm font-bold shadow-xs bg-[#16324F]/90 dark:bg-slate-900/90 text-white z-10 pointer-events-none">
            Step {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
          </div>

          {/* Multi-photo Counter Badge */}
          {hasMultiple && (
            <div className="absolute top-2 right-2 bg-slate-900/85 dark:bg-black/85 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold backdrop-blur-xs z-10 flex items-center gap-1 shadow-xs pointer-events-none font-mono">
              <span className="material-symbols-outlined text-[11px] leading-none">photo_library</span>
              <span>{currentImageIndex + 1} / {slideImgs.length}</span>
            </div>
          )}

          {/* Zoom Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-black/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">zoom_in</span>
              <span>Zoom</span>
            </span>
          </div>

          {/* Slideshow Navigation Controls */}
          {hasMultiple && (
            <>
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevImage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                  }
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/70 hover:bg-slate-900/95 dark:bg-black/70 dark:hover:bg-black/95 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover/img:opacity-100 shadow-md hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                aria-label="Previous photo"
                title="Previous photo"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextImage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/70 hover:bg-slate-900/95 dark:bg-black/70 dark:hover:bg-black/95 text-white flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover/img:opacity-100 shadow-md hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                aria-label="Next photo"
                title="Next photo"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-2 inset-x-0 z-20 flex items-center justify-center pointer-events-auto">
                <div className="bg-slate-900/75 dark:bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  {slideImgs.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => handleSelectDot(e, dotIdx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                        }
                      }}
                      aria-label={`Go to photo ${dotIdx + 1}`}
                      className={`transition-all rounded-full cursor-pointer ${
                        dotIdx === currentImageIndex
                          ? 'w-4 h-1.5 bg-amber-400 dark:bg-amber-300'
                          : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="min-h-0 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-bold text-base sm:text-lg block mb-1 leading-snug transition-colors text-[#16324F] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}. {step.title}
            </h4>
            <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 block font-semibold mb-2">
              {step.badgePrimary} {step.badgeSecondary ? `· ${step.badgeSecondary}` : ''}
            </span>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-3">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {/* Technical Metric / Safety Check Footer Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] uppercase tracking-wider font-mono shrink-0">
        <span className="text-slate-500 dark:text-slate-400 truncate pr-2">
          VERIFICATION CRITERIA:
        </span>
        <span className="font-bold shrink-0 text-[#16324F] dark:text-white truncate max-w-[65%] text-right">
          {step.verificationCriteria}
        </span>
      </div>
    </div>
  );
};

const SopCategoryStack: React.FC<SopCategoryStackProps> = ({
  cat,
  onSelectStep
}) => {
  const { containerRef } = useStickyCardStack(cat.steps.length, {
    baseTop: 84,
    stepOffset: 12,
    scaleFactor: 0.03
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl sm:max-w-3xl mx-auto">
      <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16324F] dark:bg-white" />
          <h3 className="font-sans font-bold text-base sm:text-lg uppercase tracking-tight text-[#16324F] dark:text-white">
            {cat.title}
          </h3>
        </div>
        <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold font-mono">
          {cat.steps.length} Steps
        </span>
      </div>

      {/* Sticky Card Stack Container (Interactive.md Item 4) */}
      <div ref={containerRef} className="relative">
        {cat.steps.map((step, stepIdx) => (
          <SopStepCard
            key={step.id}
            step={step}
            stepIdx={stepIdx}
            onSelectStep={onSelectStep}
          />
        ))}
        {/* Tail spacer element (Interactive.md Item 4) */}
        <div className="h-[40vh]" aria-hidden="true" />
      </div>
    </div>
  );
};

export const SopSection: React.FC = () => {
  const [stepperOpen, setStepperOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<SopStep | null>(null);

  const categories = [
    { title: 'A. COMPRESSOR START UP', steps: sopSteps.filter(s => s.category === 'A. COMPRESSOR START UP') },
    { title: 'B. OPERATING PROCEDURE', steps: sopSteps.filter(s => s.category === 'B. OPERATING PROCEDURE') },
    { title: 'D. SHUTTING DOWN AND STORING THE EQUIPMENT', steps: sopSteps.filter(s => s.category === 'D. SHUTTING DOWN AND STORING') },
  ];

  // Global step navigation inside modal
  const currentStepIndex = selectedStep ? sopSteps.findIndex(s => s.id === selectedStep.id) : -1;

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setSelectedStep(sopSteps[currentStepIndex - 1]);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < sopSteps.length - 1) {
      setSelectedStep(sopSteps[currentStepIndex + 1]);
    }
  };

  return (
    <section id="sop" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2 font-semibold">
            STEP BY STEP PROTOCOL
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#16324F] dark:text-white">
            STANDARD OPERATING PROCEDURE
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
          <button
            type="button"
            onClick={() => setStepperOpen(true)}
            className="motion-press inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#16324F] dark:bg-white text-white dark:text-[#16324F] hover:bg-[#0E2135] dark:hover:bg-slate-100 transition-colors text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
          >
            <span>Launch Interactive Stepper</span>
            <span className="text-amber-400 dark:text-[#16324F]">→</span>
          </button>
        </div>
      </div>

      {/* Categorized Step Flow with Sticky Card Stacks (Interactive.md Item 4) */}
      <div className="space-y-12 sm:space-y-16">
        {categories.map((cat, idx) => (
          <SopCategoryStack
            key={idx}
            cat={cat}
            onSelectStep={setSelectedStep}
          />
        ))}
      </div>

      {/* Step Detail Modal */}
      <SopStepDetailModal
        step={selectedStep}
        onClose={() => setSelectedStep(null)}
        onPrev={handlePrevStep}
        onNext={handleNextStep}
        onLaunchTraining={() => setStepperOpen(true)}
        currentIndex={currentStepIndex}
        totalCount={sopSteps.length}
      />

      {/* Interactive Stepper Wizard Modal */}
      <SopStepperModal
        isOpen={stepperOpen}
        onClose={() => setStepperOpen(false)}
      />
    </section>
  );
};

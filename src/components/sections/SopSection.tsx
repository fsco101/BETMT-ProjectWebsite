import React, { useState } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { SopStepperModal } from '../modals/SopStepperModal';
import { SopVerificationModal } from '../modals/SopVerificationModal';
import { SopStep } from '../../types/pneumatic';
import { useLightbox } from '../../context/LightboxContext';

export const SopSection: React.FC = () => {
  const [stepperOpen, setStepperOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const { openLightbox } = useLightbox();
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({
    'step-01': true,
    'step-05': true,
    'step-13': true,
  });

  const toggleStep = (id: string) => {
    setOpenSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStepperComplete = () => {
    setStepperOpen(false);
    setCertModalOpen(true);
  };

  const categories = [
    { title: 'A. COMPRESSOR START UP', steps: sopSteps.filter(s => s.category === 'A. COMPRESSOR START UP') },
    { title: 'B. OPERATING PROCEDURE', steps: sopSteps.filter(s => s.category === 'B. OPERATING PROCEDURE') },
    { title: 'D. SHUTTING DOWN AND STORING THE EQUIPMENT', steps: sopSteps.filter(s => s.category === 'D. SHUTTING DOWN AND STORING') },
  ];

  const renderStepCard = (step: SopStep) => {
    const isOpen = openSteps[step.id];
    const figures = step.images && step.images.length > 0 ? step.images : [step.image];
    const captions = step.imageCaptions || [];

    return (
      <div
        key={step.id}
        className="motion-card rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] shadow-2xs overflow-hidden transition-all duration-200 group"
      >
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleStep(step.id)}
          className="w-full text-left p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
            <span className="font-mono font-bold text-xl sm:text-2xl text-[#16324F] dark:text-sky-400 shrink-0 w-8 sm:w-10">
              {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-sans font-bold text-sm sm:text-base lg:text-lg uppercase tracking-tight text-[#16324F] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-normal mt-1 max-w-3xl leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 self-stretch md:self-auto border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-2 md:pt-0">
            <div className="flex flex-col items-start md:items-end text-[10px] uppercase tracking-wider font-mono">
              <span className="font-bold text-[#16324F] dark:text-white">{step.badgePrimary}</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">{step.badgeSecondary}</span>
            </div>
            <span className={`w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-slate-100 dark:bg-slate-800' : ''}`}>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </span>
          </div>
        </button>

        {/* Expanded Drawer / Visual Figures */}
        {isOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238] p-4 sm:p-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Visual Figures Grid (Proportional Aspect Ratios) */}
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
                      className="relative overflow-hidden rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 aspect-[4/3] group/fig cursor-zoom-in shadow-xs"
                      title="Click to view full uncropped figure"
                    >
                      <img
                        src={imgSrc}
                        alt={captions[idx] || `Figure ${idx + 1}`}
                        className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover/fig:scale-105"
                      />
                      <div className="absolute bottom-1.5 left-1.5 bg-[#16324F]/90 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold backdrop-blur-xs">
                        Figure 0{idx + 1}
                      </div>
                      <div className="absolute inset-0 bg-[#16324F]/20 opacity-0 group-hover/fig:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-black/80 text-white text-[9px] uppercase tracking-wider px-2 py-1 rounded-xs flex items-center gap-1">
                          <span>🔍</span>
                          <span>Zoom</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {captions.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {captions.map((cap, idx) => (
                      <p key={idx} className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-snug">
                        <span className="text-amber-600 font-bold">•</span> {cap}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Step Verification & Protocol Rules */}
              <div className="lg:col-span-6 flex flex-col justify-between self-stretch bg-white dark:bg-[#0E2135] p-5 rounded-md border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block mb-1">
                      Verification Standard
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-white font-normal leading-relaxed">
                      {step.verificationCriteria}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase tracking-wider text-[#B42318] dark:text-red-400 font-bold block mb-1">
                      Critical Operating Rule
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                      {step.keySafetyRule}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  <span>Step 0{step.stepNumber} of 15</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">Standard Certified</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
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

      {/* Accordion Categorized Step Flow */}
      <div className="space-y-10 sm:space-y-12">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-3 sm:space-y-4">
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

            <div className="space-y-3">
              {cat.steps.map((step) => renderStepCard(step))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Stepper Wizard */}
      <SopStepperModal
        isOpen={stepperOpen}
        onClose={() => setStepperOpen(false)}
        onComplete={handleStepperComplete}
      />

      {/* Safety Compliance Certification Modal */}
      <SopVerificationModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />
    </section>
  );
};

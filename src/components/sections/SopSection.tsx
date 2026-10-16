import React, { useState } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { SopStepperModal } from '../modals/SopStepperModal';
import { SopVerificationModal } from '../modals/SopVerificationModal';
import { SopStep } from '../../types/pneumatic';

export const SopSection: React.FC = () => {
  const [stepperOpen, setStepperOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({
    'step-01': true,
    'step-04': true,
    'step-09': true,
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
        className="hairline-all bg-[#FAF9F5] dark:bg-[#1A1A1E] hover:bg-[#F4F0E8]/50 dark:hover:bg-[#222226] transition-colors group"
      >
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleStep(step.id)}
          className="w-full text-left p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-6 flex-1">
            <span className="font-mono font-bold text-xl sm:text-2xl lg:text-3xl text-charcoal-ink dark:text-[#F4F4F6] shrink-0 w-8 sm:w-10">
              {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
            </span>
            <div className="flex-1">
              <h4 className="font-sans font-bold text-base sm:text-lg lg:text-xl uppercase tracking-tight text-charcoal-ink dark:text-[#F4F4F6] group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-muted-charcoal dark:text-[#A1A1AA] font-light mt-1 max-w-3xl leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 self-stretch md:self-auto border-t md:border-t-0 hairline-t md:border-none pt-2 md:pt-0">
            <div className="flex flex-col items-start md:items-end text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.16em]">
              <span className="font-medium text-charcoal-ink dark:text-[#F4F4F6]">{step.badgePrimary}</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-medium">{step.badgeSecondary}</span>
            </div>
            <span className={`w-7 h-7 rounded-full border border-charcoal-ink/20 dark:border-white/20 text-charcoal-ink dark:text-white flex items-center justify-center transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </span>
          </div>
        </button>

        {/* Expanded Drawer / Visual Figures */}
        {isOpen && (
          <div className="hairline-t border-hairline-divider dark:border-[#2B2A2F] bg-[#F4F0E8]/60 dark:bg-[#202024] p-4 sm:p-7 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Visual Figures Grid */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {figures.map((imgSrc, idx) => (
                    <div key={idx} className="relative overflow-hidden hairline-all bg-[#ECE8DF] dark:bg-[#2A2930] aspect-[4/3] group/fig">
                      <img
                        src={imgSrc}
                        alt={captions[idx] || `Figure ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/fig:scale-105"
                      />
                      <div className="absolute bottom-1.5 left-1.5 bg-charcoal-ink/85 dark:bg-black/85 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5">
                        Figure {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
                {captions.length > 0 && (
                  <div className="space-y-1">
                    {captions.map((cap, idx) => (
                      <p key={idx} className="text-[11px] text-muted-charcoal dark:text-[#A1A1AA] font-medium leading-snug">
                        • {cap}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Step Verification & Protocol Rules */}
              <div className="lg:col-span-6 flex flex-col justify-between self-stretch bg-white dark:bg-[#1A1A1E] p-5 border border-hairline-divider dark:border-[#2B2A2F]">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-[#8E8B85] block mb-1">
                      Verification Standard
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal-ink dark:text-[#F4F4F6] font-normal leading-relaxed">
                      {step.verificationCriteria}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-hairline-divider/60 dark:border-[#2B2A2F]">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-accent-crimson dark:text-red-400 font-semibold block mb-1">
                      Critical Workshop Rule
                    </span>
                    <p className="text-xs text-muted-charcoal dark:text-[#A1A1AA] font-normal leading-relaxed">
                      {step.keySafetyRule}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-hairline-divider/40 dark:border-[#2B2A2F] flex items-center justify-between text-[10px] uppercase tracking-wider text-subtle-ash dark:text-[#8E8B85]">
                  <span>Step 0{step.stepNumber} of 15</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-semibold">TUP-T Certified SOP</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="sop" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash dark:text-[#8E8B85] block mb-2 font-medium">
            STEP BY STEP
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-charcoal-ink dark:text-[#F4F4F6]">
            STANDARD OPERATING PROCEDURE
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
          <button
            type="button"
            onClick={() => setStepperOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 border border-charcoal-ink dark:border-white/40 bg-charcoal-ink dark:bg-white text-[#FAF9F5] dark:text-[#121214] hover:bg-transparent dark:hover:bg-transparent hover:text-charcoal-ink dark:hover:text-white transition-colors text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] w-full sm:w-auto font-medium"
          >
            <span>Launch Interactive Stepper</span>
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>

      {/* Accordion Categorized Step Flow */}
      <div className="space-y-10 sm:space-y-14">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between pb-2 hairline-b">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-charcoal-ink dark:bg-white" />
                <h3 className="font-sans font-bold text-base sm:text-xl uppercase tracking-tight text-charcoal-ink dark:text-[#F4F4F6]">
                  {cat.title}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-subtle-ash dark:text-[#8E8B85]">
                {cat.steps.length} Steps
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
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

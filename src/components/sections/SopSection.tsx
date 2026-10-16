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
        className="hairline-all bg-[#FAF9F5] hover:bg-[#F4F0E8]/50 transition-colors group"
      >
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleStep(step.id)}
          className="w-full text-left p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-6 flex-1">
            <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-charcoal-ink shrink-0 w-8 sm:w-10">
              {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
            </span>
            <div className="flex-1">
              <h4 className="font-editorial text-base sm:text-lg lg:text-xl uppercase tracking-wider text-charcoal-ink group-hover:text-emerald-900 transition-colors leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-muted-charcoal font-light mt-1 max-w-3xl leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 self-stretch md:self-auto border-t md:border-t-0 hairline-t md:border-none pt-2 md:pt-0">
            <div className="flex flex-col items-start md:items-end text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.16em]">
              <span className="font-medium text-charcoal-ink">{step.badgePrimary}</span>
              <span className="text-emerald-800 font-medium">{step.badgeSecondary}</span>
            </div>
            <span className={`w-7 h-7 rounded-full border border-charcoal-ink/20 flex items-center justify-center text-charcoal-ink transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </span>
          </div>
        </button>

        {/* Expanded Drawer / Visual Figures */}
        {isOpen && (
          <div className="hairline-t border-hairline-divider bg-[#F4F0E8]/60 p-4 sm:p-7 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Visual Figures Grid */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {figures.map((imgSrc, idx) => (
                    <div key={idx} className="relative overflow-hidden hairline-all bg-[#ECE8DF] aspect-[4/3] group/fig">
                      <img
                        src={imgSrc}
                        alt={captions[idx] || `Figure ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/fig:scale-105"
                      />
                      <div className="absolute bottom-1.5 left-1.5 bg-charcoal-ink/85 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5">
                        Figure {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
                {captions.length > 0 && (
                  <div className="space-y-1">
                    {captions.map((cap, idx) => (
                      <p key={idx} className="text-[11px] text-muted-charcoal font-medium leading-snug">
                        • {cap}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Step Verification & Protocol Rules */}
              <div className="lg:col-span-6 flex flex-col justify-between self-stretch bg-white p-5 border border-hairline-divider">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-subtle-ash block mb-1">
                      Verification Standard
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal-ink font-normal leading-relaxed">
                      {step.verificationCriteria}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-hairline-divider/60">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-accent-crimson font-semibold block mb-1">
                      Critical Workshop Rule
                    </span>
                    <p className="text-xs text-muted-charcoal font-normal leading-relaxed">
                      {step.keySafetyRule}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-hairline-divider/40 flex items-center justify-between text-[10px] uppercase tracking-wider text-subtle-ash">
                  <span>Step 0{step.stepNumber} of 15</span>
                  <span className="text-emerald-800 font-semibold">TUP-T Certified SOP</span>
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
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash block mb-2 font-medium">
            STEP BY STEP
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            STANDARD OPERATING PROCEDURE
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
          <button
            type="button"
            onClick={() => setStepperOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 border border-charcoal-ink bg-charcoal-ink text-[#FAF9F5] hover:bg-transparent hover:text-charcoal-ink transition-colors text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] w-full sm:w-auto font-medium"
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
                <span className="w-2.5 h-2.5 rounded-full bg-charcoal-ink" />
                <h3 className="font-editorial text-base sm:text-xl uppercase tracking-wider text-charcoal-ink">
                  {cat.title}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-subtle-ash">
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

import React, { useState } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { SopStepperModal } from '../modals/SopStepperModal';
import { SopVerificationModal } from '../modals/SopVerificationModal';

export const SopSection: React.FC = () => {
  const [stepperOpen, setStepperOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const handleStepperComplete = () => {
    setStepperOpen(false);
    setCertModalOpen(true);
  };

  return (
    <section id="sop" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
            Standard Operating Procedure
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            THE 7-STEP OPERATING PROCEDURE
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-subtle-ash">
            Ref: SOP-PNEU-REV-04 · Step-by-Step Illustrated Protocol
          </span>
          <button
            type="button"
            onClick={() => setStepperOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 border border-charcoal-ink bg-charcoal-ink text-[#FAF9F5] hover:bg-transparent hover:text-charcoal-ink transition-colors text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] w-full sm:w-auto"
          >
            <span>Launch Interactive Stepper</span>
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>

      {/* 7 Illustrated Step Cards */}
      <div className="space-y-4 sm:space-y-6">
        {sopSteps.map((step) => (
          <div
            key={step.id}
            className="hairline-all bg-[#FAF9F5] p-4 sm:p-7 lg:p-8 hover:bg-[#F4F0E8] transition-colors group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
              
              {/* Step Image */}
              <div className="md:col-span-4 lg:col-span-3">
                <div className="relative aspect-[16/10] overflow-hidden hairline-all bg-[#ECE8DF]">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-charcoal-ink/80 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5">
                    Step 0{step.stepNumber} Verification
                  </div>
                </div>
              </div>

              {/* Step Copy */}
              <div className="md:col-span-8 lg:col-span-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-1.5 sm:mb-2">
                  <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-charcoal-ink">
                    0{step.stepNumber}
                  </span>
                  <h3 className="font-editorial text-base sm:text-lg lg:text-xl uppercase tracking-wider text-charcoal-ink leading-snug">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-charcoal font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Metadata Badges */}
              <div className="md:col-span-12 lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-subtle-ash border-t lg:border-t-0 lg:border-l hairline-t lg:hairline-l pt-3 lg:pt-0 lg:pl-6">
                <span className="font-medium text-charcoal-ink">{step.badgePrimary}</span>
                <span className="mt-0.5 sm:mt-1 text-emerald-800 font-medium">{step.badgeSecondary}</span>
              </div>

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

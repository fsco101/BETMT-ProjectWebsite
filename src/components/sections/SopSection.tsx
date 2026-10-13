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
    <section id="sop" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 hairline-b pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
            Standard Operating Procedure
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            THE 7-STEP OPERATING PROCEDURE
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-subtle-ash">
            Ref: SOP-PNEU-REV-04 · Step-by-Step Illustrated Protocol
          </span>
          <button
            type="button"
            onClick={() => setStepperOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-charcoal-ink bg-charcoal-ink text-[#FAF9F5] hover:bg-transparent hover:text-charcoal-ink transition-colors text-[10px] uppercase tracking-[0.2em]"
          >
            <span>Launch Interactive Stepper</span>
            <span className="text-xs">→</span>
          </button>
        </div>
      </div>

      {/* 7 Illustrated Step Cards */}
      <div className="space-y-6">
        {sopSteps.map((step) => (
          <div
            key={step.id}
            className="hairline-all bg-[#FAF9F5] p-6 sm:p-8 hover:bg-[#F4F0E8] transition-colors group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Step Image */}
              <div className="lg:col-span-3">
                <div className="relative aspect-[16/10] overflow-hidden hairline-all bg-[#ECE8DF]">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-charcoal-ink/80 text-white text-[9px] uppercase tracking-wider px-2 py-0.5">
                    Step 0{step.stepNumber} Verification
                  </div>
                </div>
              </div>

              {/* Step Copy */}
              <div className="lg:col-span-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-editorial text-2xl sm:text-3xl text-charcoal-ink">
                    0{step.stepNumber}
                  </span>
                  <h3 className="font-editorial text-lg sm:text-xl uppercase tracking-wider text-charcoal-ink">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-charcoal font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Metadata Badges */}
              <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-[10px] uppercase tracking-[0.18em] text-subtle-ash border-t lg:border-t-0 lg:border-l hairline-l pt-3 lg:pt-0 lg:pl-6">
                <span className="font-medium text-charcoal-ink">{step.badgePrimary}</span>
                <span className="mt-1 text-emerald-800">{step.badgeSecondary}</span>
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

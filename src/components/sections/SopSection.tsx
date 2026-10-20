import React, { useState } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { SopStepperModal } from '../modals/SopStepperModal';
import { SopStepDetailModal } from '../modals/SopStepDetailModal';
import { SopStep } from '../../types/pneumatic';
import { useStickyCardStack } from '../../hooks/useStickyCardStack';

interface SopCategoryStackProps {
  cat: { title: string; steps: SopStep[] };
  onSelectStep: (step: SopStep) => void;
}

const SopCategoryStack: React.FC<SopCategoryStackProps> = ({
  cat,
  onSelectStep
}) => {
  const { containerRef } = useStickyCardStack(cat.steps.length, {
    baseTop: 80,
    stepOffset: 10,
    scaleFactor: 0.03
  });

  return (
    <div className="space-y-3 sm:space-y-4">
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
        {cat.steps.map((step, stepIdx) => {
          return (
            <div
              key={step.id}
              data-sticky-card
              data-card-id={step.id}
              style={{
                position: 'sticky',
                top: `calc(84px + ${stepIdx} * 10px)`,
                zIndex: 10 + stepIdx,
                transformOrigin: '50% 0'
              }}
              className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] shadow-md mb-4 overflow-hidden transition-transform duration-200 group will-change-transform"
            >
              {/* Card Trigger */}
              <button
                type="button"
                onClick={() => onSelectStep(step)}
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

                <div className="flex items-center justify-between md:justify-end gap-3 self-stretch md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs bg-[#F1F5F9] dark:bg-[#162238] border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold">
                    Step {step.stepNumber}
                  </span>
                  <span className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors duration-200 shrink-0 group-hover:border-[#16324F] dark:group-hover:border-white">
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </span>
                </div>
              </button>
            </div>
          );
        })}
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

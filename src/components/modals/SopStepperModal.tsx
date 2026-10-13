import React, { useState } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { usePneumatics } from '../../context/PneumaticContext';
import { playValveClickSound } from '../../utils/audio';

interface SopStepperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SopStepperModal: React.FC<SopStepperModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [verifiedSteps, setVerifiedSteps] = useState<Record<number, boolean>>({});
  const { state } = usePneumatics();

  if (!isOpen) return null;

  const step = sopSteps[currentStepIndex];
  const isCurrentVerified = !!verifiedSteps[currentStepIndex];
  const isLastStep = currentStepIndex === sopSteps.length - 1;

  const handleNext = () => {
    if (state.audioEnabled) playValveClickSound();
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (state.audioEnabled) playValveClickSound();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleVerification = () => {
    setVerifiedSteps(prev => ({
      ...prev,
      [currentStepIndex]: !prev[currentStepIndex],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-ink/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-[#FAF9F5] shadow-2xl hairline-all z-10 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-[#F1EDE5]">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 border border-charcoal-ink flex items-center justify-center font-editorial text-xs">
              LM
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash block">
                Interactive Safety Training Module
              </span>
              <h3 className="font-editorial text-base sm:text-lg uppercase tracking-wider text-charcoal-ink">
                Step {step.stepNumber} of {sopSteps.length}: {step.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 border border-charcoal-ink/30 flex items-center justify-center hover:bg-charcoal-ink hover:text-[#FAF9F5] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#DCD7CD]">
          <div
            className="h-full bg-charcoal-ink transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / sopSteps.length) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-5 relative aspect-[16/10] overflow-hidden hairline-all bg-[#ECE8DF]">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-charcoal-ink/85 text-white text-[9px] uppercase tracking-wider px-2 py-0.5">
                Step 0{step.stepNumber} Visual
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-800 font-medium block">
                {step.badgePrimary}
              </span>
              <p className="text-xs sm:text-sm text-muted-charcoal leading-relaxed font-light">
                {step.description}
              </p>
              <div className="p-3 bg-[#F4F0E8] hairline-all text-xs space-y-1.5">
                <div>
                  <strong className="text-[10px] uppercase tracking-wider text-subtle-ash block">Mandatory Verification Checklist:</strong>
                  <span className="text-charcoal-ink font-light">{step.verificationCriteria}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Key Safety Rule Alert */}
          <div className="p-4 border-l-4 border-l-accent-crimson bg-[#FDF7F5] hairline-all border-l-transparent text-xs text-charcoal-ink flex items-start gap-3">
            <span className="material-symbols-outlined text-base text-accent-crimson mt-0.5">warning</span>
            <div>
              <strong className="block text-[10px] uppercase tracking-wider text-accent-crimson font-semibold">Critical Operating Rule</strong>
              <span className="font-light">{step.keySafetyRule}</span>
            </div>
          </div>

          {/* Verification Confirmation Checkbox */}
          <label className="flex items-center gap-3 p-4 hairline-all bg-[#FAF9F5] hover:bg-[#F4F0E8] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={isCurrentVerified}
              onChange={toggleVerification}
              className="w-4 h-4 text-charcoal-ink rounded-none border-charcoal-ink focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-charcoal-ink font-medium select-none">
              I have verified the safety condition for Step 0{step.stepNumber} ({step.badgePrimary})
            </span>
          </label>
        </div>

        {/* Stepper Footer Controls */}
        <div className="p-6 hairline-t bg-[#FAF9F5] flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-5 py-2 text-[11px] uppercase tracking-[0.18em] border border-charcoal-ink transition-colors ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-charcoal-ink hover:text-[#FAF9F5]'
            }`}
          >
            ← Previous Step
          </button>

          <span className="text-[11px] uppercase tracking-[0.2em] text-subtle-ash hidden sm:inline">
            Step {currentStepIndex + 1} of {sopSteps.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentVerified}
            className={`px-6 py-2 text-[11px] uppercase tracking-[0.18em] border transition-all ${
              isCurrentVerified
                ? isLastStep
                  ? 'bg-emerald-800 text-white border-emerald-800 hover:bg-emerald-900'
                  : 'bg-charcoal-ink text-white border-charcoal-ink hover:bg-transparent hover:text-charcoal-ink'
                : 'opacity-40 border-charcoal-ink cursor-not-allowed bg-gray-200'
            }`}
          >
            {isLastStep ? 'Complete & Issue Pass ✓' : 'Next Step →'}
          </button>
        </div>

      </div>
    </div>
  );
};

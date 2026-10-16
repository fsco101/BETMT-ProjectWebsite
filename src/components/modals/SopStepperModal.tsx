import React, { useState } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { usePneumatics } from '../../context/PneumaticContext';
import { useLightbox } from '../../context/LightboxContext';
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
  const { openLightbox } = useLightbox();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-ink/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-[#FAF9F5] dark:bg-[#18181B] shadow-2xl hairline-all z-10 overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-6 hairline-b flex items-center justify-between bg-[#F1EDE5] dark:bg-[#202024] gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash dark:text-gray-400 block">
                Interactive Safety Training Module
              </span>
              <h3 className="font-sans font-bold text-sm sm:text-base md:text-lg uppercase tracking-tight text-charcoal-ink dark:text-gray-100 leading-tight">
                Step {step.stepNumber} of {sopSteps.length}: {step.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 border border-charcoal-ink/30 dark:border-gray-600 text-charcoal-ink dark:text-gray-200 flex items-center justify-center hover:bg-charcoal-ink hover:text-[#FAF9F5] dark:hover:bg-white dark:hover:text-black transition-colors shrink-0 text-xs sm:text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#DCD7CD] dark:bg-[#3F3F46]">
          <div
            className="h-full bg-charcoal-ink dark:bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / sopSteps.length) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            
            <div
              onClick={() =>
                openLightbox(
                  step.image,
                  0,
                  `Step 0${step.stepNumber}: ${step.title}`,
                  step.description
                )
              }
              className="md:col-span-5 relative aspect-[16/10] overflow-hidden hairline-all bg-[#ECE8DF] dark:bg-[#27272A] cursor-zoom-in group/stepimg"
              title="Click to view full uncropped visual"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/stepimg:scale-105"
              />
              <div className="absolute top-2 left-2 bg-charcoal-ink/85 dark:bg-black/80 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5">
                Step 0{step.stepNumber} Visual
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover/stepimg:bg-black/25 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/stepimg:opacity-100 bg-black/80 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 transition-opacity border border-white/20 shadow-xs flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                  <span>View</span>
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-2.5 sm:space-y-3">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 font-medium block">
                {step.badgePrimary}
              </span>
              <p className="text-xs sm:text-sm text-muted-charcoal dark:text-gray-300 leading-relaxed font-light">
                {step.description}
              </p>
              <div className="p-3 bg-[#F4F0E8] dark:bg-[#202024] hairline-all text-xs space-y-1">
                <strong className="text-[9px] sm:text-[10px] uppercase tracking-wider text-subtle-ash dark:text-gray-400 block">Mandatory Verification Checklist:</strong>
                <span className="text-charcoal-ink dark:text-gray-200 font-light leading-relaxed block">{step.verificationCriteria}</span>
              </div>
            </div>

          </div>

          {/* Key Safety Rule Alert */}
          <div className="p-3.5 sm:p-4 border-l-4 border-l-accent-crimson bg-[#FDF7F5] dark:bg-rose-950/20 hairline-all text-xs text-charcoal-ink dark:text-gray-200 flex items-start gap-2.5 sm:gap-3">
            <span className="material-symbols-outlined text-base text-accent-crimson dark:text-rose-400 mt-0.5 shrink-0">warning</span>
            <div>
              <strong className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-accent-crimson dark:text-rose-400 font-semibold">Critical Operating Rule</strong>
              <span className="font-light">{step.keySafetyRule}</span>
            </div>
          </div>

          {/* Verification Confirmation Checkbox */}
          <label className="flex items-start sm:items-center gap-3 p-3.5 sm:p-4 hairline-all bg-[#FAF9F5] dark:bg-[#202024] hover:bg-[#F4F0E8] dark:hover:bg-[#27272A] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={isCurrentVerified}
              onChange={toggleVerification}
              className="mt-0.5 sm:mt-0 w-4 h-4 text-charcoal-ink dark:text-emerald-500 rounded-none border-charcoal-ink dark:border-gray-600 focus:ring-0 cursor-pointer shrink-0"
            />
            <span className="text-xs text-charcoal-ink dark:text-gray-200 font-medium select-none leading-snug">
              I have verified the safety condition for Step 0{step.stepNumber} ({step.badgePrimary})
            </span>
          </label>
        </div>

        {/* Stepper Footer Controls */}
        <div className="p-4 sm:p-6 hairline-t bg-[#FAF9F5] dark:bg-[#202024] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-3 sm:px-5 py-2 text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] border border-charcoal-ink dark:border-gray-500 text-charcoal-ink dark:text-gray-200 transition-colors whitespace-nowrap cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-charcoal-ink hover:text-[#FAF9F5] dark:hover:bg-white dark:hover:text-black'
            }`}
          >
            ← Prev
          </button>

          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-subtle-ash dark:text-gray-400 text-center font-mono">
            {currentStepIndex + 1} / {sopSteps.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentVerified}
            className={`px-3 sm:px-6 py-2 text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] border transition-all whitespace-nowrap cursor-pointer ${
              isCurrentVerified
                ? isLastStep
                  ? 'bg-emerald-800 dark:bg-emerald-600 text-white border-emerald-800 dark:border-emerald-600 hover:bg-emerald-900'
                  : 'bg-charcoal-ink dark:bg-emerald-600 text-white border-charcoal-ink dark:border-emerald-500 hover:bg-black dark:hover:bg-emerald-700'
                : 'opacity-40 border-charcoal-ink dark:border-gray-700 cursor-not-allowed bg-gray-200 dark:bg-gray-800 text-gray-500'
            }`}
          >
            {isLastStep ? 'Complete Pass ✓' : 'Next Step →'}
          </button>
        </div>

      </div>
    </div>
  );
};

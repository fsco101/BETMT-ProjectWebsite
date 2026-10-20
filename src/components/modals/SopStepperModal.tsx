import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && verifiedSteps[currentStepIndex]) {
        if (currentStepIndex === sopSteps.length - 1) {
          onComplete();
        } else {
          setCurrentStepIndex(prev => prev + 1);
        }
      }
      if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onComplete, currentStepIndex, verifiedSteps]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0E2135] text-slate-800 dark:text-slate-100 shadow-2xl rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-scaleUp transition-colors my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sop-stepper-title"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-[#F8FAFC] dark:bg-[#162238] gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm font-bold shrink-0">
              Step 0{step.stepNumber} / 0{sopSteps.length}
            </span>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block truncate">
                Interactive Safety Training Module
              </span>
              <h3
                id="sop-stepper-title"
                className="font-sans font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight"
              >
                {step.title}
              </h3>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-amber-500 dark:bg-sky-400 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / sopSteps.length) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 min-h-0">
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
              className="md:col-span-5 relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 cursor-zoom-in group/stepimg"
              title="Click to view full uncropped visual"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/stepimg:scale-105"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 dark:bg-black/80 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm">
                Step 0{step.stepNumber} Visual
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover/stepimg:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/stepimg:opacity-100 bg-black/80 text-white text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm transition-opacity border border-white/20 shadow-md flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs">zoom_in</span>
                  <span>View</span>
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-2.5 sm:space-y-3">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
                {step.badgePrimary}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {step.description}
              </p>
              <div className="p-3.5 bg-slate-50 dark:bg-[#162238]/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <strong className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                  Mandatory Verification Checklist:
                </strong>
                <span className="text-slate-700 dark:text-slate-200 font-light leading-relaxed block">
                  {step.verificationCriteria}
                </span>
              </div>
            </div>

          </div>

          {/* Key Safety Rule Alert */}
          <div className="p-3.5 sm:p-4 rounded-lg border-l-4 border-l-red-500 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-base text-red-600 dark:text-red-400 mt-0.5 shrink-0">
              warning
            </span>
            <div>
              <strong className="block text-[10px] sm:text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-bold">
                Critical Operating Rule
              </strong>
              <span className="font-light text-slate-700 dark:text-slate-300 leading-relaxed">
                {step.keySafetyRule}
              </span>
            </div>
          </div>

          {/* Verification Confirmation Checkbox */}
          <label className="flex items-start sm:items-center gap-3 p-3.5 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162238]/60 hover:bg-slate-100 dark:hover:bg-[#162238] cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={isCurrentVerified}
              onChange={toggleVerification}
              className="mt-0.5 sm:mt-0 w-4 h-4 text-emerald-600 rounded border-slate-300 dark:border-slate-700 focus:ring-emerald-500 cursor-pointer shrink-0"
            />
            <span className="text-xs text-slate-700 dark:text-slate-200 font-medium select-none leading-snug">
              I have verified the safety condition for Step 0{step.stepNumber} ({step.badgePrimary})
            </span>
          </label>
        </div>

        {/* Stepper Footer Controls */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-3.5 sm:px-5 py-2 rounded-lg text-[10px] sm:text-xs uppercase tracking-wider font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ← Prev
          </button>

          <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center font-mono font-bold">
            {currentStepIndex + 1} / {sopSteps.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentVerified}
            className={`px-4 sm:px-6 py-2 rounded-lg text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm ${
              isCurrentVerified
                ? isLastStep
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                  : 'bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] hover:bg-[#0E2135] dark:hover:bg-sky-400'
                : 'opacity-40 border border-slate-200 dark:border-slate-800 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {isLastStep ? 'Complete Pass ✓' : 'Next Step →'}
          </button>
        </div>

      </div>
    </div>
  );
};


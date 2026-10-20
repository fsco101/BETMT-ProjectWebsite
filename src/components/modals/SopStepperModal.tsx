import React, { useState, useEffect } from 'react';
import { sopSteps } from '../../data/sopSteps';
import { usePneumatics } from '../../context/PneumaticContext';
import { useLightbox } from '../../context/LightboxContext';
import { playValveClickSound } from '../../utils/audio';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface SopStepperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const SopStepperModal: React.FC<SopStepperModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [verifiedSteps, setVerifiedSteps] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { state } = usePneumatics();
  const { openLightbox } = useLightbox();

  // Safe reference-counted body scroll locking
  useBodyScrollLock(isOpen);

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setVerifiedSteps({});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isCompleted && e.key === 'ArrowRight' && verifiedSteps[currentStepIndex]) {
        if (currentStepIndex === sopSteps.length - 1) {
          setIsCompleted(true);
          onComplete?.();
        } else {
          setCurrentStepIndex(prev => prev + 1);
        }
      }
      if (!isCompleted && e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onComplete, currentStepIndex, verifiedSteps, isCompleted]);

  if (!isOpen) return null;

  const step = sopSteps[currentStepIndex];
  const isCurrentVerified = !!verifiedSteps[currentStepIndex];
  const isLastStep = currentStepIndex === sopSteps.length - 1;

  const handleNext = () => {
    if (state.audioEnabled) playValveClickSound();
    if (isLastStep) {
      setIsCompleted(true);
      onComplete?.();
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

  const restartProcedure = () => {
    if (state.audioEnabled) playValveClickSound();
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setVerifiedSteps({});
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
            {isCompleted ? (
              <span className="bg-emerald-600 text-white text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm font-bold shrink-0 inline-flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-xs">done_all</span>
                <span>15 / 15 Verified</span>
              </span>
            ) : (
              <span className="bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm font-bold shrink-0 font-mono">
                Step 0{step.stepNumber} / {sopSteps.length}
              </span>
            )}
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block truncate">
                Interactive Safety Training Module
              </span>
              <h3
                id="sop-stepper-title"
                className="font-sans font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight"
              >
                {isCompleted ? 'Procedure Complete' : step.title}
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
            className={`h-full transition-all duration-300 ${
              isCompleted ? 'bg-emerald-500' : 'bg-amber-500 dark:bg-sky-400'
            }`}
            style={{ width: isCompleted ? '100%' : `${((currentStepIndex + 1) / sopSteps.length) * 100}%` }}
          />
        </div>

        {/* Modal Body: Switch between Active Step and End of Procedure Completion View */}
        {isCompleted ? (
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 min-h-0 text-center animate-fadeIn">
            {/* Center Celebratory & Safety Badge */}
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                <span className="material-symbols-outlined text-4xl sm:text-5xl">task_alt</span>
              </div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                Standard Operating Procedure Complete
              </span>
              <h3 className="font-sans font-extrabold text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-[#16324F] dark:text-white mt-1.5 leading-tight">
                End of Safety &amp; Operating Procedure
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal mt-2 leading-relaxed">
                You have successfully reviewed and verified all 15 operational steps of the Centralized Compressed Air Distribution System.
              </p>
            </div>

            {/* 3 Categories Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238]">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Phase A · 5 Steps
                </span>
                <h4 className="font-bold text-xs uppercase text-[#16324F] dark:text-white mt-0.5">
                  Compressor Start Up
                </h4>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  <span>Verified (01–05)</span>
                </span>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238]">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Phase B · 6 Steps
                </span>
                <h4 className="font-bold text-xs uppercase text-[#16324F] dark:text-white mt-0.5">
                  Operating Procedure
                </h4>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  <span>Verified (06–11)</span>
                </span>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238]">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Phase D · 4 Steps
                </span>
                <h4 className="font-bold text-xs uppercase text-[#16324F] dark:text-white mt-0.5">
                  Shutdown &amp; Storing
                </h4>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  <span>Verified (12–15)</span>
                </span>
              </div>
            </div>

            {/* Post-Operation Safety Directives Reminder */}
            <div className="max-w-2xl mx-auto rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/30 p-4 sm:p-5 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <span className="material-symbols-outlined text-base">shield</span>
                <h5 className="font-sans font-bold text-xs uppercase tracking-wider">
                  Mandatory Post-Operation Safety Directives
                </h5>
              </div>
              <ul className="text-xs text-slate-700 dark:text-slate-200 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Line Depressurization:</strong> Ensure all main drop valves are closed and bleed valves operated until the distribution line reads exactly 0 PSI.</li>
                <li><strong>Hose Reel Stowing:</strong> Slowly rewind all overhead retractable hose reels into their spring-loaded housings to prevent tripping hazards.</li>
                <li><strong>Equipment Isolation:</strong> Verify the rotary screw compressor and refrigerant air dryer circuit breakers are in the OFF position.</li>
                <li><strong>PPE &amp; Housekeeping:</strong> Machine areas swept of aluminum/steel chips; safety glasses and ear protection returned to storage.</li>
              </ul>
            </div>
          </div>
        ) : (
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
        )}

        {/* Stepper Footer Controls */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238] flex items-center justify-between gap-3 shrink-0">
          {isCompleted ? (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={restartProcedure}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Restart Stepper</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] hover:bg-[#0E2135] dark:hover:bg-sky-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">done_all</span>
                <span>Finish &amp; Return to Manual</span>
              </button>
            </div>
          ) : (
            <>
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
                {isLastStep ? 'Complete Procedure ✓' : 'Next Step →'}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { usePneumatics } from '../../context/PneumaticContext';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { state, triggerEmergencyDepressurize, resetSystem } = usePneumatics();
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleCheck = (idx: number) => {
    setChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !state.isEmergencyDepressurized) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, state.isEmergencyDepressurized]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!state.isEmergencyDepressurized) onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] dark:bg-[#18181B] border sm:border-2 border-accent-crimson shadow-2xl hairline-all z-10 p-4 sm:p-8 overflow-y-auto max-h-[92vh] animate-fadeIn space-y-5 sm:space-y-6 my-auto transition-colors">
        
        {/* Warning Banner */}
        <div className="flex items-center justify-between border-b border-red-200 dark:border-red-900/60 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent-crimson text-white flex items-center justify-center animate-pulse shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-accent-crimson dark:text-rose-400 font-semibold block">
                DOLE Standard 1910 · High Priority
              </span>
              <h3 className="font-sans font-extrabold text-lg sm:text-2xl uppercase tracking-tight text-charcoal-ink dark:text-gray-100 leading-tight">
                EMERGENCY DEPRESSURIZATION
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 border border-hairline-divider flex items-center justify-center text-xs text-charcoal-ink dark:text-gray-300 hover:border-charcoal-ink dark:hover:border-gray-400 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Live Line Pressure Gauge & Warning */}
        <div className="p-3.5 sm:p-4 bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-accent-crimson dark:text-rose-400 font-medium block">
              Main Pneumatic Loop Pressure
            </span>
            <div className="font-sans font-extrabold text-2xl sm:text-4xl text-charcoal-ink dark:text-gray-100">
              {state.mainHeaderPressure.toFixed(1)} <small className="text-xs sm:text-sm font-sans text-subtle-ash dark:text-gray-400">Bar ({(state.mainHeaderPressure * 14.5).toFixed(0)} PSI)</small>
            </div>
            <span className="text-[10px] text-muted-charcoal dark:text-gray-300 block">
              Status: <strong className={state.isEmergencyDepressurized ? 'text-accent-crimson dark:text-rose-400 uppercase' : 'text-emerald-800 dark:text-emerald-400 uppercase'}>
                {state.isEmergencyDepressurized ? 'LINE PURGED (0.0 PSI)' : 'PRESSURIZED LINE ACTIVE'}
              </strong>
            </span>
          </div>

          <div className="w-full sm:w-auto">
            {!state.isEmergencyDepressurized ? (
              <button
                type="button"
                onClick={triggerEmergencyDepressurize}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-accent-crimson text-white font-semibold hover:bg-red-800 transition-colors shadow-md border border-red-900 text-center cursor-pointer"
              >
                Dump Main Pressure
              </button>
            ) : (
              <button
                type="button"
                onClick={resetSystem}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-emerald-800 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-md border border-emerald-900 text-center cursor-pointer"
              >
                Reset &amp; Repressurize
              </button>
            )}
          </div>
        </div>

        {/* Rapid Depressurization Protocol Checklist */}
        <div className="space-y-2.5 sm:space-y-3">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash dark:text-gray-400 font-medium block">
            Emergency Cutoff Procedure (Step-by-Step)
          </span>

          {[
            { id: 1, title: 'Trip Main Compressor Electrical Breaker', detail: 'Isolates 15 kW motor induction drive immediately.' },
            { id: 2, title: 'Actuate Rapid Solenoid Exhaust Valve', detail: 'Vents 500L ASME receiver vessel into baffled acoustic muffler.' },
            { id: 3, title: 'Quarter-Turn All 6 Station Wall Levers (Perpendicular)', detail: 'Physically isolates individual machining drop downcomers.' },
            { id: 4, title: 'Verify Zero Residual PSI on Analog Manifold Dials', detail: 'Confirms complete dissipation of stored kinetic fluid energy.' },
            { id: 5, title: 'Establish 3-Meter Perimeter Around Fault Point', detail: 'Evacuate students away from damaged hose or blown fitting.' },
          ].map((item) => (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="p-3 sm:p-3.5 hairline-all bg-[#FAF9F5] dark:bg-[#202024] hover:bg-[#F4F0E8] dark:hover:bg-[#27272A] flex items-start gap-2.5 sm:gap-3 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={checklist[item.id]}
                onChange={() => {}}
                className="mt-0.5 w-4 h-4 text-accent-crimson rounded-none border-charcoal-ink dark:border-gray-600 focus:ring-0 cursor-pointer shrink-0"
              />
              <div className="text-xs">
                <span className="font-medium text-charcoal-ink dark:text-gray-100 block leading-snug">{item.id}. {item.title}</span>
                <span className="text-[10px] sm:text-[11px] text-muted-charcoal dark:text-gray-300 font-light leading-relaxed">{item.detail}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Emergency Contacts Hotlines */}
        <div className="p-3.5 sm:p-4 bg-[#F4F0E8] dark:bg-[#202024] hairline-all text-xs space-y-1.5 sm:space-y-2">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash dark:text-gray-400 block font-semibold">
            TUP Taguig Emergency Dispatch Hotlines
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-charcoal-ink dark:text-gray-200 font-light">
            <div><strong>Campus Clinic:</strong> (02) 8823-2456 loc 108</div>
            <div><strong>Security Command:</strong> (02) 8823-2456 loc 112</div>
            <div><strong>Lab Supervisor:</strong> loc 204 (Engr. De Leon)</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-hairline-divider pt-3.5 sm:pt-4 text-xs">
          <span className="text-subtle-ash dark:text-gray-400 text-[9px] sm:text-[10px] uppercase tracking-wider">
            Ref: TUPT-SAFETY-SOP-EMG-01
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-5 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] border border-charcoal-ink dark:border-gray-500 text-charcoal-ink dark:text-gray-200 hover:bg-charcoal-ink hover:text-[#FAF9F5] dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};

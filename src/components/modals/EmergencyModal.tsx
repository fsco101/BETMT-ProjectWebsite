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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 dark:bg-black/85 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={() => {
          if (!state.isEmergencyDepressurized) onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0E2135] text-slate-800 dark:text-slate-100 border-2 border-red-500 dark:border-red-600 shadow-2xl rounded-xl sm:rounded-2xl z-10 p-5 sm:p-8 overflow-y-auto max-h-[92vh] animate-scaleUp space-y-5 sm:space-y-6 my-auto transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-modal-title"
      >
        {/* Warning Banner Header */}
        <div className="flex items-center justify-between border-b border-red-100 dark:border-red-900/40 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse shrink-0 shadow-md shadow-red-500/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-red-600 dark:text-rose-400 font-bold block">
                DOLE Standard 1910 · High Priority
              </span>
              <h3
                id="emergency-modal-title"
                className="font-sans font-extrabold text-lg sm:text-2xl uppercase tracking-tight text-slate-900 dark:text-white leading-tight"
              >
                EMERGENCY DEPRESSURIZATION
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

        {/* Live Line Pressure Gauge & Dump / Reset Trigger */}
        <div className="p-4 sm:p-5 rounded-xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-red-600 dark:text-rose-400 font-semibold block">
              Main Pneumatic Loop Pressure
            </span>
            <div className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              {state.mainHeaderPressure.toFixed(1)}{' '}
              <span className="text-sm font-sans font-normal text-slate-500 dark:text-slate-400">
                Bar ({(state.mainHeaderPressure * 14.5).toFixed(0)} PSI)
              </span>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-300 block">
              Status:{' '}
              <strong className={state.isEmergencyDepressurized ? 'text-red-600 dark:text-rose-400 uppercase font-bold' : 'text-emerald-600 dark:text-emerald-400 uppercase font-bold'}>
                {state.isEmergencyDepressurized ? 'LINE PURGED (0.0 PSI)' : 'PRESSURIZED LINE ACTIVE'}
              </strong>
            </span>
          </div>

          <div className="w-full sm:w-auto">
            {!state.isEmergencyDepressurized ? (
              <button
                type="button"
                onClick={triggerEmergencyDepressurize}
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs uppercase tracking-wider bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-md shadow-red-600/20 text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">emergency_home</span>
                <span>Dump Main Pressure</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={resetSystem}
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-md shadow-emerald-600/20 text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                <span>Reset &amp; Repressurize</span>
              </button>
            )}
          </div>
        </div>

        {/* Rapid Depressurization Protocol Checklist */}
        <div className="space-y-2.5 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
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
              className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#162238]/60 hover:bg-slate-100 dark:hover:bg-[#162238] flex items-start gap-3 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={checklist[item.id]}
                onChange={() => {}}
                className="mt-0.5 w-4 h-4 text-red-600 rounded border-slate-300 dark:border-slate-700 focus:ring-red-500 cursor-pointer shrink-0"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white block leading-snug">
                  {item.id}. {item.title}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {item.detail}
                </span>
              </div>
            </label>
          ))}
        </div>

        {/* Emergency Contacts Hotlines */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#162238] border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-bold">
            Group 1 · Batch 2023–2027 Emergency Dispatch Hotlines
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700 dark:text-slate-200">
            <div><strong className="text-slate-900 dark:text-white font-semibold">Campus Clinic:</strong> (02) 8823-2456 loc 108</div>
            <div><strong className="text-slate-900 dark:text-white font-semibold">Security Command:</strong> (02) 8823-2456 loc 112</div>
            <div><strong className="text-slate-900 dark:text-white font-semibold">Lab Supervisor:</strong> loc 204 (Engr. De Leon)</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider font-mono">
            Ref: GRP1-SAFETY-SOP-EMG-01
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};


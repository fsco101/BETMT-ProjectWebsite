import React, { useState, useEffect } from 'react';

interface SopVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SopVerificationModal: React.FC<SopVerificationModalProps> = ({ isOpen, onClose }) => {
  const [studentName, setStudentName] = useState('Juan Dela Cruz');
  const [studentId, setStudentId] = useState('GRP1-2026-ME-0482');
  const currentDate = new Date().toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Certificate Box */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0E2135] text-slate-800 dark:text-slate-100 shadow-2xl rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 lg:p-10 z-10 animate-scaleUp text-center space-y-5 sm:space-y-6 my-auto transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compliance-pass-title"
      >
        {/* Close Modal Button (Top-Right) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Certificate Border Frame */}
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 sm:p-8 space-y-5 sm:space-y-6 relative bg-[#F8FAFC]/50 dark:bg-[#162238]/40">
          
          {/* Header Title */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#16324F] dark:text-sky-400 font-bold">
              Group 1 · Batch 2023–2027
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
              Mechanical and Allied Department · BET-MT
            </span>
            <h3
              id="compliance-pass-title"
              className="font-sans font-extrabold text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#16324F] dark:text-white mt-3 sm:mt-4"
            >
              SAFETY COMPLIANCE PASS
            </h3>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mt-1 inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Ref: ISO 8573-1 &amp; ANSI Z87.1 Certified Practical</span>
            </span>
          </div>

          <div className="w-16 h-0.5 bg-amber-500 dark:bg-sky-400 mx-auto rounded-full" />

          {/* Recipient Details */}
          <div className="space-y-3 sm:space-y-4 max-w-md mx-auto text-left">
            <div>
              <label className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1 font-semibold">
                Technician / Student Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#16324F] dark:focus:ring-sky-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1 font-semibold">
                Laboratory ID Number:
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-[#16324F] dark:focus:ring-sky-500 transition-colors"
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            This verification certifies that the named student has completed all 7 illustrated SOP milestones, confirmed the zero-pressure line exhaust procedure, and demonstrated compliance with workshop safety regulations.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <span>Date: {currentDate}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Status: PASSED / AUTHORIZED</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] hover:bg-[#0E2135] dark:hover:bg-sky-400 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Verification Pass</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};


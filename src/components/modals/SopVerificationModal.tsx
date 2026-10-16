import React, { useState } from 'react';

interface SopVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SopVerificationModal: React.FC<SopVerificationModalProps> = ({ isOpen, onClose }) => {
  const [studentName, setStudentName] = useState('Juan Dela Cruz');
  const [studentId, setStudentId] = useState('TUPT-2026-ME-0482');
  const currentDate = new Date().toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-ink/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Certificate Box */}
      <div className="relative w-full max-w-2xl bg-[#FCFAF6] shadow-2xl hairline-all p-4 sm:p-8 lg:p-12 z-10 animate-fadeIn text-center space-y-5 sm:space-y-6 my-auto">
        
        {/* Border Frame */}
        <div className="border sm:border-2 border-charcoal-ink p-4 sm:p-8 space-y-5 sm:space-y-6 relative">
          
          {/* Header Title */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-subtle-ash font-medium">
              Technological University of the Philippines — Taguig Campus
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-muted-charcoal mt-0.5">
              Mechanical And Allied Department
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl uppercase tracking-wider text-charcoal-ink mt-3 sm:mt-4">
              SAFETY COMPLIANCE PASS
            </h3>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-emerald-800 font-medium mt-1">
              Ref: ISO 8573-1 &amp; ANSI Z87.1 Certified Practical
            </span>
          </div>

          <div className="w-12 sm:w-16 h-px bg-hairline-divider mx-auto" />

          {/* Recipient Details */}
          <div className="space-y-3 sm:space-y-4 max-w-md mx-auto text-left">
            <div>
              <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash block mb-1">
                Technician / Student Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-hairline-divider px-3 py-1.5 text-xs text-charcoal-ink font-medium focus:outline-none focus:border-charcoal-ink"
              />
            </div>
            <div>
              <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash block mb-1">
                Laboratory ID Number:
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-hairline-divider px-3 py-1.5 text-xs text-charcoal-ink focus:outline-none focus:border-charcoal-ink"
              />
            </div>
          </div>

          <p className="text-xs text-muted-charcoal font-light leading-relaxed max-w-lg mx-auto">
            This verification certifies that the named student has completed all 7 illustrated SOP milestones, confirmed the zero-pressure line exhaust procedure, and demonstrated compliance with workshop safety regulations.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-subtle-ash border-t hairline-t">
            <span>Date: {currentDate}</span>
            <span className="text-emerald-800 font-medium">Status: PASSED / AUTHORIZED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-charcoal-ink text-[#FAF9F5] hover:bg-transparent hover:text-charcoal-ink border border-charcoal-ink transition-colors"
          >
            Print Verification Pass
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] border border-hairline-divider hover:border-charcoal-ink transition-colors"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};

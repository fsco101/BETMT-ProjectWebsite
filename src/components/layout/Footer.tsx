import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="hairline-t bg-[#F7F5F0] py-8 sm:py-10 px-4 sm:px-8 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-charcoal text-center md:text-left">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="leading-relaxed">© 2026 Technological University of the Philippines — Taguig Campus</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span>Mechanical And Allied Department</span>
          <span className="hidden sm:inline">Centralized Compressed Air Distribution System</span>
          <a
            href="#hero"
            className="hover:text-charcoal-ink border-b border-transparent hover:border-charcoal-ink transition-all"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

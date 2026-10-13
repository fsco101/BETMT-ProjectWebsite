import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="hairline-t bg-[#F7F5F0] py-10 px-6 sm:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-[0.18em] text-muted-charcoal">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 border border-charcoal-ink flex items-center justify-center font-editorial text-[10px]">
            LM
          </span>
          <span>© 2026 Technological University of the Philippines — Taguig Campus</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span>Mechanical &amp; Allied Dept.</span>
          <span className="hidden sm:inline">ISO 8573 Compressed-Air Manual</span>
          <a href="#hero" className="hover:text-charcoal-ink border-b border-transparent hover:border-charcoal-ink transition-all">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

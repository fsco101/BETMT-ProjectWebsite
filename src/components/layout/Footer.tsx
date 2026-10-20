import React from 'react';

interface FooterProps {
  activePage?: 'manual' | 'about';
  onNavigatePage?: (page: 'manual' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({
  activePage = 'manual',
  onNavigatePage,
}) => {
  return (
    <footer className="hairline-t bg-[#16324F] text-slate-200 py-10 sm:py-12 px-4 sm:px-8 lg:px-12 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-sm tracking-tight text-white uppercase">
              OPERATIONAL MANUAL
            </span>
            <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-xs">
              GROUP 1
            </span>
          </div>
          <p className="text-slate-300 text-[11px]">
            BET-MT BATCH 2027 · Mechanical &amp; Allied Department (MAAD)
          </p>
          <p className="text-slate-400 text-[10px]">
            Technological University of the Philippines - Taguig Campus
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] uppercase tracking-wider">
          {activePage === 'manual' ? (
            <button
              type="button"
              onClick={() => onNavigatePage?.('about')}
              className="text-amber-400 hover:text-white font-semibold transition-colors underline underline-offset-4 cursor-pointer"
            >
              About Study &amp; Team →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigatePage?.('manual')}
              className="text-amber-400 hover:text-white font-semibold transition-colors underline underline-offset-4 cursor-pointer"
            >
              ← Return to Operational Manual
            </button>
          )}

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors text-slate-300"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-700/60 text-center text-[10px] text-slate-400">
        Design &amp; Development of a Centralized Compressed Air Distribution System for Machine Shop Laboratories
      </div>
    </footer>
  );
};

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
    <footer className="hairline-t bg-[#F7F5F0] dark:bg-[#121214] py-8 sm:py-10 px-4 sm:px-8 lg:px-12 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-charcoal dark:text-[#A1A1AA] text-center md:text-left">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="leading-relaxed">© 2026 Group 1 - Batch 2023-2027</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span>Mechanical And Allied Department</span>
          <span className="hidden sm:inline">Centralized Compressed Air Distribution System</span>
          
          {activePage === 'manual' ? (
            <button
              type="button"
              onClick={() => onNavigatePage?.('about')}
              className="hover:text-charcoal-ink dark:hover:text-white border-b border-charcoal-ink dark:border-white text-charcoal-ink dark:text-white font-semibold transition-all"
            >
              About Study & Team
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigatePage?.('manual')}
              className="hover:text-charcoal-ink dark:hover:text-white border-b border-charcoal-ink dark:border-white text-charcoal-ink dark:text-white font-semibold transition-all"
            >
              Return to Manual
            </button>
          )}

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-charcoal-ink dark:hover:text-white border-b border-transparent hover:border-charcoal-ink dark:hover:border-white transition-all"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};


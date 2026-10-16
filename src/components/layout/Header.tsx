import React, { useState } from 'react';
import { usePneumatics } from '../../context/PneumaticContext';

interface HeaderProps {
  onOpenEmergencyModal: () => void;
  activePage?: 'manual' | 'about';
  onNavigatePage?: (page: 'manual' | 'about') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEmergencyModal,
  activePage = 'manual',
  onNavigatePage,
  theme = 'light',
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = usePneumatics();

  const manualNavLinks = [
    { label: 'System Overview', href: '#system-overview' },
    { label: 'System Components & Operation', href: '#system-components' },
    { label: 'Safety Protocols', href: '#safety-protocols' },
    { label: 'Standard Operating Procedure', href: '#sop' },
    { label: 'Outlet Area', href: '#air-outlets' },
    { label: 'Video Demo', href: '#video-demo' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handlePageSwitch = (page: 'manual' | 'about') => {
    setMobileMenuOpen(false);
    onNavigatePage?.(page);
  };

  return (
    <header className="w-full hairline-b sticky top-0 z-40 bg-[#F7F5F0]/95 dark:bg-[#121214]/95 backdrop-blur-md transition-colors duration-200">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-4">
        
        {/* Left: TUP TAGUIG & Mechanical And Allied Department */}
        <div className="flex items-center justify-start shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              if (activePage !== 'manual') {
                e.preventDefault();
                handlePageSwitch('manual');
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3.5 group"
          >
            <div className="flex flex-col">
              <span className="font-editorial text-xs sm:text-sm md:text-base uppercase tracking-[0.16em] sm:tracking-[0.2em] text-charcoal-ink dark:text-[#F4F4F6] leading-tight font-medium">
                TUP TAGUIG
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-subtle-ash dark:text-[#8E8B85] font-medium truncate max-w-[180px] sm:max-w-none">
                Mechanical And Allied Department
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center justify-center space-x-4 2xl:space-x-6 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] 2xl:tracking-[0.16em] text-muted-charcoal dark:text-[#A1A1AA] font-medium">
          {activePage === 'manual' ? (
            <>
              {manualNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-charcoal-ink dark:hover:text-white transition-colors pb-0.5 border-b border-transparent hover:border-charcoal-ink dark:hover:border-white whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => handlePageSwitch('about')}
                className="hover:text-charcoal-ink dark:hover:text-white transition-all pb-0.5 border-b border-charcoal-ink dark:border-white text-charcoal-ink dark:text-[#F4F4F6] font-semibold whitespace-nowrap ml-2"
              >
                About Study & Team →
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handlePageSwitch('manual')}
                className="hover:text-charcoal-ink dark:hover:text-white transition-all pb-0.5 border-b border-charcoal-ink dark:border-white text-charcoal-ink dark:text-[#F4F4F6] font-semibold whitespace-nowrap"
              >
                ← Return to Manual
              </button>
              <a
                href="#research-team"
                className="hover:text-charcoal-ink dark:hover:text-white transition-colors pb-0.5 border-b border-transparent hover:border-charcoal-ink dark:hover:border-white whitespace-nowrap"
              >
                Research Team
              </a>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-charcoal-ink dark:hover:text-white transition-colors pb-0.5 border-b border-transparent hover:border-charcoal-ink dark:hover:border-white whitespace-nowrap"
              >
                Study Abstract & Objectives
              </a>
            </>
          )}
        </nav>

        {/* Right: Theme Toggle, Emergency Action & Mobile Hamburger */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-charcoal-ink/30 dark:border-white/20 text-charcoal-ink dark:text-[#E4E4E7] bg-[#FAF9F5] dark:bg-[#1E1E22] hover:bg-charcoal-ink hover:text-white dark:hover:bg-white dark:hover:text-[#121214] text-[9px] sm:text-[10px] uppercase tracking-[0.16em] transition-all font-medium shrink-0"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline font-mono">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* Emergency Depressurize Trigger */}
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            className={`text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] px-2.5 sm:px-3.5 py-1.5 transition-all font-medium whitespace-nowrap shrink-0 ${
              state.isEmergencyDepressurized
                ? 'bg-accent-crimson text-white animate-pulse'
                : 'text-accent-crimson dark:text-red-400 border border-accent-crimson dark:border-red-400 hover:bg-accent-crimson hover:text-white dark:hover:bg-red-500 dark:hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">
              {state.isEmergencyDepressurized ? 'DEPRESSURIZED' : 'Emergency Depressurize'}
            </span>
            <span className="sm:hidden">
              {state.isEmergencyDepressurized ? 'PURGED' : 'Emergency'}
            </span>
          </button>

          {/* Mobile Menu Hamburger Button (< 1280px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 border border-charcoal-ink/30 dark:border-white/30 p-1 bg-[#FAF9F5] dark:bg-[#1E1E22] shrink-0"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-4 h-px bg-charcoal-ink dark:bg-white transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span
              className={`w-4 h-px bg-charcoal-ink dark:bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-4 h-px bg-charcoal-ink dark:bg-white transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>
      </div>


      {/* Mobile Slide-down Full Drawer (< 1280px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden hairline-t bg-[#F7F5F0] dark:bg-[#18181C] px-6 py-6 shadow-xl animate-fadeIn transition-colors">
          <nav className="flex flex-col space-y-3.5 text-xs uppercase tracking-[0.18em] text-muted-charcoal dark:text-[#A1A1AA]">
            
            {/* Mobile Dark / Light Mode Toggle */}
            <div className="pb-3 border-b border-hairline-divider/40 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-subtle-ash dark:text-[#8E8B85]">Appearance Theme</span>
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 px-3 py-1 border border-charcoal-ink/30 dark:border-white/30 text-charcoal-ink dark:text-white bg-[#FAF9F5] dark:bg-[#222226] text-[10px] uppercase font-medium"
              >
                <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>
            </div>

            {activePage === 'manual' ? (
              <>
                {manualNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="hover:text-charcoal-ink dark:hover:text-white py-1.5 border-b border-hairline-divider/40 dark:border-white/10 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-subtle-ash">→</span>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => handlePageSwitch('about')}
                  className="w-full text-left font-medium text-charcoal-ink dark:text-white py-2 px-3 border border-charcoal-ink dark:border-white/40 bg-white/70 dark:bg-[#222226] flex items-center justify-between mt-2"
                >
                  <span>About Study & Team</span>
                  <span className="text-xs font-mono">→</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handlePageSwitch('manual')}
                  className="w-full text-left font-medium text-charcoal-ink dark:text-white py-2 px-3 border border-charcoal-ink dark:border-white/40 bg-white/70 dark:bg-[#222226] flex items-center justify-between mb-2"
                >
                  <span>← Return to Manual</span>
                  <span className="text-xs font-mono">↵</span>
                </button>
                <a
                  href="#research-team"
                  onClick={handleNavClick}
                  className="hover:text-charcoal-ink dark:hover:text-white py-1.5 border-b border-hairline-divider/40 dark:border-white/10 flex items-center justify-between"
                >
                  <span>Research Team</span>
                  <span className="text-xs text-subtle-ash">→</span>
                </a>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    handleNavClick();
                  }}
                  className="hover:text-charcoal-ink dark:hover:text-white py-1.5 border-b border-hairline-divider/40 dark:border-white/10 flex items-center justify-between"
                >
                  <span>Study Abstract & Objectives</span>
                  <span className="text-xs text-subtle-ash">↑</span>
                </a>
              </>
            )}

            <div className="pt-3 flex items-center justify-between text-[10px] text-subtle-ash dark:text-[#8E8B85]">
              <span>Main Line: <strong className="font-semibold text-charcoal-ink dark:text-white">{state.mainHeaderPressure.toFixed(1)} Bar</strong></span>
              <span>30 PSI Operating Pressure</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

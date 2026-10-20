import React, { useState } from 'react';

const SunIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

interface HeaderProps {
  onOpenEmergencyModal?: () => void;
  activePage?: 'manual' | 'about';
  onNavigatePage?: (page: 'manual' | 'about') => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage = 'manual',
  onNavigatePage,
  theme = 'light',
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const manualNavLinks = [
    { label: 'System Overview', href: '#system-overview' },
    { label: 'How the System Works', href: '#system-components' },
    { label: 'Safety Protocols', href: '#safety-protocols' },
    { label: 'Standard Operating Procedure', href: '#sop' },
    { label: 'Air Outlets', href: '#air-outlets' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handlePageSwitch = (page: 'manual' | 'about') => {
    setMobileMenuOpen(false);
    onNavigatePage?.(page);
  };

  return (
    <header className="w-full hairline-b sticky top-0 z-40 bg-white/95 dark:bg-[#0E2135]/95 backdrop-blur-md transition-colors duration-200">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex xl:grid xl:grid-cols-[auto_1fr_auto] items-center justify-between gap-6">
        
        {/* Left: Operational Manual Title & Department Badge */}
        <div className="flex items-center justify-start shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              if (activePage !== 'manual') {
                e.preventDefault();
                handlePageSwitch('manual');
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sans font-extrabold text-sm sm:text-base tracking-tight text-[#16324F] dark:text-white uppercase leading-tight">
                  OPERATIONAL MANUAL
                </span>
                <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs bg-[#FEF3C7] dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60">
                  GROUP 1
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium truncate max-w-[220px] sm:max-w-none">
                BET-MT BATCH 2027 · MAAD TUP-TAGUIG
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center justify-center space-x-6 text-[11px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300 font-medium">
          {activePage === 'manual' ? (
            <>
              {manualNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#16324F] dark:hover:text-white transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#16324F] dark:hover:border-white whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => handlePageSwitch('about')}
                className="px-3 py-1 rounded-sm bg-[#F1F5F9] dark:bg-[#162238] hover:bg-[#16324F] hover:text-white dark:hover:bg-white dark:hover:text-[#16324F] text-[#16324F] dark:text-white font-semibold transition-all border border-slate-200 dark:border-slate-700 whitespace-nowrap ml-2 cursor-pointer"
              >
                About Study & Team →
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handlePageSwitch('manual')}
                className="hover:text-[#16324F] dark:hover:text-white transition-all pb-0.5 border-b-2 border-[#16324F] dark:border-white text-[#16324F] dark:text-white font-semibold whitespace-nowrap cursor-pointer"
              >
                ← Return to Operational Manual
              </button>
              <a
                href="#research-team"
                className="hover:text-[#16324F] dark:hover:text-white transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#16324F] dark:hover:border-white whitespace-nowrap"
              >
                Research Team
              </a>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#16324F] dark:hover:text-white transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#16324F] dark:hover:border-white whitespace-nowrap"
              >
                Objectives & Scope
              </a>
            </>
          )}
        </nav>

        {/* Right: Theme Toggle & Mobile Hamburger */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
          

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-[#162238] hover:bg-[#16324F] hover:text-white dark:hover:bg-white dark:hover:text-[#16324F] text-[10px] uppercase tracking-wider transition-all font-medium shrink-0 cursor-pointer group shadow-2xs"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="text-amber-500 group-hover:rotate-45 transition-transform duration-300">
              {theme === 'dark' ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
            </span>
            <span className="hidden sm:inline font-mono">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* Mobile Menu Hamburger Button (< 1280px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 p-1 bg-[#F1F5F9] dark:bg-[#162238] rounded-sm shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-4 h-0.5 bg-[#16324F] dark:bg-white transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-[#16324F] dark:bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-[#16324F] dark:bg-white transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer (< 1280px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden hairline-t bg-white dark:bg-[#0E2135] px-6 py-5 shadow-xl animate-fadeIn transition-colors">
          <nav className="flex flex-col space-y-3 text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 font-medium">
            
            <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Appearance Mode</span>
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-sm bg-[#F1F5F9] dark:bg-[#162238] text-[10px] uppercase font-medium cursor-pointer"
              >
                <span className="text-amber-500">
                  {theme === 'dark' ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
                </span>
                <span className="font-mono">{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>
            </div>

            {activePage === 'manual' ? (
              <>
                {manualNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="hover:text-[#16324F] dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-400">→</span>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => handlePageSwitch('about')}
                  className="w-full text-left font-semibold text-[#16324F] dark:text-white py-2.5 px-3 rounded-sm border border-slate-200 dark:border-slate-700 bg-[#F1F5F9] dark:bg-[#162238] flex items-center justify-between mt-2 cursor-pointer"
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
                  className="w-full text-left font-semibold text-[#16324F] dark:text-white py-2.5 px-3 rounded-sm border border-slate-200 dark:border-slate-700 bg-[#F1F5F9] dark:bg-[#162238] flex items-center justify-between mb-2 cursor-pointer"
                >
                  <span>← Return to Operational Manual</span>
                  <span className="text-xs font-mono">↵</span>
                </button>
                <a
                  href="#research-team"
                  onClick={handleNavClick}
                  className="hover:text-[#16324F] dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between"
                >
                  <span>Research Team</span>
                  <span className="text-xs text-slate-400">→</span>
                </a>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    handleNavClick();
                  }}
                  className="hover:text-[#16324F] dark:hover:text-white py-2 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between"
                >
                  <span>Objectives & Scope</span>
                  <span className="text-xs text-slate-400">↑</span>
                </a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

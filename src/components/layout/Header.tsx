import React, { useState } from 'react';
import { usePneumatics } from '../../context/PneumaticContext';

interface HeaderProps {
  onOpenEmergencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergencyModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = usePneumatics();

  const navLinks = [
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

  return (
    <header className="w-full hairline-b sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md transition-all">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-4">
        
        {/* Left: TUP TAGUIG & Mechanical And Allied Department (LM removed) */}
        <div className="flex items-center justify-start shrink-0">
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="flex flex-col">
              <span className="font-editorial text-xs sm:text-sm md:text-base uppercase tracking-[0.16em] sm:tracking-[0.2em] text-charcoal-ink leading-tight font-medium">
                TUP TAGUIG
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-subtle-ash font-medium truncate max-w-[180px] sm:max-w-none">
                Mechanical And Allied Department
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center justify-center space-x-5 2xl:space-x-7 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] 2xl:tracking-[0.16em] text-muted-charcoal font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-charcoal-ink transition-colors pb-0.5 border-b border-transparent hover:border-charcoal-ink whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Emergency Action & Mobile Hamburger */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 shrink-0">
          
          {/* Emergency Depressurize Trigger */}
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            className={`text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.2em] px-2.5 sm:px-3.5 py-1.5 transition-all font-medium whitespace-nowrap shrink-0 ${
              state.isEmergencyDepressurized
                ? 'bg-accent-crimson text-white animate-pulse'
                : 'text-accent-crimson border border-accent-crimson hover:bg-accent-crimson hover:text-white'
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
            className="xl:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 border border-charcoal-ink/30 p-1 bg-[#FAF9F5] shrink-0"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-4 h-px bg-charcoal-ink transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span
              className={`w-4 h-px bg-charcoal-ink transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-4 h-px bg-charcoal-ink transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Full Drawer (< 1280px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden hairline-t bg-[#F7F5F0] px-6 py-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3.5 text-xs uppercase tracking-[0.18em] text-muted-charcoal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="hover:text-charcoal-ink py-1.5 border-b border-hairline-divider/40 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-subtle-ash">→</span>
              </a>
            ))}
            <div className="pt-3 flex items-center justify-between text-[10px] text-subtle-ash">
              <span>Main Line: <strong className="font-semibold text-charcoal-ink">{state.mainHeaderPressure.toFixed(1)} Bar</strong></span>
              <span>30 PSI Operating Pressure</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

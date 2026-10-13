import React, { useState } from 'react';
import { usePneumatics } from '../../context/PneumaticContext';

interface HeaderProps {
  onOpenEmergencyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergencyModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = usePneumatics();

  const navLinks = [
    { label: 'Our Expertise', href: '#savoir-faire' },
    { label: '8-Stage Circuit', href: '#pipeline' },
    { label: 'Safety Protocols', href: '#protocoles' },
    { label: '7-Step SOP', href: '#sop' },
    { label: 'Air Drops (6)', href: '#sorties' },
    { label: 'Video Demo', href: '#video-demo' },
    { label: 'Lab Calculator', href: '#calculator' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full hairline-b sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md transition-all">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-4">
        
        {/* Left: Monogram & Lab Title */}
        <div className="flex items-center justify-start shrink-0">
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <span className="w-8 h-8 sm:w-9 sm:h-9 border border-charcoal-ink flex items-center justify-center font-editorial text-xs sm:text-sm tracking-widest text-charcoal-ink group-hover:bg-charcoal-ink group-hover:text-[#F7F5F0] transition-colors shrink-0">
              LM
            </span>
            <div className="flex flex-col">
              <span className="font-editorial text-xs sm:text-sm md:text-base uppercase tracking-[0.16em] sm:tracking-[0.2em] text-charcoal-ink leading-tight">
                TUP TAGUIG
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-subtle-ash font-medium truncate max-w-[140px] sm:max-w-none">
                Mechanical Machining Laboratory
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links (Centered via 1fr/auto/1fr Grid) */}
        <nav className="hidden xl:flex items-center justify-center space-x-5 2xl:space-x-8 text-[10px] 2xl:text-[11px] uppercase tracking-[0.14em] 2xl:tracking-[0.18em] text-muted-charcoal font-medium">
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
              <span>ISO 8573 Standard</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

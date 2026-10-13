import React, { useState } from 'react';
import { usePneumatics } from '../../context/PneumaticContext';
import { AudioToggle } from '../ui/AudioToggle';

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
    { label: 'Demonstration Video', href: '#video-demo' },
    { label: 'Lab Calculator', href: '#calculator' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full hairline-b sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 sm:py-5 flex items-center justify-between">
        
        {/* Monogram & Lab Title */}
        <a href="#hero" className="flex items-center gap-4 group">
          <span className="w-9 h-9 border border-charcoal-ink flex items-center justify-center font-editorial text-sm tracking-widest text-charcoal-ink group-hover:bg-charcoal-ink group-hover:text-[#F7F5F0] transition-colors">
            LM
          </span>
          <div className="flex flex-col">
            <span className="font-editorial text-sm sm:text-base uppercase tracking-[0.2em] text-charcoal-ink leading-tight">
              TUP TAGUIG
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-subtle-ash font-medium">
              Mechanical Machining Laboratory
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-7 text-[11px] uppercase tracking-[0.18em] text-muted-charcoal font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-charcoal-ink transition-colors pb-0.5 border-b border-transparent hover:border-charcoal-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* System Status, Audio, Emergency Action & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Pressure indicator */}
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] border ${
              state.isEmergencyDepressurized
                ? 'border-accent-crimson bg-red-50 text-accent-crimson animate-pulse'
                : 'border-hairline-divider bg-[#FAF9F5] text-muted-charcoal'
            }`}
            title="Current main pneumatic manifold pressure"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                state.isEmergencyDepressurized ? 'bg-accent-crimson' : 'bg-emerald-600'
              }`}
            />
            <span>{state.mainHeaderPressure.toFixed(1)} Bar</span>
          </div>

          <AudioToggle />

          {/* Emergency Depressurize Trigger */}
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 transition-all font-medium ${
              state.isEmergencyDepressurized
                ? 'bg-accent-crimson text-white animate-pulse'
                : 'text-accent-crimson border border-accent-crimson hover:bg-accent-crimson hover:text-white'
            }`}
          >
            {state.isEmergencyDepressurized ? 'SYSTEM DEPRESSURIZED' : 'Emergency Depressurize'}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 border border-charcoal-ink/30 p-1"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-5 h-px bg-charcoal-ink transition-transform ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-5 h-px bg-charcoal-ink transition-opacity ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-px bg-charcoal-ink transition-transform ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down / Full Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden hairline-t bg-[#F7F5F0] px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col space-y-4 text-xs uppercase tracking-[0.2em] text-muted-charcoal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="hover:text-charcoal-ink py-1 border-b border-hairline-divider/40"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between text-[10px] text-subtle-ash">
              <span>Main Line: {state.mainHeaderPressure.toFixed(1)} Bar</span>
              <span>ISO 8573 Standard</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

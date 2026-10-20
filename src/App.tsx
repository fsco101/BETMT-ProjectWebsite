import React, { useState, useEffect } from 'react';
import { PneumaticProvider } from './context/PneumaticContext';
import { LightboxProvider } from './context/LightboxContext';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { ExpertiseSection } from './components/sections/ExpertiseSection';
import { CircuitSection } from './components/sections/CircuitSection';
import { SafetyProtocolsSection } from './components/sections/SafetyProtocolsSection';
import { SopSection } from './components/sections/SopSection';
import { DropsSection } from './components/sections/DropsSection';
import { AboutPage } from './components/pages/AboutPage';
import { Footer } from './components/layout/Footer';
import { ImageLightboxModal } from './components/modals/ImageLightboxModal';
import { resetBodyScrollLock } from './hooks/useBodyScrollLock';

const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const [activePage, setActivePage] = useState<'manual' | 'about'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#about') {
      return 'about';
    }
    return 'manual';
  });

  useEffect(() => {
    const handleHashChange = () => {
      resetBodyScrollLock();
      if (window.location.hash === '#about') {
        setActivePage('about');
      } else if (
        window.location.hash === '#manual' ||
        window.location.hash === '' ||
        window.location.hash.startsWith('#hero') ||
        window.location.hash.startsWith('#system') ||
        window.location.hash.startsWith('#safety') ||
        window.location.hash.startsWith('#sop') ||
        window.location.hash.startsWith('#air')
      ) {
        setActivePage('manual');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigatePage = (page: 'manual' | 'about') => {
    resetBodyScrollLock();
    setActivePage(page);
    if (page === 'about') {
      window.location.hash = 'about';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#16324F] selection:text-white dark:selection:bg-sky-400 dark:selection:text-slate-950 transition-colors duration-200">
      {/* Top Sticky Navigation Bar */}
      <Header
        activePage={activePage}
        onNavigatePage={navigatePage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Narrative Flow: Manual vs About */}
      {activePage === 'about' ? (
        <main className="flex-1">
          <AboutPage onBackToManual={() => navigatePage('manual')} />
        </main>
      ) : (
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. System Overview (with Figures 1, 2, 3 and 1" to 1/2" piping layout) */}
          <ExpertiseSection />

          {/* 3. System Components & How the System Works (7 Components) */}
          <CircuitSection />

          {/* 4. Safety Standards & Operating Protocols (DO & DON'T with PPE & Videos) */}
          <SafetyProtocolsSection />

          {/* 5. Standard Operating Procedure (15-Step Protocol with Figures) */}
          <SopSection />

          {/* 6. Air Outlets (6 Workshop Drops with 1/2" Branch Specifications) */}
          <DropsSection />
        </main>
      )}

      {/* Industrial Engineering Footer */}
      <Footer activePage={activePage} onNavigatePage={navigatePage} />

      {/* Global Image Lightbox Modal */}
      <ImageLightboxModal />
    </div>
  );
};

export default function App() {
  return (
    <PneumaticProvider>
      <LightboxProvider>
        <AppContent />
      </LightboxProvider>
    </PneumaticProvider>
  );
}

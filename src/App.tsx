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
import { VideoSection } from './components/sections/VideoSection';
import { AboutPage } from './components/pages/AboutPage';
import { Footer } from './components/layout/Footer';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { ImageLightboxModal } from './components/modals/ImageLightboxModal';

const AppContent: React.FC = () => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
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
      if (window.location.hash === '#about') {
        setActivePage('about');
      } else if (
        window.location.hash === '#manual' ||
        window.location.hash === '' ||
        window.location.hash.startsWith('#hero') ||
        window.location.hash.startsWith('#system') ||
        window.location.hash.startsWith('#safety') ||
        window.location.hash.startsWith('#sop') ||
        window.location.hash.startsWith('#air') ||
        window.location.hash.startsWith('#video')
      ) {
        setActivePage('manual');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigatePage = (page: 'manual' | 'about') => {
    setActivePage(page);
    if (page === 'about') {
      window.location.hash = 'about';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#121214] text-[#1C1B1A] dark:text-[#F4F4F6] flex flex-col selection:bg-[#E8E2D7] dark:selection:bg-[#333238] selection:text-[#1C1B1A] dark:selection:text-white transition-colors duration-200">
      {/* Top Sticky Navigation Bar */}
      <Header
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
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

          {/* 2. System Overview */}
          <ExpertiseSection />

          {/* 3. System Components & How the System Works */}
          <CircuitSection />

          {/* 4. Safety Standards & Operating Protocols (DO & DON'T with PPE) */}
          <SafetyProtocolsSection />

          {/* 5. Standard Operating Procedure (15-Step Illustrated Protocol) */}
          <SopSection />

          {/* 6. Air Outlets (6 Workshop Drops with Live Controls) */}
          <DropsSection />

          {/* 7. Workshop Video Demonstration */}
          <VideoSection />
        </main>
      )}

      {/* Editorial Lab Footer */}
      <Footer activePage={activePage} onNavigatePage={navigatePage} />


      {/* Full-Screen Emergency Depressurization Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />

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

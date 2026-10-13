import React, { useState } from 'react';
import { PneumaticProvider } from './context/PneumaticContext';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { ExpertiseSection } from './components/sections/ExpertiseSection';
import { CircuitSection } from './components/sections/CircuitSection';
import { SafetyProtocolsSection } from './components/sections/SafetyProtocolsSection';
import { SopSection } from './components/sections/SopSection';
import { DropsSection } from './components/sections/DropsSection';
import { VideoSection } from './components/sections/VideoSection';
import { CalculatorSection } from './components/sections/CalculatorSection';
import { FacultySection } from './components/sections/FacultySection';
import { Footer } from './components/layout/Footer';
import { EmergencyModal } from './components/modals/EmergencyModal';

const AppContent: React.FC = () => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C1B1A] flex flex-col selection:bg-[#E8E2D7] selection:text-[#1C1B1A]">
      {/* Top Sticky Editorial Navigation Bar */}
      <Header onOpenEmergencyModal={() => setEmergencyModalOpen(true)} />

      {/* Main Narrative Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Expertise: Fluid Distribution */}
        <ExpertiseSection />

        {/* 3. The 8-Stage Air Distribution Circuit (with technical drawer) */}
        <CircuitSection />

        {/* 4. Safety Standards & Operating Protocols (DO & DON'T with search) */}
        <SafetyProtocolsSection />

        {/* 5. 7-Step Operating Procedure (SOP with interactive stepper & cert pass) */}
        <SopSection />

        {/* 6. Distribution Network (6 Drops Live Simulator with Analog Gauges) */}
        <DropsSection />

        {/* 7. Workshop Video Demonstration (with clickable chapter scrubbing) */}
        <VideoSection />

        {/* 8. Fluid Engineering Lab Calculator */}
        <CalculatorSection />

        {/* 9. Laboratory Technicians & Faculty */}
        <FacultySection />
      </main>

      {/* Editorial Lab Footer */}
      <Footer />

      {/* Full-Screen Emergency Depressurization Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <PneumaticProvider>
      <AppContent />
    </PneumaticProvider>
  );
}

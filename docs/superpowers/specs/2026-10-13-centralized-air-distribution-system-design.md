# Centralized Compressed-Air Distribution System — Technical Design Specification

- **System**: Centralized Compressed-Air Distribution System Web Architecture
- **Client / Laboratory**: Technological University of the Philippines — Taguig Campus (Mechanical & Allied Department)
- **Design Archetype**: Haute Ébénisterie Hyperframed Editorial Architecture (as specified in `DESIGN.md` and `screen.png`)
- **Date**: 2026-10-13
- **Status**: Approved for Implementation

---

## 1. Executive Summary

This document specifies the software architecture, design token system, and interactive subsystems for the web application representing the **Centralized Compressed-Air Distribution System** at the Technological University of the Philippines — Taguig Campus (TUP Taguig).

The web application fuses high-contrast editorial minimalism (Bodoni Moda serif headers, Work Sans body, hairline framing, 0px border-radius, linen/stone background tones) with an interactive engineering digital twin. The application is architected modularly with Vite, React 18, and TypeScript so that laboratory faculty can effortlessly replace mock assets, CAD blueprints, video files, and technical specifications in a single typed data layer.

---

## 2. Architecture & Technology Stack

### 2.1 Core Technologies
- **Bundler & Runtime**: Vite 5.x + React 18 + TypeScript
- **Styling**: Tailwind CSS with custom theme extensions precisely mirroring `DESIGN.md` tokens, augmented by bespoke Vanilla CSS utility classes for 1px hairline dividers, editorial serifs, and analog dial animations
- **Icons**: Material Symbols Outlined + Lucide React
- **Audio Simulation**: Web Audio API synthesized mechanical valve and depressurization acoustic feedback (with user-facing mute toggle)

### 2.2 Directory Hierarchy
```text
/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── public/
│   └── assets/                  # Media placeholders for future uploads
└── src/
    ├── main.tsx
    ├── App.tsx                  # Global layout, sticky editorial header, navigation
    ├── index.css                # Hairline dividers, scroll behavior, custom typography
    ├── types/
    │   └── pneumatic.ts         # Strictly typed models for circuit, drops, valves, SOP, calculator
    ├── context/
    │   └── PneumaticContext.tsx # Centralized digital twin simulation state
    ├── data/
    │   ├── circuitStages.ts     # 8 stages of compressed-air circuit
    │   ├── dropStations.ts      # 6 machining drop stations and manifold routing
    │   ├── safetyProtocols.ts   # DO / DON'T compliance items and failure modes
    │   ├── sopSteps.ts          # 7-step standard operating procedures
    │   └── facultyData.ts       # Laboratory technicians and department faculty
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx       # LM Monogram, sticky navigation, emergency button, mobile drawer
    │   │   └── Footer.tsx       # Minimalist monograph footer, back to top
    │   ├── sections/
    │   │   ├── HeroSection.tsx
    │   │   ├── ExpertiseSection.tsx
    │   │   ├── CircuitSection.tsx         # 8-stage interactive grid
    │   │   ├── SafetyProtocolsSection.tsx # DO / DON'T accordions with search
    │   │   ├── SopSection.tsx             # 7-step SOP illustrated walkthrough
    │   │   ├── DropsSection.tsx           # 6 drop stations live simulator
    │   │   ├── VideoSection.tsx           # Chapter-synced media player
    │   │   ├── CalculatorSection.tsx      # CFM & pressure drop lab calculator
    │   │   └── FacultySection.tsx
    │   ├── modals/
    │   │   ├── EmergencyModal.tsx         # Full-screen emergency depressurization
    │   │   ├── CircuitDetailDrawer.tsx    # 8-stage technical specifications drawer
    │   │   ├── SopStepperModal.tsx        # Interactive SOP step-by-step training
    │   │   └── SopVerificationModal.tsx   # Student compliance sign-off & certificate
    │   └── ui/
    │       ├── GaugeDial.tsx              # SVG analog pressure dial (0–10 Bar)
    │       ├── ValveLever.tsx             # Animated 90° brass lever
    │       └── AudioToggle.tsx            # Pneumatic sound effects toggle
```

---

## 3. Data Schema & Separation of Concerns

All content is structured to allow straightforward updates when real media, video files, and laboratory manuals are uploaded.

### 3.1 Drop Station Model (`DropStation`)
```typescript
export interface DropStation {
  id: string;
  stationNumber: number;
  name: string;
  zone: 'Zone A' | 'Zone B' | 'Zone C';
  zoneLabel: string;
  description: string;
  image: string;
  valveType: string;
  couplingType: string;
  regulatorSpec: string;
  isolationManifold: string;
  nominalPressureBar: number;
  maxPressureBar: number;
  isOpen: boolean;
  actualPressureBar: number;
  scfmDemand: number;
  whipCheckEngaged: boolean;
  toolConnected: boolean;
  connectedToolName?: string;
}
```

### 3.2 Circuit Stage Model (`CircuitStage`)
```typescript
export interface CircuitStage {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  detailedSpecs: {
    label: string;
    value: string;
  }[];
  image: string;
  metricLabel: string;
  metricValue: string;
  isoStandard?: string;
  maintenanceInterval?: string;
}
```

### 3.3 SOP Step Model (`SopStep`)
```typescript
export interface SopStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  image: string;
  statusBadge: string;
  verificationCriteria: string;
  keySafetyRule: string;
  completed?: boolean;
}
```

---

## 4. Pneumatic Simulation Engine (`PneumaticContext`)

The simulation engine maintains reactive state across the application:
1. **Compressor & Header Circuit**:
   - `mainHeaderPressureBar`: default 6.8 Bar (drops to 0.0 Bar upon emergency exhaust)
   - `compressorStatus`: `'running' | 'idling' | 'depressurized'`
   - `totalAirFlowSCFM`: computed from sum of active open drop stations
   - `dewPointCelsius`: fixed at +3.0°C nominal
2. **Station Drop Controls**:
   - `toggleValve(stationId)`: toggles 1/4-turn ball valve open/closed, updates CFM demand, plays pneumatic click/flow audio.
   - `setStationPressure(stationId, pressure)`: adjusts station dial regulator.
   - `toggleWhipCheck(stationId)`: safety interlock simulation.
   - `toggleToolConnection(stationId)`: quick-coupler snap action.
3. **Emergency Depressurization Sequence**:
   - `triggerEmergencyDepressurize()`: initiates audio-visual emergency state, opens rapid exhaust valve, decrements system pressure to 0.0 Bar over 3 seconds, sets all drop gauges to zero.
   - `resetSystem()`: restores compressor pressurization to nominal 6.8 Bar.

---

## 5. Subsystem Specifications

### 5.1 Interactive 6-Drop Pneumatic Simulator
- **Visuals**: 3-column desktop / 1-column mobile grid matching `code.html`.
- **Analog Dial (`GaugeDial`)**: Precision SVG needle rendered with dynamic transform angle (-135° to +135°), green calibrated safe zone (6.0–7.0 Bar), red overpressure zone (>7.5 Bar).
- **Controls**: Interactive 90° ball-cock lever, local regulator slider (0–8 Bar), and interactive disconnect button.
- **Zone Filtering**: Instant filter tabs: "All Outlets (6)", "Zone A: Conventional Machining", "Zone B: CNC Enclosure", "Zone C: Metrology & Assembly".

### 5.2 8-Stage Air Distribution Circuit Deep-Dive Drawer
- **Visuals**: Clean 4-column desktop grid with hover zoom and stage badge.
- **Drawer**: Clicking any stage triggers a sleek right-side slide-out panel containing expanded thermodynamic descriptions, micron filtration graphs, ASME code references, and preventative maintenance checklists.

### 5.3 Safety Standards & Operating Protocols (DO & DON'T)
- **Accordions**: Smooth collapsible rows with green emerald border accents for DO (Mandatory Practices) and crimson red accents for DON'T (Strict Prohibitions).
- **Search & Filter**: Real-time keyword filter input allowing lab personnel to search terms (e.g., "hose", "eye", "embolism", "relief valve").
- **Visual Feedback**: Expanded cards display failure mode physics, OSHA standards, and high-resolution photo callouts.

### 5.4 7-Step SOP Illustrated Walkthrough & Stepper
- **Dual Presentation**:
  1. Complete chronological card list with step verification badges (as seen in `screen.png`).
  2. "Launch Interactive Stepper" button: opens a focused step-by-step training wizard with Next/Back controls, mandatory safety confirmation checkboxes, and audio cue upon final step completion.
- **Student Verification Modal**: Generates a downloadable / printable Laboratory Safety Compliance Token with timestamp and student/technician ID.

### 5.5 Workshop Video Demonstration Interface
- **Media Experience**: Custom HTML5 editorial video container with play/pause, timecode display (`01:36 / 04:48`), scrubber bar, volume, and playback speed.
- **Chapter Navigation**: 7 clickable chapters corresponding to the 7 SOP steps (`00:00`, `00:46`, `01:26`, `02:06`, `02:51`, `03:45`, `04:16`). Clicking a chapter scrubs the player and highlights the active procedure.

### 5.6 Fluid Engineering Lab Calculator
- Interactive tool allowing students to calculate:
  - Pneumatic Tool Air Consumption (SCFM) vs Duty Cycle
  - Estimated Pressure Drop ($\Delta P$) across 1.0-inch ISO Blue Loop based on line velocity and friction factor.

### 5.7 Emergency Depressurization Modal
- Modal triggered via the header "Emergency Depressurize" button or floating emergency button.
- Displays flashing hazard warning, step-by-step DOLE emergency isolation checklist, live pressure dump progress bar, and instant emergency lab contact numbers.

---

## 6. Design System Tokens & Editorial Aesthetics

- **Colors**:
  - `canvas-stone`: `#FAF9F5`
  - `surface-linen`: `#F7F5F0`
  - `surface-card`: `#F4F0E8`
  - `charcoal-ink`: `#1C1B1A`
  - `muted-charcoal`: `#4A4744`
  - `subtle-ash`: `#7E7973`
  - `hairline-divider`: `#DCD7CD`
  - `accent-crimson`: `#8A2528`
  - `accent-emerald`: `#047857`
- **Typography**:
  - Serif Display: `'Bodoni Moda', Georgia, serif`
  - Sans Body: `'Work Sans', sans-serif`
- **Geometry**:
  - Strict 0px border-radius across all containers, cards, and buttons.
  - Semicircular arch masks for hero imagery and historical archive accents.
  - 1px hairline structural borders (`#DCD7CD`).

---

## 7. Verification & Quality Assurance

1. **Build & Type Checking**: `npm run build` / `tsc --noEmit` must pass with zero errors.
2. **Interactive State Verification**:
   - Toggling station valve updates station gauge and total system SCFM.
   - Emergency Depressurize dumps all station pressures to 0.0 Bar within 3s.
   - SOP Stepper advances through all 7 steps and outputs certification dialog.
   - Video chapter click synchronizes timestamp and active highlight.
   - Search filter accurately narrows safety protocol cards.
3. **Visual & Responsive Testing**:
   - Desktop 12-column layout matches `screen.png`.
   - Mobile menu drawer opens and closes smoothly on viewports < 1024px.
   - Zero console errors, broken images have resilient inline SVG fallbacks.

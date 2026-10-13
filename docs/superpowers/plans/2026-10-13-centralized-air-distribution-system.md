# Centralized Compressed-Air Distribution System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, highly interactive Vite + React + TypeScript web application implementing the hyperframed editorial design architecture and pneumatic simulation digital twin for TUP Taguig's Centralized Compressed-Air Distribution System.

**Architecture:** A componentized single-page application orchestrating the editorial monograph aesthetic (Bodoni Moda, Work Sans, 0px border-radius, `#F7F5F0` surface linen, `#1C1B1A` charcoal ink, hairline dividers) connected to a centralized `PneumaticContext` digital twin simulation engine that realistically drives 6 station drop gauges, 1/4-turn ball valves, emergency depressurization cascades, interactive SOP wizard, video player with chapter synchronization, and fluid engineering calculators.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS, Lucide React / Material Symbols Outlined, Web Audio API synthesis.

**Spec:** [`docs/superpowers/specs/2026-10-13-centralized-air-distribution-system-design.md`](file:///c:/Centralized%20Air%20Distribution%20System/docs/superpowers/specs/2026-10-13-centralized-air-distribution-system-design.md)

## Global Constraints
- Primary background: `surface-linen` (`#F7F5F0`), canvas background: `canvas-stone` (`#FAF9F5`)
- Typography: Display/Headlines set in `'Bodoni Moda', Georgia, serif`; Body/Metadata in `'Work Sans', sans-serif`
- Geometry: Strict 0px border-radius across all standard cards, buttons, inputs, and dialogs
- Structural dividers: 1px hairline rules using `#DCD7CD`
- Colors: `charcoal-ink` (`#1C1B1A`), `accent-crimson` (`#8A2528`), `accent-emerald` (`#047857`), `subtle-ash` (`#7E7973`)
- All content and media must be centralized in typed data configuration files in `src/data/` so faculty can seamlessly replace mock items with real lab assets later.
- Build command must pass cleanly: `npm run build` with zero TypeScript errors.

---

### Task 1: Project Scaffolding & Design System Tokens

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Produces: Base React runtime, Tailwind utility classes (`font-editorial`, `hairline-all`, `hairline-b`, `bg-surface-linen`, `text-charcoal-ink`), Google Fonts typography import.

- [ ] **Step 1: Create package.json and install dependencies**

```json
{
  "name": "centralized-air-distribution-system",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.9",
    "vitest": "^2.1.3"
  }
}
```

- [ ] **Step 2: Create Vite, TypeScript, and PostCSS configs**

`vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
});
```

`tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-linen": "#F7F5F0",
        "canvas-stone": "#FAF9F5",
        "surface-card": "#F4F0E8",
        "charcoal-ink": "#1C1B1A",
        "muted-charcoal": "#4A4744",
        "subtle-ash": "#7E7973",
        "hairline-divider": "#DCD7CD",
        "accent-crimson": "#8A2528",
        "accent-emerald": "#047857",
        "wood-terracotta": "#C8956A",
      },
      fontFamily: {
        editorial: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Setup index.html with Google Fonts and index.css with hairline utilities**

`index.html`:
```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CENTRALIZED COMPRESSED-AIR DISTRIBUTION SYSTEM · TUP Taguig</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
  </head>
  <body class="bg-[#F7F5F0] text-[#1C1B1A] antialiased selection:bg-[#E8E2D7] selection:text-[#1C1B1A] min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #F7F5F0;
  color: #1C1B1A;
  font-family: 'Work Sans', sans-serif;
  letter-spacing: 0.01em;
}

.font-editorial {
  font-family: 'Bodoni Moda', Georgia, serif;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.hairline-b { border-bottom: 1px solid #DCD7CD; }
.hairline-t { border-top: 1px solid #DCD7CD; }
.hairline-r { border-right: 1px solid #DCD7CD; }
.hairline-l { border-left: 1px solid #DCD7CD; }
.hairline-all { border: 1px solid #DCD7CD; }

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
  vertical-align: middle;
}
```

- [ ] **Step 4: Run npm install and verify build**

Run: `npm install; npm run build`
Expected: Build passes with `dist/` created.

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json tsconfig.node.json vite.config.ts tailwind.config.js postcss.config.js index.html src/
git commit -m "chore: scaffold Vite React TS project with editorial design tokens"
```

---

### Task 2: Type Definitions & Centralized Modular Data Layer

**Files:**
- Create: `src/types/pneumatic.ts`
- Create: `src/data/circuitStages.ts`
- Create: `src/data/dropStations.ts`
- Create: `src/data/safetyProtocols.ts`
- Create: `src/data/sopSteps.ts`
- Create: `src/data/facultyData.ts`
- Create: `tests/data.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `CircuitStage[]`, `DropStation[]`, `SafetyProtocolGroup[]`, `SopStep[]`, `FacultyMember[]`

- [ ] **Step 1: Write the failing unit test for data fixtures**

`tests/data.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { circuitStages } from '../src/data/circuitStages';
import { dropStations } from '../src/data/dropStations';
import { sopSteps } from '../src/data/sopSteps';

describe('Centralized Data Layer', () => {
  it('should have 8 circuit stages with valid stage numbers', () => {
    expect(circuitStages).toHaveLength(8);
    expect(circuitStages[0].stageNumber).toBe(1);
    expect(circuitStages[7].stageNumber).toBe(8);
  });

  it('should have 6 drop stations across Zone A, B, and C', () => {
    expect(dropStations).toHaveLength(6);
    expect(dropStations.every(d => d.nominalPressureBar > 0)).toBe(true);
  });

  it('should have 7 SOP steps', () => {
    expect(sopSteps).toHaveLength(7);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/data.test.ts`
Expected: FAIL ("Cannot find module ...")

- [ ] **Step 3: Define types and populate data files**

`src/types/pneumatic.ts`:
```typescript
export interface CircuitStage {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  metricLabel: string;
  metricValue: string;
  isoStandard?: string;
  detailedSpecs: { label: string; value: string }[];
}

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
  defaultScfm: number;
}

export interface SafetyProtocolItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  image: string;
  badge: string;
  protocolRef: string;
  detailTitle: string;
  detailBody: string;
  tags: { label: string; highlight?: boolean }[];
  isProhibition: boolean;
}

export interface SopStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  image: string;
  badgePrimary: string;
  badgeSecondary: string;
  verificationCriteria: string;
  keySafetyRule: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  image: string;
  department: string;
}
```

Populate `src/data/circuitStages.ts`, `dropStations.ts`, `safetyProtocols.ts`, `sopSteps.ts`, and `facultyData.ts` with the rich content from `code.html` and `DESIGN.md`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/data.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/ src/data/ tests/data.test.ts
git commit -m "feat: define pneumatic data models and centralized laboratory fixtures"
```

---

### Task 3: Pneumatic Simulation Digital Twin Engine & Acoustic Synthesis

**Files:**
- Create: `src/utils/audio.ts`
- Create: `src/context/PneumaticContext.tsx`
- Create: `tests/context.test.ts`

**Interfaces:**
- Consumes: `dropStations` from `src/data/dropStations.ts`
- Produces: `PneumaticProvider`, `usePneumatics()` hook with `mainHeaderPressure`, `stations`, `toggleValve()`, `setStationPressure()`, `triggerEmergencyDepressurize()`, `resetSystem()`, `audioEnabled`, `toggleAudio()`.

- [ ] **Step 1: Write the failing unit test for pneumatic context state logic**

`tests/context.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { initialPneumaticState, pneumaticReducer } from '../src/context/pneumaticReducer';

describe('Pneumatic Digital Twin Reducer', () => {
  it('toggles valve open and recalculates total SCFM', () => {
    const state = initialPneumaticState;
    const nextState = pneumaticReducer(state, { type: 'TOGGLE_VALVE', stationId: 'outlet-01' });
    expect(nextState.stations['outlet-01'].isOpen).toBe(true);
    expect(nextState.totalScfm).toBeGreaterThan(0);
  });

  it('emergency depressurize drops main header and all station actual pressures to 0', () => {
    const state = initialPneumaticState;
    const nextState = pneumaticReducer(state, { type: 'EMERGENCY_DEPRESSURIZE' });
    expect(nextState.isEmergencyDepressurized).toBe(true);
    expect(nextState.mainHeaderPressure).toBe(0);
    Object.values(nextState.stations).forEach(s => {
      expect(s.actualPressureBar).toBe(0);
    });
  });
});
```

- [ ] **Step 2: Implement audio synthesizer and Pneumatic Context**

`src/utils/audio.ts`: Web Audio API procedural synthesis of pneumatic valve snap, pressure hiss, and emergency horn without requiring external MP3 files.
`src/context/pneumaticReducer.ts` and `src/context/PneumaticContext.tsx`: Full digital twin state with automatic updates.

- [ ] **Step 3: Run test to verify it passes**

Run: `npx vitest run tests/context.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/utils/audio.ts src/context/ tests/context.test.ts
git commit -m "feat: implement pneumatic digital twin simulation engine and audio synthesis"
```

---

### Task 4: Layout Components (Header, Mobile Navigation, Footer, Audio Toggle)

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/AudioToggle.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `usePneumatics()`
- Produces: Sticky top editorial bar, LM monogram, nav smooth-scroll links, emergency depressurize trigger, mobile slide-over menu, architectural footer.

- [ ] **Step 1: Implement AudioToggle component**
`src/components/ui/AudioToggle.tsx`: Minimalist pill button with volume icon and mute state.

- [ ] **Step 2: Implement Header with responsive mobile slide-out drawer**
`src/components/layout/Header.tsx`:
- Desktop: LM monogram (`border border-charcoal-ink`), TUP Taguig title, navigation links (`Our Expertise`, `8-Stage Circuit`, `Safety Protocols`, `7-Step SOP`, `Air Drops (6)`, `Demonstration Video`, `Calculator`), Emergency Depressurize action in crimson.
- Mobile: Hamburger toggle button opening full-screen editorial drawer with smooth transitions.

- [ ] **Step 3: Implement Footer**
`src/components/layout/Footer.tsx`: LM monogram, copyright, ISO 8573 citation, back to top link.

- [ ] **Step 4: Verify in App.tsx and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/layout/ src/components/ui/AudioToggle.tsx src/App.tsx
git commit -m "feat: add editorial header with mobile drawer, audio toggle, and footer"
```

---

### Task 5: Hero & Fluid Distribution Expertise Sections

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/ExpertiseSection.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `usePneumatics()` for live header pressure badge
- Produces: Hero with large `Bodoni Moda` typography, animated CTA button, hairline crosshair; Expertise with primary service bay card.

- [ ] **Step 1: Implement HeroSection**
- Eyebrow: `TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES — TAGUIG CAMPUS`
- Title: `CENTRALIZED COMPRESSED-AIR DISTRIBUTION SYSTEM` (84px responsive serif)
- Subtitle: Certified pneumatic infrastructure description
- Live telemetry badge showing nominal loop pressure (6.8 Bar)
- CTA: "CONSULT COMPLETE SAFETY VIDEO (04:48 MIN)" with pulsing dot
- Architectural hairline divider crosshair (`py-12 flex justify-center w-px h-16`)

- [ ] **Step 2: Implement ExpertiseSection**
- Headline: "OUR EXPERTISE: FLUID DISTRIBUTION"
- Grid with aspect-[16/10] workshop installation visual, Station 00 metadata, Central Supply checkmark indicator.

- [ ] **Step 3: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/sections/HeroSection.tsx src/components/sections/ExpertiseSection.tsx src/App.tsx
git commit -m "feat: implement editorial hero and fluid distribution expertise sections"
```

---

### Task 6: 8-Stage Compressed-Air Circuit & Technical Deep-Dive Drawer

**Files:**
- Create: `src/components/sections/CircuitSection.tsx`
- Create: `src/components/modals/CircuitDetailDrawer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `circuitStages` from `src/data/circuitStages.ts`
- Produces: 8-stage interactive grid, slide-out technical drawer showing thermodynamic dew point, filtration micron curves, ASME vessel code.

- [ ] **Step 1: Implement CircuitDetailDrawer**
Slide-out drawer with backdrop blur, closing X button, high-resolution visual, stage badge, technical parameter table, ISO purity standard, and maintenance guidelines.

- [ ] **Step 2: Implement CircuitSection**
4-column desktop grid (Stage 01 to Stage 08) with hover zoom, hairline borders, metric tags (e.g. `15 kW / 20 HP`, `5.0 Microns`, `+3°C`, `0.01 Micron`, `500 L / 132 Gal`, `1.0 Inch ISO Blue`, `6 Drops`, `6.0 - 7.0 Bar`), and "Inspect Stage" click handler.

- [ ] **Step 3: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/sections/CircuitSection.tsx src/components/modals/CircuitDetailDrawer.tsx src/App.tsx
git commit -m "feat: implement 8-stage pneumatic circuit grid with technical deep-dive drawer"
```

---

### Task 7: Safety Standards & Operating Protocols (DO & DON'T)

**Files:**
- Create: `src/components/sections/SafetyProtocolsSection.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `safetyProtocols` from `src/data/safetyProtocols.ts`
- Produces: Collapsible accordions with search filter input, DO (emerald border) and DON'T (crimson border), failure mode physics breakdown.

- [ ] **Step 1: Implement SafetyProtocolsSection with search filter**
- Search filter input for rapid keyword search (e.g., "hose", "eye", "blowgun", "crimson", "pressure").
- MANDATORY PRACTICES (DO): 4 expandable cards with emerald indicators.
- STRICT PROHIBITIONS (DON'T): 4 expandable cards with crimson indicators.
- Smooth accordion expand/collapse state with rotating chevrons, failure mode callout boxes, and ANSI / OSHA tags.

- [ ] **Step 2: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/sections/SafetyProtocolsSection.tsx src/App.tsx
git commit -m "feat: implement safety protocols section with DO/DON'T accordions and live search"
```

---

### Task 8: 7-Step SOP Illustrated Walkthrough & Interactive Stepper Modal

**Files:**
- Create: `src/components/sections/SopSection.tsx`
- Create: `src/components/modals/SopStepperModal.tsx`
- Create: `src/components/modals/SopVerificationModal.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `sopSteps` from `src/data/sopSteps.ts`
- Produces: 7 chronological illustrated step cards, "Launch Interactive Stepper" button, interactive step-by-step training wizard, and student safety compliance verification pass.

- [ ] **Step 1: Implement SopSection**
7 chronological cards with Step 01 to Step 07 visual thumbnail, title, description, and status tag. "Launch Interactive SOP Walkthrough" primary CTA.

- [ ] **Step 2: Implement SopStepperModal**
Focused training wizard:
- Step counter (e.g. `Step 3 of 7`) and progress bar
- Large step visual and detailed procedure instructions
- Mandatory safety checkpoint checkbox before proceeding
- Previous / Next buttons with sound feedback

- [ ] **Step 3: Implement SopVerificationModal**
Upon completing Step 7, allows the user/student to generate a verified Safety Pass with their name, student ID, timestamp, and ISO 8573 compliance badge (with Print / Save button).

- [ ] **Step 4: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/sections/SopSection.tsx src/components/modals/SopStepperModal.tsx src/components/modals/SopVerificationModal.tsx src/App.tsx
git commit -m "feat: implement 7-step SOP section with interactive training wizard and safety sign-off pass"
```

---

### Task 9: Distribution Network (6 Drops) Simulator with Analog Dial Gauges

**Files:**
- Create: `src/components/ui/GaugeDial.tsx`
- Create: `src/components/ui/ValveLever.tsx`
- Create: `src/components/sections/DropsSection.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `dropStations`, `usePneumatics()`
- Produces: Interactive station drop cards, analog SVG dial gauge with dynamic needle, 1/4-turn ball valve lever, regulator slider, and zone filter tabs.

- [ ] **Step 1: Implement GaugeDial.tsx**
Precision SVG analog gauge:
- Radial scale with tick marks (0 to 10 Bar)
- Green arc for safe operating zone (6.0 - 7.0 Bar)
- Red arc for overpressure (> 7.5 Bar)
- Smooth rotating needle transition (`transform: rotate(angle)`)
- Digital readout below dial (`6.2 Bar / 90 PSI`)

- [ ] **Step 2: Implement ValveLever.tsx**
Animated brass quarter-turn handle:
- Parallel position (Open, 0°) vs Perpendicular position (Closed, 90°)
- Clickable with visual hover state and acoustic valve snap.

- [ ] **Step 3: Implement DropsSection.tsx**
- Filter tabs: All (6), Zone A: Lathes & Milling, Zone B: CNC Enclosure, Zone C: Metrology & Assembly
- 6 station cards featuring:
  - Station name, zone, description, valve spec, coupling spec, regulator spec
  - Live GaugeDial responding to regulator and main pressure
  - Interactive ValveLever (click to open/close air flow)
  - Quick disconnect toggle button
  - Real-time CFM consumption indicator

- [ ] **Step 4: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/ui/GaugeDial.tsx src/components/ui/ValveLever.tsx src/components/sections/DropsSection.tsx src/App.tsx
git commit -m "feat: implement 6-drop pneumatic network simulator with analog gauges and valve toggles"
```

---

### Task 10: Workshop Video Player with Synchronized Chapter Navigation

**Files:**
- Create: `src/components/sections/VideoSection.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `sopSteps`
- Produces: HTML5 video player with interactive canvas/video simulation stream, play/pause, time scrubber, active step badge, and clickable 7-chapter sidebar.

- [ ] **Step 1: Implement VideoSection.tsx**
- Left: Editorial video container with play/pause button, time display (`01:36 / 04:48`), active chapter overlay badge, progress bar.
- Right: Chapters index listing 7 chapters (`00:00`, `00:46`, `01:26`, `02:06`, `02:51`, `03:45`, `04:16`).
- Clicking any chapter jumps the player to the exact timestamp and highlights the corresponding step.

- [ ] **Step 2: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/sections/VideoSection.tsx src/App.tsx
git commit -m "feat: implement workshop video player with synchronized chapter navigation"
```

---

### Task 11: Fluid Engineering Lab Calculator & Faculty Section

**Files:**
- Create: `src/components/sections/CalculatorSection.tsx`
- Create: `src/components/sections/FacultySection.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `facultyMembers` from `src/data/facultyData.ts`
- Produces: Engineering CFM & friction pressure drop calculator; Faculty and laboratory technicians directory.

- [ ] **Step 1: Implement CalculatorSection.tsx**
Pneumatic lab tool:
- Machine Station selector (Conventional Lathe, CNC Milling Center, Die Grinder, Metrology Air Bearing)
- Duty cycle percentage slider (10% to 100%)
- Pipeline length slider (10m to 100m)
- Instant computed results: Required CFM, Expected Pressure Drop ($\Delta P$ in Bar), and Recommended Compressor Run Time.

- [ ] **Step 2: Implement FacultySection.tsx**
3 faculty cards (Prof. Roberto Santos, Engr. Manuel De Leon, Gabriel Mendoza) with portraits, titles, DOLE certifications, and clean editorial framing.

- [ ] **Step 3: Verify and commit**

Run: `npm run build`
Expected: PASS

```bash
git add src/components/sections/CalculatorSection.tsx src/components/sections/FacultySection.tsx src/App.tsx
git commit -m "feat: add fluid engineering lab calculator and faculty directory"
```

---

### Task 12: Emergency Depressurization Modal & Comprehensive Verification

**Files:**
- Create: `src/components/modals/EmergencyModal.tsx`
- Modify: `src/App.tsx`
- Create: `tests/integration.test.tsx`

**Interfaces:**
- Consumes: `usePneumatics()`
- Produces: Full-screen emergency depressurization alarm modal with rapid purge animation, DOLE protocol checklist, system reset action, and integration verification.

- [ ] **Step 1: Implement EmergencyModal.tsx**
- Full-screen modal with crimson warning border and flashing alarm banner
- Live pressure dump progress bar dropping from 6.8 Bar to 0.0 Bar over 3s
- DOLE emergency checklist with tickable items (Main header cutoff, station bleed, safety perimeter, report log)
- Emergency contact numbers (TUP Taguig Campus Clinic, Security Office, Lab Head)
- "System Reset & Re-pressurize" button

- [ ] **Step 2: Write integration tests**
`tests/integration.test.tsx`: Verify end-to-end rendering, navigation link targets, and emergency modal activation.

- [ ] **Step 3: Run all test suites and production build**

Run: `npm test; npm run build`
Expected: All tests pass, production bundle generated cleanly.

- [ ] **Step 4: Launch local dev server and perform visual validation**

Run: `npm run dev` and verify layout, responsiveness, animations, and interactivity.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Centralized Compressed-Air Distribution System web application"
```

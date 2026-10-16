import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { circuitStages } from '../src/data/circuitStages';
import { dropStations } from '../src/data/dropStations';

describe('Centralized Air Distribution System Integration', () => {
  it('renders the complete updated application layout without throwing', () => {
    const html = renderToString(<App />);
    expect(html).toContain('CENTRALIZED COMPRESSED AIR DISTRIBUTION SYSTEM');
    expect(html).toContain('TUP TAGUIG');
    expect(html).toContain('Mechanical And Allied Department');
    expect(html).toContain('OPERATIONAL MANUAL');
    expect(html).toContain('SYSTEM OVERVIEW');
    expect(html).toContain('HOW THE SYSTEM WORKS');
    expect(html).toContain('SYSTEM COMPONENTS');
    expect(html).toContain('Safety Standards');
    expect(html).toContain('STANDARD OPERATING PROCEDURE');
    expect(html).toContain('STEP BY STEP');
    expect(html).toContain('AIR OUTLETS');
    expect(html).toContain('WORKSHOP VIDEO DEMONSTRATION');
    // Calculator and Faculty should be removed
    expect(html).not.toContain('PNEUMATIC LAB SIZING CALCULATOR');
    expect(html).not.toContain('LABORATORY TECHNICIANS & FACULTY');
  });

  it('renders all 7 circuit stages in HTML', () => {
    const html = renderToString(<App />);
    circuitStages.forEach((stage) => {
      const searchName = stage.name.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
    });
  });

  it('renders all 6 machining air drop outlets in HTML', () => {
    const html = renderToString(<App />);
    dropStations.forEach((station) => {
      const searchName = station.name.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
    });
  });
});

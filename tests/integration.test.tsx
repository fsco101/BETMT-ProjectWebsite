import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { circuitStages } from '../src/data/circuitStages';
import { dropStations } from '../src/data/dropStations';

describe('Centralized Air Distribution System Integration', () => {
  it('renders the complete application layout without throwing', () => {
    const html = renderToString(<App />);
    expect(html).toContain('CENTRALIZED COMPRESSED-AIR DISTRIBUTION SYSTEM');
    expect(html).toContain('TUP TAGUIG');
    expect(html).toContain('FLUID DISTRIBUTION');
    expect(html).toContain('THE 8-STAGE AIR DISTRIBUTION CIRCUIT');
    expect(html).toContain('SAFETY STANDARDS');
    expect(html).toContain('THE 7-STEP OPERATING PROCEDURE');
    expect(html).toContain('DISTRIBUTION NETWORK (6 DROPS)');
    expect(html).toContain('WORKSHOP VIDEO DEMONSTRATION');
    expect(html).toContain('PNEUMATIC LAB SIZING CALCULATOR');
    expect(html).toContain('LABORATORY TECHNICIANS');
  });

  it('renders all 8 circuit stages in HTML', () => {
    const html = renderToString(<App />);
    circuitStages.forEach((stage) => {
      // Decode or check normalized name
      const searchName = stage.name.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
    });
  });

  it('renders all 6 machining air drop outlets in HTML', () => {
    const html = renderToString(<App />);
    dropStations.forEach((station) => {
      const searchName = station.name.replace(/&/g, '&amp;');
      const searchManifold = station.isolationManifold.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
      expect(html).toContain(searchManifold);
    });
  });
});

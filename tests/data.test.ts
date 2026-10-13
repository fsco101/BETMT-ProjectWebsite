import { describe, it, expect } from 'vitest';
import { circuitStages } from '../src/data/circuitStages';
import { dropStations } from '../src/data/dropStations';
import { mandatoryPractices, strictProhibitions } from '../src/data/safetyProtocols';
import { sopSteps } from '../src/data/sopSteps';
import { facultyMembers } from '../src/data/facultyData';

describe('Centralized Data Layer Fixtures', () => {
  it('contains exactly 8 circuit stages with valid stage numbers', () => {
    expect(circuitStages).toHaveLength(8);
    expect(circuitStages.map(s => s.stageNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    circuitStages.forEach(stage => {
      expect(stage.name).toBeTruthy();
      expect(stage.metricValue).toBeTruthy();
      expect(stage.detailedSpecs.length).toBeGreaterThan(0);
    });
  });

  it('contains 6 drop stations properly distributed across zones', () => {
    expect(dropStations).toHaveLength(6);
    expect(dropStations.map(d => d.stationNumber)).toEqual([1, 2, 3, 4, 5, 6]);
    const zones = new Set(dropStations.map(d => d.zone));
    expect(zones.has('Zone A')).toBe(true);
    expect(zones.has('Zone B')).toBe(true);
    expect(zones.has('Zone C')).toBe(true);
  });

  it('contains 4 mandatory DO practices and 4 strict DON\'T prohibitions', () => {
    expect(mandatoryPractices).toHaveLength(4);
    expect(strictProhibitions).toHaveLength(4);
    expect(mandatoryPractices.every(p => !p.isProhibition)).toBe(true);
    expect(strictProhibitions.every(p => p.isProhibition)).toBe(true);
  });

  it('contains 7 sequential SOP steps', () => {
    expect(sopSteps).toHaveLength(7);
    expect(sopSteps.map(s => s.stepNumber)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('contains 3 faculty members with roles and credentials', () => {
    expect(facultyMembers).toHaveLength(3);
    facultyMembers.forEach(f => {
      expect(f.name).toBeTruthy();
      expect(f.credentials).toBeTruthy();
    });
  });
});

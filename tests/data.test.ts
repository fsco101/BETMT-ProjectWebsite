import { describe, it, expect } from 'vitest';
import { circuitStages } from '../src/data/circuitStages';
import { dropStations } from '../src/data/dropStations';
import { mandatoryPractices, strictProhibitions, requiredPpeList } from '../src/data/safetyProtocols';
import { sopSteps } from '../src/data/sopSteps';
import { studyOverviewData, researchTeamMembers } from '../src/data/aboutData';

describe('Centralized Data Layer Fixtures', () => {
  it('contains exactly 7 circuit stages with valid stage numbers', () => {
    expect(circuitStages).toHaveLength(7);
    expect(circuitStages.map(s => s.stageNumber)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    circuitStages.forEach(stage => {
      expect(stage.name).toBeTruthy();
      expect(stage.metricValue).toBeTruthy();
      expect(stage.detailedSpecs.length).toBeGreaterThan(0);
      expect(stage.image).toBeTruthy();
    });
  });

  it('contains 6 drop stations properly distributed across workshop zones', () => {
    expect(dropStations).toHaveLength(6);
    expect(dropStations.map(d => d.stationNumber)).toEqual([1, 2, 3, 4, 5, 6]);
    const zones = new Set(dropStations.map(d => d.zone));
    expect(zones.has('Workshop Area')).toBe(true);
    expect(zones.has('CNC Area')).toBe(true);
    expect(zones.has('Advance Machining Area')).toBe(true);

    dropStations.forEach(station => {
      expect(station.area).toBeTruthy();
      expect(station.requiredPsi).toBeTruthy();
      expect(station.use).toBeTruthy();
      expect(station.image).toBeTruthy();
    });
  });

  it('contains 9 mandatory DO practices and 9 strict DON\'T prohibitions plus PPE items', () => {
    expect(mandatoryPractices).toHaveLength(9);
    expect(strictProhibitions).toHaveLength(9);
    expect(requiredPpeList).toHaveLength(5);
    expect(mandatoryPractices.every(p => !p.isProhibition)).toBe(true);
    expect(strictProhibitions.every(p => p.isProhibition)).toBe(true);
  });

  it('contains 15 sequential SOP steps across 3 categories', () => {
    expect(sopSteps).toHaveLength(15);
    expect(sopSteps.map(s => s.stepNumber)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ]);
    const categories = new Set(sopSteps.map(s => s.category));
    expect(categories.has('A. COMPRESSOR START UP')).toBe(true);
    expect(categories.has('B. OPERATING PROCEDURE')).toBe(true);
    expect(categories.has('D. SHUTTING DOWN AND STORING')).toBe(true);
  });

  it('contains comprehensive study overview and 5 research team profiles', () => {
    expect(studyOverviewData.title).toBeTruthy();
    expect(studyOverviewData.abstract).toContain('Centralized Compressed Air Distribution System');
    expect(studyOverviewData.objectives).toHaveLength(4);
    expect(studyOverviewData.methodology).toHaveLength(5);
    expect(studyOverviewData.advisers).toHaveLength(2);

    expect(researchTeamMembers).toHaveLength(5);
    researchTeamMembers.forEach((member) => {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.program).toContain('Mechanical');
      expect(member.contributions.length).toBeGreaterThan(0);
    });
  });
});

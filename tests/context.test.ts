import { describe, it, expect } from 'vitest';
import { initialPneumaticState, pneumaticReducer } from '../src/context/pneumaticReducer';

describe('Pneumatic Digital Twin Reducer', () => {
  it('starts with 6.8 Bar main header and closed valves at 0 actual pressure', () => {
    expect(initialPneumaticState.mainHeaderPressure).toBe(6.8);
    expect(initialPneumaticState.totalScfm).toBe(0);
    expect(initialPneumaticState.isEmergencyDepressurized).toBe(false);
    expect(initialPneumaticState.stations['outlet-01'].isOpen).toBe(false);
    expect(initialPneumaticState.stations['outlet-01'].actualPressureBar).toBe(0);
  });

  it('toggles valve open and calculates actual station pressure & flow demand', () => {
    const s1 = pneumaticReducer(initialPneumaticState, { type: 'TOGGLE_VALVE', stationId: 'outlet-01' });
    expect(s1.stations['outlet-01'].isOpen).toBe(true);
    expect(s1.stations['outlet-01'].actualPressureBar).toBe(6.2);
    expect(s1.totalScfm).toBeGreaterThan(0);

    // Toggle closed returns pressure to 0
    const s2 = pneumaticReducer(s1, { type: 'TOGGLE_VALVE', stationId: 'outlet-01' });
    expect(s2.stations['outlet-01'].isOpen).toBe(false);
    expect(s2.stations['outlet-01'].actualPressureBar).toBe(0);
    expect(s2.totalScfm).toBe(0);
  });

  it('adjusts station regulator pressure and recalculates pressure while open', () => {
    const openState = pneumaticReducer(initialPneumaticState, { type: 'TOGGLE_VALVE', stationId: 'outlet-01' });
    const adjustedState = pneumaticReducer(openState, {
      type: 'SET_STATION_PRESSURE',
      stationId: 'outlet-01',
      pressureBar: 5.5,
    });
    expect(adjustedState.stations['outlet-01'].regulatorBar).toBe(5.5);
    expect(adjustedState.stations['outlet-01'].actualPressureBar).toBe(5.5);
  });

  it('emergency depressurization evacuates all pressure lines to 0 Bar', () => {
    // Open two stations first
    let state = pneumaticReducer(initialPneumaticState, { type: 'TOGGLE_VALVE', stationId: 'outlet-01' });
    state = pneumaticReducer(state, { type: 'TOGGLE_VALVE', stationId: 'outlet-02' });
    expect(state.totalScfm).toBeGreaterThan(0);

    // Trigger emergency depressurization
    const emergencyState = pneumaticReducer(state, { type: 'EMERGENCY_DEPRESSURIZE' });
    expect(emergencyState.isEmergencyDepressurized).toBe(true);
    expect(emergencyState.mainHeaderPressure).toBe(0);
    expect(emergencyState.totalScfm).toBe(0);
    expect(emergencyState.compressorStatus).toBe('depressurized');

    Object.values(emergencyState.stations).forEach(station => {
      expect(station.actualPressureBar).toBe(0);
      expect(station.scfmDemand).toBe(0);
    });
  });

  it('resets system from emergency mode back to operational 6.8 Bar', () => {
    const emergencyState = pneumaticReducer(initialPneumaticState, { type: 'EMERGENCY_DEPRESSURIZE' });
    const restoredState = pneumaticReducer(emergencyState, { type: 'RESET_SYSTEM' });

    expect(restoredState.isEmergencyDepressurized).toBe(false);
    expect(restoredState.mainHeaderPressure).toBe(6.8);
    expect(restoredState.compressorStatus).toBe('running');
  });

  it('toggles audio enabled state', () => {
    expect(initialPneumaticState.audioEnabled).toBe(false);
    const soundOn = pneumaticReducer(initialPneumaticState, { type: 'TOGGLE_AUDIO' });
    expect(soundOn.audioEnabled).toBe(true);
  });
});

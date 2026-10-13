import { PneumaticState, StationLiveState } from '../types/pneumatic';
import { dropStations } from '../data/dropStations';

export type PneumaticAction =
  | { type: 'TOGGLE_VALVE'; stationId: string }
  | { type: 'SET_STATION_PRESSURE'; stationId: string; pressureBar: number }
  | { type: 'TOGGLE_WHIP_CHECK'; stationId: string }
  | { type: 'TOGGLE_TOOL_CONNECTION'; stationId: string }
  | { type: 'EMERGENCY_DEPRESSURIZE' }
  | { type: 'RESET_SYSTEM' }
  | { type: 'SET_PURGE_PROGRESS'; progress: number }
  | { type: 'TOGGLE_AUDIO' };

const initialStations: Record<string, StationLiveState> = {};
dropStations.forEach(station => {
  initialStations[station.id] = {
    isOpen: false,
    regulatorBar: station.nominalPressureBar,
    actualPressureBar: 0, // closed valve = 0 pressure downstream
    scfmDemand: 0,
    whipCheckEngaged: true,
    toolConnected: true,
  };
});

export const initialPneumaticState: PneumaticState = {
  mainHeaderPressure: 6.8,
  compressorStatus: 'running',
  stations: initialStations,
  totalScfm: 0,
  dewPointCelsius: 3.0,
  isEmergencyDepressurized: false,
  purgeProgress: 0,
  audioEnabled: false,
};

function calculateTotalScfm(stations: Record<string, StationLiveState>): number {
  return Object.entries(stations).reduce((sum, [id, state]) => {
    if (!state.isOpen) return sum;
    const stationDef = dropStations.find(d => d.id === id);
    if (!stationDef) return sum;
    // Scale SCFM with pressure ratio
    const ratio = state.regulatorBar / (stationDef.nominalPressureBar || 1);
    return sum + Number((stationDef.defaultScfm * ratio).toFixed(1));
  }, 0);
}

export function pneumaticReducer(state: PneumaticState, action: PneumaticAction): PneumaticState {
  switch (action.type) {
    case 'TOGGLE_VALVE': {
      if (state.isEmergencyDepressurized) return state;
      const currentStation = state.stations[action.stationId];
      if (!currentStation) return state;

      const newIsOpen = !currentStation.isOpen;
      const actualPressure = newIsOpen
        ? Math.min(state.mainHeaderPressure, currentStation.regulatorBar)
        : 0;

      const stationDef = dropStations.find(d => d.id === action.stationId);
      const scfm = newIsOpen && stationDef ? stationDef.defaultScfm : 0;

      const updatedStations = {
        ...state.stations,
        [action.stationId]: {
          ...currentStation,
          isOpen: newIsOpen,
          actualPressureBar: actualPressure,
          scfmDemand: scfm,
        },
      };

      return {
        ...state,
        stations: updatedStations,
        totalScfm: calculateTotalScfm(updatedStations),
      };
    }

    case 'SET_STATION_PRESSURE': {
      if (state.isEmergencyDepressurized) return state;
      const currentStation = state.stations[action.stationId];
      if (!currentStation) return state;

      const boundedPressure = Math.max(0, Math.min(8.0, Number(action.pressureBar.toFixed(1))));
      const actualPressure = currentStation.isOpen
        ? Math.min(state.mainHeaderPressure, boundedPressure)
        : 0;

      const updatedStations = {
        ...state.stations,
        [action.stationId]: {
          ...currentStation,
          regulatorBar: boundedPressure,
          actualPressureBar: actualPressure,
        },
      };

      return {
        ...state,
        stations: updatedStations,
        totalScfm: calculateTotalScfm(updatedStations),
      };
    }

    case 'TOGGLE_WHIP_CHECK': {
      const currentStation = state.stations[action.stationId];
      if (!currentStation) return state;
      return {
        ...state,
        stations: {
          ...state.stations,
          [action.stationId]: {
            ...currentStation,
            whipCheckEngaged: !currentStation.whipCheckEngaged,
          },
        },
      };
    }

    case 'TOGGLE_TOOL_CONNECTION': {
      const currentStation = state.stations[action.stationId];
      if (!currentStation) return state;
      const nextConnected = !currentStation.toolConnected;
      return {
        ...state,
        stations: {
          ...state.stations,
          [action.stationId]: {
            ...currentStation,
            toolConnected: nextConnected,
            isOpen: nextConnected ? currentStation.isOpen : false,
            actualPressureBar: nextConnected && currentStation.isOpen ? currentStation.actualPressureBar : 0,
          },
        },
      };
    }

    case 'EMERGENCY_DEPRESSURIZE': {
      const purgedStations: Record<string, StationLiveState> = {};
      Object.entries(state.stations).forEach(([id, st]) => {
        purgedStations[id] = {
          ...st,
          actualPressureBar: 0,
          scfmDemand: 0,
        };
      });

      return {
        ...state,
        mainHeaderPressure: 0,
        compressorStatus: 'depressurized',
        isEmergencyDepressurized: true,
        purgeProgress: 100,
        totalScfm: 0,
        stations: purgedStations,
      };
    }

    case 'SET_PURGE_PROGRESS': {
      return {
        ...state,
        purgeProgress: action.progress,
      };
    }

    case 'RESET_SYSTEM': {
      const restoredStations: Record<string, StationLiveState> = {};
      Object.entries(state.stations).forEach(([id, st]) => {
        restoredStations[id] = {
          ...st,
          actualPressureBar: st.isOpen ? Math.min(6.8, st.regulatorBar) : 0,
        };
      });

      return {
        ...state,
        mainHeaderPressure: 6.8,
        compressorStatus: 'running',
        isEmergencyDepressurized: false,
        purgeProgress: 0,
        stations: restoredStations,
        totalScfm: calculateTotalScfm(restoredStations),
      };
    }

    case 'TOGGLE_AUDIO': {
      return {
        ...state,
        audioEnabled: !state.audioEnabled,
      };
    }

    default:
      return state;
  }
}

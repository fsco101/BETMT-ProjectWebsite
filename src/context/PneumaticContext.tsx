import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PneumaticState } from '../types/pneumatic';
import { initialPneumaticState, pneumaticReducer } from './pneumaticReducer';
import { playValveClickSound, playAirHissSound, playEmergencyAlarmSound } from '../utils/audio';

interface PneumaticContextValue {
  state: PneumaticState;
  toggleValve: (stationId: string) => void;
  setStationPressure: (stationId: string, pressureBar: number) => void;
  toggleWhipCheck: (stationId: string) => void;
  toggleToolConnection: (stationId: string) => void;
  triggerEmergencyDepressurize: () => void;
  resetSystem: () => void;
  toggleAudio: () => void;
}

const PneumaticContext = createContext<PneumaticContextValue | undefined>(undefined);

export const PneumaticProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(pneumaticReducer, initialPneumaticState);

  const toggleValve = (stationId: string) => {
    if (state.audioEnabled) {
      playValveClickSound();
      if (!state.stations[stationId]?.isOpen) {
        setTimeout(() => playAirHissSound(0.2), 50);
      }
    }
    dispatch({ type: 'TOGGLE_VALVE', stationId });
  };

  const setStationPressure = (stationId: string, pressureBar: number) => {
    dispatch({ type: 'SET_STATION_PRESSURE', stationId, pressureBar });
  };

  const toggleWhipCheck = (stationId: string) => {
    if (state.audioEnabled) playValveClickSound();
    dispatch({ type: 'TOGGLE_WHIP_CHECK', stationId });
  };

  const toggleToolConnection = (stationId: string) => {
    if (state.audioEnabled) playValveClickSound();
    dispatch({ type: 'TOGGLE_TOOL_CONNECTION', stationId });
  };

  const triggerEmergencyDepressurize = () => {
    if (state.audioEnabled) {
      playEmergencyAlarmSound();
      playAirHissSound(1.2);
    }
    dispatch({ type: 'EMERGENCY_DEPRESSURIZE' });
  };

  const resetSystem = () => {
    if (state.audioEnabled) playValveClickSound();
    dispatch({ type: 'RESET_SYSTEM' });
  };

  const toggleAudio = () => {
    dispatch({ type: 'TOGGLE_AUDIO' });
  };

  return (
    <PneumaticContext.Provider
      value={{
        state,
        toggleValve,
        setStationPressure,
        toggleWhipCheck,
        toggleToolConnection,
        triggerEmergencyDepressurize,
        resetSystem,
        toggleAudio,
      }}
    >
      {children}
    </PneumaticContext.Provider>
  );
};

export function usePneumatics(): PneumaticContextValue {
  const context = useContext(PneumaticContext);
  if (!context) {
    throw new Error('usePneumatics must be used within a PneumaticProvider');
  }
  return context;
}

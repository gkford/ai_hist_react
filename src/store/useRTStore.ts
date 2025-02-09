import { create } from 'zustand'
import type { ResourceKey } from './useResourceStore'

interface RTState {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  human_energy_focus: number | null;  // Allow null
  eating_focus: number | null;  // Value between 0 and 1, or null
}

interface RTStore {
  states: Record<string, RTState>;
  updateState: (rtId: string, newState: RTState) => void;
}

export const useRTStore = create<RTStore>((set) => ({
  states: {
    eating_chicken: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: null,
      eating_focus: 1
    },
    hunt: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null
    },
    think: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null
    }
  },
  updateState: (rtId, newState) => set((state) => {
    // Get all RTs with the same focus type as the one being updated
    const focusType = newState.eating_focus !== null ? 'eating_focus' : 'human_energy_focus';
    const otherRTs = Object.entries(state.states).filter(([id, rt]) => 
      id !== rtId && rt[focusType] !== null
    );

    // Calculate the new total including the updated RT
    const newFocusValue = newState[focusType] || 0;
    const otherTotal = otherRTs.reduce((sum, [, rt]) => sum + (rt[focusType] || 0), 0);
    const total = newFocusValue + otherTotal;

    // If total would exceed 1, adjust other RTs proportionally
    if (total > 100) {  // Using 100 since our sliders work on 0-100 scale
      const reduction = (total - 100) / otherRTs.length;
      const newStates = { ...state.states };
      
      // Update the target RT
      newStates[rtId] = newState;

      // Adjust other RTs
      otherRTs.forEach(([id, rt]) => {
        const currentValue = rt[focusType] || 0;
        const newValue = Math.max(0, currentValue - reduction);
        newStates[id] = {
          ...rt,
          [focusType]: newValue
        };
      });

      return { states: newStates };
    }

    // If total is fine, just update the one RT
    return {
      states: {
        ...state.states,
        [rtId]: newState
      }
    };
  })
}))

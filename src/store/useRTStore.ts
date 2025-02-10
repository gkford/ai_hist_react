import { create } from 'zustand'
import type { ResourceKey } from './useResourceStore'

type RTStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';
type Priority = 'high' | 'low' | 'none';

interface RTState {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  human_energy_focus: number | null;  // Allow null
  eating_focus: number | null;  // Value between 0 and 1, or null
  thought_focus: number | null;  // Add thought focus tracking
  hide: boolean;
  status: RTStatus;
  thoughtInvested: number;
  priority: Priority;
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
      eating_focus: 1,
      thought_focus: null,
      hide: false,
      status: 'discovered',
      thoughtInvested: 0,
      priority: 'none'
    },
    hunt: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'unthoughtof',
      thoughtInvested: 0,
      priority: 'none'
    },
    think: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'discovered',
      thoughtInvested: 0,
      priority: 'none'
    },
    gather_food: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 75,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'discovered',
      thoughtInvested: 0,
      priority: 'high'
    },
    non_verbal_communication: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'unthoughtof',
      thoughtInvested: 0,
      priority: 'none'
    }
  },
  updateState: (rtId, newState) => set((state) => {
    // Only sum human_energy_focus across RTs
    if (newState.human_energy_focus !== null) {
      const otherRTs = Object.entries(state.states).filter(([id]) => id !== rtId);
      const otherTotal = otherRTs.reduce((sum, [, rt]) => 
        sum + (rt.human_energy_focus || 0), 0);
      const total = (newState.human_energy_focus || 0) + otherTotal;

      // If total would exceed max (100), reduce others proportionally
      if (total > 100) {
        const excess = total - 100;
        const newStates = { ...state.states };
        
        // Calculate total of other RTs that have focus
        const activeRTs = otherRTs.filter(([, rt]) => (rt.human_energy_focus || 0) > 0);
        const activeTotal = activeRTs.reduce((sum, [, rt]) => sum + (rt.human_energy_focus || 0), 0);
        
        // Reduce each active RT proportionally
        activeRTs.forEach(([id, rt]) => {
          const currentFocus = rt.human_energy_focus || 0;
          const reduction = (excess * (currentFocus / activeTotal));
          newStates[id] = {
            ...rt,
            human_energy_focus: Math.max(0, currentFocus - reduction)
          };
        });

        // Update the target RT
        newStates[rtId] = newState;

        return { states: newStates };
      }
    }

    // If no adjustment needed, just update the one RT
    return {
      states: {
        ...state.states,
        [rtId]: newState
      }
    };
  })
}))

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

const recalculateEnergyFocus = (states: Record<string, RTState>) => {
  // Get all RTs with non-null human_energy_focus
  const activeRTs = Object.values(states).filter(rt => 
    rt.status === 'discovered' && 
    rt.human_energy_focus !== null
  );

  // Get counts by priority
  const highPriorityRTs = activeRTs.filter(rt => rt.priority === 'high');
  const lowPriorityRTs = activeRTs.filter(rt => rt.priority === 'low');
  const nonePriorityRTs = activeRTs.filter(rt => rt.priority === 'none');

  // Create new states object
  const newStates = { ...states };

  // Case 1: All same priority
  if (activeRTs.every(rt => rt.priority === activeRTs[0].priority)) {
    const energyPerRT = 100 / activeRTs.length;
    activeRTs.forEach(rt => {
      const rtId = Object.keys(states).find(key => states[key] === rt)!;
      newStates[rtId] = {
        ...rt,
        human_energy_focus: rt.priority === 'none' ? 0 : energyPerRT
      };
    });
  }
  // Case 2: Mix of priorities
  else {
    // High priority RTs split 75%
    const highEnergyPerRT = highPriorityRTs.length > 0 ? 75 / highPriorityRTs.length : 0;
    highPriorityRTs.forEach(rt => {
      const rtId = Object.keys(states).find(key => states[key] === rt)!;
      newStates[rtId] = {
        ...rt,
        human_energy_focus: highEnergyPerRT
      };
    });

    // Low priority RTs split 25%
    const lowEnergyPerRT = lowPriorityRTs.length > 0 ? 25 / lowPriorityRTs.length : 0;
    lowPriorityRTs.forEach(rt => {
      const rtId = Object.keys(states).find(key => states[key] === rt)!;
      newStates[rtId] = {
        ...rt,
        human_energy_focus: lowEnergyPerRT
      };
    });

    // None priority RTs get 0
    nonePriorityRTs.forEach(rt => {
      const rtId = Object.keys(states).find(key => states[key] === rt)!;
      newStates[rtId] = {
        ...rt,
        human_energy_focus: 0
      };
    });
  }

  return newStates;
};

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
      human_energy_focus: 25,
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
    // Prevent all RTs from being set to 'none'
    if (newState.priority === 'none') {
      const otherActiveRTs = Object.entries(state.states)
        .filter(([id, rt]) => 
          id !== rtId && 
          rt.status === 'discovered' && 
          rt.human_energy_focus !== null && 
          rt.priority !== 'none'
        );
      
      if (otherActiveRTs.length === 0) {
        return state; // Don't allow the change
      }
    }

    // Create new states with the updated RT
    const intermediateStates = {
      ...state.states,
      [rtId]: newState
    };

    // Recalculate all energy focus values based on priorities
    const finalStates = recalculateEnergyFocus(intermediateStates);

    return { states: finalStates };
  })
}))

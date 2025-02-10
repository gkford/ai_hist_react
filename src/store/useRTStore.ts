import { create } from 'zustand'
import type { ResourceKey } from './useResourceStore'
import { useEffectsStore, type EffectState } from './useEffectsStore'

type RTStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';
export type Priority = 'high' | 'low' | 'none';

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
  thought_priority: Priority;
}

interface RTStore {
  states: Record<string, RTState>;
  updateState: (rtId: string, newState: RTState) => void;
}

const recalculateThoughtFocus = (rtStates: Record<string, RTState>, effectStates: Record<string, EffectState>) => {
  // Get all entities that can receive thought focus - only unthoughtof or imagined
  const activeRTs = Object.values(rtStates).filter(rt => 
    rt.status === 'unthoughtof' || rt.status === 'imagined'
  );
  const activeEffects = Object.values(effectStates).filter(effect => 
    effect.status === 'unthoughtof' || effect.status === 'imagined'
  );

  const allEntities = [...activeRTs, ...activeEffects];

  // Get counts by priority
  const highPriorityEntities = allEntities.filter(e => e.thought_priority === 'high');
  const lowPriorityEntities = allEntities.filter(e => e.thought_priority === 'low');

  // Create new state objects
  const newRTStates = { ...rtStates };
  const newEffectStates = { ...effectStates };

  // If all entities have the same priority, split focus equally
  if (allEntities.every(e => e.thought_priority === allEntities[0].thought_priority)) {
    const focusPerEntity = allEntities[0].thought_priority === 'none' ? 0 : 100 / allEntities.length;
    
    // Apply focus to RTs
    Object.entries(rtStates).forEach(([id, rt]) => {
      if (rt.thought_focus !== null) {
        newRTStates[id] = {
          ...rt,
          thought_focus: focusPerEntity
        };
      }
    });
    
    // Apply focus to effects
    Object.entries(effectStates).forEach(([id, effect]) => {
      newEffectStates[id] = {
        ...effect,
        thought_focus: focusPerEntity
      };
    });
  }
  // Handle mixed priorities
  else {
    // High priority entities split 75%
    const highFocusPerEntity = highPriorityEntities.length > 0 ? 75 / highPriorityEntities.length : 0;
    // Low priority entities split 25%
    const lowFocusPerEntity = lowPriorityEntities.length > 0 ? 25 / lowPriorityEntities.length : 0;

    // Apply focus values
    Object.entries(rtStates).forEach(([id, rt]) => {
      if (rt.thought_focus !== null) {
        newRTStates[id] = {
          ...rt,
          thought_focus: 
            rt.thought_priority === 'high' ? highFocusPerEntity :
            rt.thought_priority === 'low' ? lowFocusPerEntity :
            0
        };
      }
    });

    Object.entries(effectStates).forEach(([id, effect]) => {
      newEffectStates[id] = {
        ...effect,
        thought_focus: 
          effect.thought_priority === 'high' ? highFocusPerEntity :
          effect.thought_priority === 'low' ? lowFocusPerEntity :
          0
      };
    });
  }

  return { rtStates: newRTStates, effectStates: newEffectStates };
};

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
  // Case 2: Special cases and mix of priorities
  else {
    // If there's only one RT with non-none priority, it gets 100%
    if (highPriorityRTs.length + lowPriorityRTs.length === 1) {
      const activeRT = highPriorityRTs[0] || lowPriorityRTs[0];
      const rtId = Object.keys(states).find(key => states[key] === activeRT)!;
      newStates[rtId] = {
        ...activeRT,
        human_energy_focus: 100
      };
      
      // Set all none priority RTs to 0
      nonePriorityRTs.forEach(rt => {
        const rtId = Object.keys(states).find(key => states[key] === rt)!;
        newStates[rtId] = {
          ...rt,
          human_energy_focus: 0
        };
      });
    }
    // Regular mixed priority case
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
  }

  return newStates;
};

export const useRTStore = create<RTStore>((set) => {
  const initialStates = {
    eating_chicken: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: null,
      eating_focus: 1,
      thought_focus: null,
      hide: false,
      status: 'discovered' as RTStatus,
      thoughtInvested: 0,
      priority: 'none' as Priority,
      thought_priority: 'none' as Priority
    },
    hunt: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'unthoughtof' as RTStatus,
      thoughtInvested: 0,
      priority: 'none' as Priority,
      thought_priority: 'none' as Priority
    },
    think: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 25,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'discovered' as RTStatus,
      thoughtInvested: 0,
      priority: 'low' as Priority,
      thought_priority: 'none' as Priority
    },
    gather_food: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 75,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'discovered' as RTStatus,
      thoughtInvested: 0,
      priority: 'high' as Priority,
      thought_priority: 'none' as Priority
    },
    non_verbal_communication: {
      inbound_paid: {},
      outbound_owed: {},
      human_energy_focus: 0,
      eating_focus: null,
      thought_focus: 0,
      hide: false,
      status: 'unthoughtof' as RTStatus,
      thoughtInvested: 0,
      priority: 'none' as Priority,
      thought_priority: 'none' as Priority
    }
  };

  const calculatedInitialStates = recalculateEnergyFocus(initialStates);

  return {
    states: calculatedInitialStates,
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

      // Check thought priority similarly
      if (newState.thought_priority === 'none') {
        const otherActiveThoughtEntities = [
          ...Object.entries(state.states)
            .filter(([id, rt]) => 
              id !== rtId && 
              (rt.status === 'unthoughtof' || rt.status === 'imagined') &&
              rt.thought_priority !== 'none'
            ),
          ...Object.values(useEffectsStore.getState().effects)
            .filter(effect => 
              (effect.status === 'unthoughtof' || effect.status === 'imagined') &&
              effect.thought_priority !== 'none'
            )
        ];
        
        if (otherActiveThoughtEntities.length === 0) {
          return state;
        }
      }

      // Create new states with the updated RT
      const intermediateStates = {
        ...state.states,
        [rtId]: newState
      };

      // Recalculate all energy focus values based on priorities
      const energyFocusStates = recalculateEnergyFocus(intermediateStates);

      // Recalculate thought focus across both stores
      const { rtStates, effectStates } = recalculateThoughtFocus(
        energyFocusStates,
        useEffectsStore.getState().effects
      );

      // Update effects store with new thought focus values
      useEffectsStore.setState({ effects: effectStates });

      return { states: rtStates };
    })
  };
});

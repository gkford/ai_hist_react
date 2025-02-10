import { create } from 'zustand'
import type { ResourceKey } from './useResourceStore'

export type RTStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';

export interface RTState {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  hide: boolean;
  status: RTStatus;
  thoughtInvested: number;
}

interface RTStore {
  states: Record<string, RTState>;
  updateState: (rtId: string, newState: RTState) => void;
}


export const useRTStore = create<RTStore>((set) => {
  const initialStates = {
    eating_chicken: {
      inbound_paid: {},
      outbound_owed: {},
      hide: false,
      status: 'discovered' as RTStatus,
      thoughtInvested: 0
    },
    hunt: {
      inbound_paid: {},
      outbound_owed: {},
      hide: false,
      status: 'unthoughtof' as RTStatus,
      thoughtInvested: 0
    },
    think: {
      inbound_paid: {},
      outbound_owed: {},
      hide: false,
      status: 'discovered' as RTStatus,
      thoughtInvested: 0
    },
    gather_food: {
      inbound_paid: {},
      outbound_owed: {},
      hide: false,
      status: 'discovered' as RTStatus,
      thoughtInvested: 0
    },
    non_verbal_communication: {
      inbound_paid: {},
      outbound_owed: {},
      hide: false,
      status: 'unthoughtof' as RTStatus,
      thoughtInvested: 0
    }
  };

  return {
    states: initialStates,
    updateState: (rtId, newState) => set((state) => ({
      states: {
        ...state.states,
        [rtId]: newState
      }
    })
  };
});

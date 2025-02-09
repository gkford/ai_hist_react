import { create } from 'zustand'
import type { ResourceKey } from './useResourceStore'

interface RTState {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
}

interface RTStore {
  states: Record<string, RTState>;
  updateState: (rtId: string, newState: RTState) => void;
}

export const useRTStore = create<RTStore>((set) => ({
  states: {
    eating_chicken: {
      inbound_paid: {},
      outbound_owed: {}
    },
    hunt: {
      inbound_paid: {},
      outbound_owed: {}
    },
    think: {
      inbound_paid: {},
      outbound_owed: {}
    }
  },
  updateState: (rtId, newState) => set((state) => ({
    states: {
      ...state.states,
      [rtId]: newState
    }
  }))
}))

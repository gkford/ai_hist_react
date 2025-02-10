import { create } from 'zustand'
import { Priority } from './useRTStore'

type EffectStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';

export interface EffectState {
  status: EffectStatus;
  activated: boolean;
  thoughtInvested: number;
  thought_focus: number;
  thought_priority: Priority;
}

interface EffectsStore {
  effects: Record<string, EffectState>;
  updateEffect: (effectId: string, newState: Partial<EffectState>) => void;
}

export const useEffectsStore = create<EffectsStore>((set) => ({
  effects: {
    early_stone_tools: {
      status: 'unthoughtof',
      activated: false,
      thoughtInvested: 0,
      thought_focus: 0,
      thought_priority: 'none' as Priority
    }
  },
  updateEffect: (effectId, newState) => set((state) => ({
    effects: {
      ...state.effects,
      [effectId]: {
        ...state.effects[effectId],
        ...newState
      }
    }
  }))
}))

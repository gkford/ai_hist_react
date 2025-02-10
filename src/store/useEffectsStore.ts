import { create } from 'zustand'

type EffectStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';

interface EffectState {
  status: EffectStatus;
  activated: boolean;
  thoughtInvested: number;
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
      thoughtInvested: 0
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

import { create } from 'zustand';
import type { ResourceKey } from './useResourceStore';

type Priority = 'none' | 'low' | 'high';

interface FocusResourceProps {
  high: number;
  low: number;
  none: number;
}

interface FocusStore {
  humanEnergy: FocusResourceProps;
  population: FocusResourceProps;
  thought: FocusResourceProps;
  updateResourceProps: (resource: ResourceKey | 'thoughts', props: FocusResourceProps) => void;
}

export const useFocusStore = create<FocusStore>((set) => ({
  humanEnergy: { high: 0, low: 0, none: 0 },
  population: { high: 0, low: 0, none: 0 },
  thought: { high: 0, low: 0, none: 0 },
  updateResourceProps: (resource, props) => 
    set((state) => ({
      ...state,
      [resource]: props
    }))
}));

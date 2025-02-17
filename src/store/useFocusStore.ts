// import { create } from 'zustand';
// import type { ResourceKey } from './useResourceStore';

// interface FocusResourceProps {
//   high: number;
//   low: number;
//   none: number;
// }

// interface FocusStore {
//   resourceProps: Record<ResourceKey | 'thoughts', FocusResourceProps>;
//   updateResourceProps: (resource: ResourceKey | 'thoughts', props: FocusResourceProps) => void;
// }

// export const useFocusStore = create<FocusStore>((set) => ({
//   resourceProps: {
//     humanEnergy: { high: 0, low: 0, none: 0 },
//     population: { high: 0, low: 0, none: 0 },
//     thoughts: { high: 0, low: 0, none: 0 },
//     food: { high: 0, low: 0, none: 0 },
//     knowledge: { high: 0, low: 0, none: 0 }
//   },
//   updateResourceProps: (resource, props) => 
//     set((state) => ({
//       resourceProps: {
//         ...state.resourceProps,
//         [resource]: props
//       }
//     }))
// }));

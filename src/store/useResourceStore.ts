import { create } from "zustand"

export type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy' | 'population'

interface Resource {
  amount: number;
  icon: string;
  key: ResourceKey;
}

interface ResourceStore {
  resources: Record<ResourceKey, Resource>;
  updateResource: (key: ResourceKey, delta: number) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: {
    food: { amount: 30, icon: "🍖", key: "food" },
    knowledge: { amount: 0, icon: "📚", key: "knowledge" },
    thoughts: { amount: 0, icon: "💭", key: "thoughts" },
    humanEnergy: { amount: 0, icon: "⚡", key: "humanEnergy" },
    population: { amount: 10, icon: "👥", key: "population" },
  },
  updateResource: (key: ResourceKey, delta: number) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          amount: Math.max(0, state.resources[key].amount + delta)
        }
      }
    }))
}));

// Helper hook for cleaner component usage
export const useResource = (key: ResourceKey) => {
  return useResourceStore((state) => state.resources[key]);
};

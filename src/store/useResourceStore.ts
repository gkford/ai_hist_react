import { create } from "zustand"

export type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy' | 'population'

interface Resource {
  amount: number;
  icon: string;
  key: ResourceKey;
  isRate?: boolean;
  amountProduced?: number; // Track how much was produced this tick
  usage: number | null; // can be null when no production occurred
}

interface ResourceStore {
  resources: Record<ResourceKey, Resource>;
  updateResource: (key: ResourceKey, delta: number) => void;
  setResourceUsage: (key: ResourceKey, usage: number) => void;
  trackProducedAmount: (key: ResourceKey) => void; // New function to snapshot produced amount
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: {
    food: { amount: 30, icon: "🍖", key: "food", usage: 0 },
    knowledge: { amount: 0, icon: "📚", key: "knowledge", usage: 0 },
    thoughts: { amount: 0, icon: "💭", key: "thoughts", isRate: true, usage: 0 },
    humanEnergy: { amount: 0, icon: "⚡", key: "humanEnergy", isRate: true, usage: 0 },
    population: { amount: 10, icon: "👥", key: "population", usage: 0 },
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
    })),
  setResourceUsage: (key: ResourceKey, usage: number | null) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          usage: usage === null ? null : Math.min(1, Math.max(0, usage))
        }
      }
    })),
  trackProducedAmount: (key: ResourceKey) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          amountProduced: state.resources[key].amount
        }
      }
    }))
}));

// Helper hook for cleaner component usage
export const useResource = (key: ResourceKey) => {
  return useResourceStore((state) => state.resources[key]);
};

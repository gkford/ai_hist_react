import { create } from "zustand"

export type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy' | 'population'

interface Resource {
  amount: number;
  icon: string;
  key: ResourceKey;
  isRate: boolean;
  bonus: number;
}

interface ResourceStore {
  resources: Record<ResourceKey, Resource>;
  spendResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) => void;
  produceResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) => void;
  setResourceBonus: (key: ResourceKey, bonus: number) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: {
    food: { amount: 30, icon: "🍖", key: "food", isRate: false, bonus: 1 },
    knowledge: { amount: 0, icon: "📚", key: "knowledge", isRate: false, bonus: 1 },
    thoughts: { amount: 0, icon: "💭", key: "thoughts", isRate: true, bonus: 1 },
    humanEnergy: { amount: 0, icon: "⚡", key: "humanEnergy", isRate: true, bonus: 1 },
    population: { amount: 10, icon: "👥", key: "population", isRate: false, bonus: 1 },
  },
  spendResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          amount: Math.max(0, state.resources[key].amount - amount),
          ...additionalUpdates
        }
      }
    })),
  produceResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          amount: state.resources[key].amount + amount,
          ...additionalUpdates
        }
      }
    })),
  addResource: (key: ResourceKey, amount: number) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          amount: state.resources[key].amount + amount
        }
      }
    })),
  setResourceBonus: (key: ResourceKey, bonus: number) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          bonus: Math.max(0, bonus)
        }
      }
    }))
}));

// Helper hook for cleaner component usage
export const useResource = (key: ResourceKey) => {
  return useResourceStore((state) => state.resources[key]);
};

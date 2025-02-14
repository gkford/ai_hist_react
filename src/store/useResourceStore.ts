import { create } from "zustand"

export type ResourceKey = 'food' | 'knowledge' | 'thoughts1' | 'thoughts2' | 'thoughts3' | 'thoughts4' | 'humanEnergy' | 'population'

interface Resource {
  amount: number[];
  icon: string;
  key: ResourceKey;
  isRate: boolean;
  bonus: number;
  amountProducedThisSecond: number[];
  amountSpentThisSecond: number[];
  available?: number;
  total?: number;
  max_storage?: number;  // Maximum storage capacity (for food)
}

interface ResourceStore {
  resources: Record<ResourceKey, Resource>;
  spendResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) => void;
  produceResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) => void;
  setResourceBonus: (key: ResourceKey, bonus: number) => void;
  progressToNextSecond: () => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: {
    food: { amount: [15], max_storage: 20, icon: "🍖", key: "food", isRate: false, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    knowledge: { amount: [0], icon: "📚", key: "knowledge", isRate: false, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts1: { amount: [0], icon: "💭", key: "thoughts1", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts2: { amount: [0], icon: "💭💭", key: "thoughts2", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts3: { amount: [0], icon: "💭💭💭", key: "thoughts3", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts4: { amount: [0], icon: "💭💭💭💭", key: "thoughts4", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    humanEnergy: { amount: [0], icon: "⚡", key: "humanEnergy", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    population: { 
      amount: [10], 
      icon: "👥", 
      key: "population", 
      isRate: false, 
      bonus: 1, 
      amountProducedThisSecond: [0], 
      amountSpentThisSecond: [0],
      available: 0,
      total: 10
    },
  },
  progressToNextSecond: () => 
    set((state) => {
      const newResources = { ...state.resources };
      
      // Process each resource
      Object.entries(newResources).forEach(([key, resource]) => {
        // Add new values at start of arrays and trim to 6 items
        newResources[key as ResourceKey] = {
          ...resource,
          amount: [resource.amount[0], ...resource.amount].slice(0, 6),
          amountProducedThisSecond: [0, ...resource.amountProducedThisSecond].slice(0, 6),
          amountSpentThisSecond: [0, ...resource.amountSpentThisSecond].slice(0, 6)
        };
      });

      return { resources: newResources };
    }),

  spendResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) =>
    set((state) => ({
      resources: {
        ...state.resources,
        [key]: {
          ...state.resources[key],
          amount: [
            Math.max(0, state.resources[key].amount[0] - amount),
            ...state.resources[key].amount.slice(1)
          ],
          amountSpentThisSecond: [
            amount,
            ...state.resources[key].amountSpentThisSecond
          ],
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
          amount: [
            state.resources[key].amount[0] + (amount * state.resources[key].bonus),
            ...state.resources[key].amount.slice(1)
          ],
          amountProducedThisSecond: [
            amount * state.resources[key].bonus,
            ...state.resources[key].amountProducedThisSecond
          ],
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
          amount: [
            state.resources[key].amount[0] + amount,
            ...state.resources[key].amount.slice(1)
          ]
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

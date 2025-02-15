import { create } from "zustand"
import { logger } from "@/lib/logger"
import { useCardsStore } from '@/store/useCardsStore'

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
    food: { amount: [5], max_storage: 20, icon: "🍖", key: "food", isRate: false, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    knowledge: { amount: [0], icon: "📚", key: "knowledge", isRate: false, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts1: { amount: [0], icon: "💭", key: "thoughts1", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts2: { amount: [0], icon: "🧠", key: "thoughts2", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts3: { amount: [0], icon: "⚡", key: "thoughts3", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
    thoughts4: { amount: [0], icon: "💻", key: "thoughts4", isRate: true, bonus: 1, amountProducedThisSecond: [0], amountSpentThisSecond: [0] },
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
    set((state) => {
      const currentAmount = state.resources[key].amount[0];
      const newAmount = Math.max(0, currentAmount - amount);
      logger.log(`spendResource: ${key} current=${currentAmount} spending=${amount} new=${newAmount}`);
      return {
        resources: {
          ...state.resources,
          [key]: {
            ...state.resources[key],
            amount: [
              newAmount,
              ...state.resources[key].amount.slice(1)
            ],
            amountSpentThisSecond: [
              amount,
              ...state.resources[key].amountSpentThisSecond
            ],
            ...additionalUpdates
          }
        }
      };
    }),
  produceResource: (key: ResourceKey, amount: number, additionalUpdates?: Record<string, any>) =>
    set((state) => {
      const resource = state.resources[key];
      const bonus = resource.bonus;
      const baseProduction = amount * bonus;
      let extraBonus = 0;
      // Only apply bonus for food and thought resource types
      if (["food", "thoughts1", "thoughts2", "thoughts3", "thoughts4"].includes(key)) {
        const cards = useCardsStore.getState().cardStates;
        Object.values(cards).forEach(card => {
          if (card.discovery_state.current_status === 'discovered' && card.ongoingEffects?.resourceModifiers) {
            const mod = card.ongoingEffects.resourceModifiers[key];
            if (mod && typeof mod === 'string') {
              // Expect modifier like "+10%"
              const parsed = parseFloat(mod.replace(/[+\s%]/g, ''));
              if (!isNaN(parsed)) {
                extraBonus += parsed;  // additional percentage bonus
              }
            }
          }
        });
      }
      const extraProduction = baseProduction * (extraBonus / 100);
      const totalProduction = baseProduction + extraProduction;
      
      return {
        resources: {
          ...state.resources,
          [key]: {
            ...resource,
            amount: [
              resource.amount[0] + totalProduction,
              ...resource.amount.slice(1)
            ],
            amountProducedThisSecond: [
              totalProduction,
              ...resource.amountProducedThisSecond
            ],
            ...additionalUpdates
          }
        }
      };
    }),
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

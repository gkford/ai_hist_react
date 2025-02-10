import { create } from "zustand"
import { useEffectsStore } from './useEffectsStore'
import { effects } from '@/data/effects'

export type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy' | 'population'



interface ResourceConfig {
  storable: boolean
  negable: boolean
  icon: string
}

interface ResourceState {
  amount: number
}

interface ResourceStore {
  resources: Record<ResourceKey, ResourceState>
  config: Record<ResourceKey, ResourceConfig>
  
  setResourceAmount: (resource: ResourceKey, amount: number) => void
  updateResources: (changes: Partial<Record<ResourceKey, number>>) => void
}

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  food: { storable: true, negable: false, icon: '🍗' },
  knowledge: { storable: true, negable: false, icon: '📚' },
  thoughts: { storable: false, negable: false, icon: '💭' },
  humanEnergy: { storable: false, negable: false, icon: '⚡' },
  population: { storable: true, negable: false, icon: '👤' }
}

export const useResourceStore = create<ResourceStore>((set, get) => ({


  resources: {
    food: { amount: 30 },
    knowledge: { amount: 0 },
    thoughts: { amount: 0 },
    humanEnergy: { amount: 0 },
    population: { amount: 10 }
  },
  
  config: resourceConfigs,

  setResourceAmount: (resource, amount) => set(state => ({
    resources: {
      ...state.resources,
      [resource]: {
        amount: Number(amount.toFixed(3))
      }
    }
  })),

  updateResources: (changes: Partial<Record<ResourceKey, number>>) =>
    set((state) => {
      const updatedResources = { ...state.resources }
      for (const key in changes) {
        const resourceKey = key as ResourceKey
        let amount = changes[resourceKey]!

        // Apply production multiplier effects if they exist and are activated
        const effectsStore = useEffectsStore.getState();
        const activeEffects = Object.entries(effects)
          .filter(([id, effect]) => 
            effect.type === 'resourceProductionMultiplier' 
            && effect.targetResource === resourceKey
            && amount > 0  // Only apply to production, not consumption
            && effectsStore.effects[id]?.activated
          )
          .map(([, effect]) => effect)

        // Apply all relevant multipliers
        amount = activeEffects.reduce(
          (value, effect) => value * (effect.multiplier || 1), 
          amount
        )

        updatedResources[resourceKey] = {
          amount: Number(amount.toFixed(3))
        }
      }
      return { resources: updatedResources }
    }),

  // Removed addResource and subtractResource as their behavior will be reworked


}))

// Helper hooks for cleaner component usage

export const useResource = (resource: ResourceKey) => {
  const store = useResourceStore()
  return {
    amount: store.resources[resource].amount,
    icon: store.config[resource].icon,
    key: resource,
    name: resource,  // Using the key as the name for now
    setAmount: (amount: number) => store.setResourceAmount(resource, amount)
  }
}

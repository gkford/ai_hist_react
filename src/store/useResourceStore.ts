import { create } from "zustand"

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
        updatedResources[key as ResourceKey] = {
          amount: Number(changes[key as ResourceKey]!.toFixed(3))
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

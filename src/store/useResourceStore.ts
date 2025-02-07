import { create } from "zustand"

type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy'

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
}

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  food: { storable: true, negable: false, icon: '🍗' },
  knowledge: { storable: true, negable: false, icon: '📚' },
  thoughts: { storable: false, negable: false, icon: '💭' },
  humanEnergy: { storable: false, negable: false, icon: '⚡' }
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  resources: {
    food: { amount: 5 },
    knowledge: { amount: 0 },
    thoughts: { amount: 0 },
    humanEnergy: { amount: 0 }
  },
  
  config: resourceConfigs,

  setResourceAmount: (resource, amount) => set(state => ({
    resources: {
      ...state.resources,
      [resource]: {
        amount
      }
    }
  }))
}))

// Helper hooks for cleaner component usage
export const useResource = (resource: ResourceKey) => {
  const store = useResourceStore()
  return {
    amount: store.resources[resource].amount,
    icon: store.config[resource].icon,
    setAmount: (amount: number) => store.setResourceAmount(resource, amount)
  }
}

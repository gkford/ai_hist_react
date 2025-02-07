import { create } from "zustand"

type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy'

interface ResourceConfig {
  storable: boolean
  negable: boolean
}

interface ResourceState {
  amount: number
  rate: number
}

interface ResourceStore {
  resources: Record<ResourceKey, ResourceState>
  config: Record<ResourceKey, ResourceConfig>
  
  setResourceRate: (resource: ResourceKey, rate: number) => void
  setResourceAmount: (resource: ResourceKey, amount: number) => void
  tick: () => void
}

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  food: { storable: true, negable: false },
  knowledge: { storable: true, negable: false },
  thoughts: { storable: false, negable: false },
  humanEnergy: { storable: false, negable: false }
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  resources: {
    food: { amount: 0, rate: 0 },
    knowledge: { amount: 0, rate: 0 },
    thoughts: { amount: 0, rate: 0 },
    humanEnergy: { amount: 0, rate: 0 }
  },
  
  config: resourceConfigs,

  setResourceRate: (resource, rate) => set(state => ({
    resources: {
      ...state.resources,
      [resource]: {
        ...state.resources[resource],
        rate
      }
    }
  })),

  setResourceAmount: (resource, amount) => set(state => ({
    resources: {
      ...state.resources,
      [resource]: {
        ...state.resources[resource],
        amount
      }
    }
  })),

  tick: () => {
    const { resources, config } = get()
    
    set({
      resources: Object.entries(resources).reduce((acc, [key, resource]) => {
        const resourceKey = key as ResourceKey
        const cfg = config[resourceKey]
        
        let newAmount = resource.amount + resource.rate
        
        // Apply storage and negation rules
        if (!cfg.storable) {
          newAmount = Math.max(0, newAmount)
        }
        if (!cfg.negable) {
          newAmount = Math.max(0, newAmount)
        }
        
        return {
          ...acc,
          [key]: {
            ...resource,
            amount: newAmount
          }
        }
      }, {} as Record<ResourceKey, ResourceState>)
    })
  }
}))

// Helper hooks for cleaner component usage
export const useResource = (resource: ResourceKey) => {
  const store = useResourceStore()
  return {
    amount: store.resources[resource].amount,
    rate: store.resources[resource].rate,
    setRate: (rate: number) => store.setResourceRate(resource, rate),
    setAmount: (amount: number) => store.setResourceAmount(resource, amount)
  }
}

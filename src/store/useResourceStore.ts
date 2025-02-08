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
  addResource: (resource: ResourceKey, amount: number) => number  // Returns whole number increase
  subtractResource: (resource: ResourceKey, amount: number) => number | null  // Returns whole number decrease or null if not possible
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
    food: { amount: 5 },
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
        amount
      }
    }
  })),

  addResource: (resource, amountToAdd) => {
    const currentAmount = get().resources[resource].amount
    const newAmount = currentAmount + amountToAdd
    
    // Calculate whole number increase
    const previousWholeNumber = Math.floor(currentAmount)
    const newWholeNumber = Math.floor(newAmount)
    const wholeNumberIncrease = newWholeNumber - previousWholeNumber

    // Update the store
    set(state => ({
      resources: {
        ...state.resources,
        [resource]: {
          amount: newAmount
        }
      }
    }))

    return wholeNumberIncrease
  },

  subtractResource: (resource, amountToSubtract) => {
    const currentAmount = get().resources[resource].amount
    const newAmount = currentAmount - amountToSubtract

    if (newAmount < 0) {
      return null  // Cannot subtract this amount
    }
    
    // Calculate whole number decrease
    const previousWholeNumber = Math.floor(currentAmount)
    const newWholeNumber = Math.floor(newAmount)
    const wholeNumberDecrease = previousWholeNumber - newWholeNumber

    // Update the store
    set(state => ({
      resources: {
        ...state.resources,
        [resource]: {
          amount: newAmount
        }
      }
    }))

    return wholeNumberDecrease
  }
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

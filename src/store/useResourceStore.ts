import { create } from "zustand"

export type ResourceKey = 'food' | 'knowledge' | 'thoughts' | 'humanEnergy' | 'population'

interface TransformationState {
  focusProp: number  // Between 0 and 1
}

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
  transformations: Record<string, TransformationState>
  
  setResourceAmount: (resource: ResourceKey, amount: number) => void
  addResource: (resource: ResourceKey, amount: number) => number  // Returns whole number increase
  subtractResource: (resource: ResourceKey, amount: number) => number | null  // Returns whole number decrease or null if not possible
  setTransformationFocus: (transformationId: string, focus: number) => void
}

const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  food: { storable: true, negable: false, icon: '🍗' },
  knowledge: { storable: true, negable: false, icon: '📚' },
  thoughts: { storable: false, negable: false, icon: '💭' },
  humanEnergy: { storable: false, negable: false, icon: '⚡' },
  population: { storable: true, negable: false, icon: '👤' }
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  transformations: {
    "eating_chicken": {
      focusProp: 1
    }
  },

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
        amount: Number(amount.toFixed(3))
      }
    }
  })),

  addResource: (resource, amountToAdd) => {
    const currentAmount = get().resources[resource].amount
    const newAmount = Number((currentAmount + amountToAdd).toFixed(3))
    
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
    const newAmount = Number((currentAmount - amountToSubtract).toFixed(3))

    if (newAmount < 0) {
      return null  // Cannot subtract this amount
    }
    
    // Calculate whole number decrease - if we start above a whole number and end at or below it
    const wholeNumberDecrease = currentAmount % 1 > 0 && // Must start with a fractional part
                             Math.floor(currentAmount) > Math.floor(newAmount + 0.001) ? 1 : 0 
                             // Updated epsilon to match 3 decimal precision

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
  },

  setTransformationFocus: (transformationId, focus) => set(state => ({
    transformations: {
      ...state.transformations,
      [transformationId]: {
        ...state.transformations[transformationId],
        focusProp: Math.max(0, Math.min(1, focus)) // Clamp between 0 and 1
      }
    }
  })),

}))

// Helper hooks for cleaner component usage
export const useTransformation = (transformationId: string) => {
  const store = useResourceStore()
  return {
    focusProp: store.transformations[transformationId]?.focusProp ?? 0,
    setFocus: (focus: number) => store.setTransformationFocus(transformationId, focus)
  }
}
export const useResource = (resource: ResourceKey) => {
  const store = useResourceStore()
  return {
    amount: store.resources[resource].amount,
    icon: store.config[resource].icon,
    setAmount: (amount: number) => store.setResourceAmount(resource, amount)
  }
}

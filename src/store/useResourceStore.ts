import { create } from "zustand"

interface ResourceStore {
  food: number
  knowledge: number
  thoughts: number
  humanEnergy: number

  foodProduction: number
  foodConsumption: number
  netFoodRate: number
  knowledgeRate: number
  thoughtsRate: number
  humanEnergyRate: number

  setFood: (amount: number) => void
  setFoodProduction: (rate: number) => void
  setFoodConsumption: (rate: number) => void
  
  setKnowledge: (amount: number) => void
  setKnowledgeRate: (rate: number) => void

  setThoughts: (amount: number) => void
  setThoughtsRate: (rate: number) => void
  setHumanEnergyRate: (rate: number) => void

  tick: () => void
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  food: 0,
  knowledge: 0,
  thoughts: 0,
  humanEnergy: 0,

  foodProduction: 0,
  foodConsumption: 0,
  netFoodRate: 0,
  knowledgeRate: 0,
  thoughtsRate: 0,
  humanEnergyRate: 0,

  setFood: (amount) => set({ food: amount }),
  setFoodProduction: (rate) => set((state) => ({ 
    foodProduction: rate,
    netFoodRate: rate + state.foodConsumption
  })),
  setFoodConsumption: (rate) => set((state) => ({ 
    foodConsumption: rate,
    netFoodRate: state.foodProduction + rate
  })),

  setKnowledge: (amount) => set({ knowledge: amount }),
  setKnowledgeRate: (rate) => set({ knowledgeRate: rate }),

  setThoughts: (amount) => set({ thoughts: amount }),
  setThoughtsRate: (rate) => set({ thoughtsRate: rate }),
  setHumanEnergyRate: (rate) => set({ humanEnergyRate: rate }),

  tick: () => {
    const { 
      food, netFoodRate, 
      knowledge, knowledgeRate, 
      thoughts, thoughtsRate,
      humanEnergy, humanEnergyRate 
    } = get()
    
    // Prevent human energy from going negative
    const newHumanEnergy = Math.max(0, humanEnergy + humanEnergyRate)
    
    set({
      food: Math.max(0, food + netFoodRate),
      knowledge: knowledge + knowledgeRate,
      thoughts: thoughts + thoughtsRate,
      humanEnergy: newHumanEnergy
    })
  }
}))

import { create } from "zustand"

interface ResourceStore {
  food: number
  knowledge: number
  thoughts: number

  foodProduction: number
  foodConsumption: number
  knowledgeRate: number
  thoughtsRate: number

  setFood: (amount: number) => void
  setFoodProduction: (rate: number) => void
  setFoodConsumption: (rate: number) => void
  
  setKnowledge: (amount: number) => void
  setKnowledgeRate: (rate: number) => void

  setThoughts: (amount: number) => void
  setThoughtsRate: (rate: number) => void

  tick: () => void
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  food: 0,
  knowledge: 0,
  thoughts: 0,

  foodProduction: 0,
  foodConsumption: 0,
  knowledgeRate: 0,
  thoughtsRate: 0,

  setFood: (amount) => set({ food: amount }),
  setFoodProduction: (rate) => set({ foodProduction: rate }),
  setFoodConsumption: (rate) => set({ foodConsumption: rate }),

  setKnowledge: (amount) => set({ knowledge: amount }),
  setKnowledgeRate: (rate) => set({ knowledgeRate: rate }),

  setThoughts: (amount) => set({ thoughts: amount }),
  setThoughtsRate: (rate) => set({ thoughtsRate: rate }),

  tick: () => {
    const { food, foodProduction, foodConsumption, knowledge, knowledgeRate, thoughts, thoughtsRate } = get()
    // Add each rate to its resource
    set({
      food: food + foodProduction + foodConsumption,
      knowledge: knowledge + knowledgeRate,
      thoughts: thoughts + thoughtsRate
    })
  }
}))

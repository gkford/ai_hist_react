import { create } from "zustand"

interface ResourceStore {
  food: number
  knowledge: number
  thoughts: number

  foodRate: number
  knowledgeRate: number
  thoughtsRate: number

  setFood: (amount: number) => void
  setFoodRate: (rate: number) => void

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

  foodRate: 0,
  knowledgeRate: 0,
  thoughtsRate: 0,

  setFood: (amount) => set({ food: amount }),
  setFoodRate: (rate) => set({ foodRate: rate }),

  setKnowledge: (amount) => set({ knowledge: amount }),
  setKnowledgeRate: (rate) => set({ knowledgeRate: rate }),

  setThoughts: (amount) => set({ thoughts: amount }),
  setThoughtsRate: (rate) => set({ thoughtsRate: rate }),

  tick: () => {
    const { food, foodRate, knowledge, knowledgeRate, thoughts, thoughtsRate } = get()
    // Add each rate to its resource
    set({
      food: food + foodRate,
      knowledge: knowledge + knowledgeRate,
      thoughts: thoughts + thoughtsRate
    })
  }
}))

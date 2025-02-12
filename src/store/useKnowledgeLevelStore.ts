import { create } from 'zustand'

interface KnowledgeLevelState {
  level: number
  thresholds: number[]
  setLevel: (level: number) => void
}

export const useKnowledgeLevelStore = create<KnowledgeLevelState>((set) => ({
  level: 1,
  thresholds: [0, 10, 100, 1000], // Knowledge amounts needed for each level
  setLevel: (level) => set({ level }),
}))

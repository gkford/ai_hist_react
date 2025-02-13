import { create } from 'zustand'

interface GameLoopStore {
  isRunning: boolean
  processingTick: boolean
  foodShortageCount: number
  toggleRunning: () => void
  setRunning: (running: boolean) => void
  setProcessingTick: (processing: boolean) => void
  incrementFoodShortage: () => void
  resetFoodShortage: () => void
}

export const useGameLoopStore = create<GameLoopStore>((set) => ({
  isRunning: true,
  processingTick: false,
  foodShortageCount: 0,
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setRunning: (running: boolean) => set({ isRunning: running }),
  setProcessingTick: (processing: boolean) => set({ processingTick: processing }),
  incrementFoodShortage: () => set((state) => ({ foodShortageCount: state.foodShortageCount + 1 })),
  resetFoodShortage: () => set({ foodShortageCount: 0 })
}))

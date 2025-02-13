import { create } from 'zustand'

interface GameLoopStore {
  isRunning: boolean
  processingTick: boolean
  foodShortageCount: number
  hasShownEnergyMessage: boolean
  toggleRunning: () => void
  setRunning: (running: boolean) => void
  setProcessingTick: (processing: boolean) => void
  incrementFoodShortage: () => void
  resetFoodShortage: () => void
  setHasShownEnergyMessage: (shown: boolean) => void
}

export const useGameLoopStore = create<GameLoopStore>((set) => ({
  isRunning: true,
  processingTick: false,
  foodShortageCount: 0,
  hasShownEnergyMessage: false,
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setRunning: (running: boolean) => set({ isRunning: running }),
  setProcessingTick: (processing: boolean) => set({ processingTick: processing }),
  incrementFoodShortage: () => set((state) => ({ foodShortageCount: state.foodShortageCount + 1 })),
  resetFoodShortage: () => set({ foodShortageCount: 0 }),
  setHasShownEnergyMessage: (shown: boolean) => set({ hasShownEnergyMessage: shown })
}))

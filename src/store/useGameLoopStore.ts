import { create } from 'zustand'

interface GameLoopStore {
  isRunning: boolean
  processingTick: boolean
  toggleRunning: () => void
  setRunning: (running: boolean) => void
  setProcessingTick: (processing: boolean) => void
}

export const useGameLoopStore = create<GameLoopStore>((set) => ({
  isRunning: true,
  processingTick: false,
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setRunning: (running: boolean) => set({ isRunning: running }),
  setProcessingTick: (processing: boolean) => set({ processingTick: processing })
}))

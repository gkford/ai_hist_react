import { create } from 'zustand'

interface GameLoopStore {
  isRunning: boolean
  intervalId: number | null
  setIntervalId: (id: number | null) => void
  start: () => void
  stop: () => void
}

export const useGameLoopStore = create<GameLoopStore>((set) => ({
  isRunning: false,
  intervalId: null,
  setIntervalId: (id) => set({ intervalId: id }),
  start: () => set({ isRunning: true }),
  stop: () => set({ isRunning: false })
}))

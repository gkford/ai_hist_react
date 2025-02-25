import { create } from 'zustand'

interface GameLoopStore {
  isRunning: boolean
  processingTick: boolean
  foodShortageCount: number
  hasShownEnergyMessage: boolean
  thoughtsUnusedTimer: number | null
  isThoughtDialogOpen: boolean
  toggleRunning: () => void
  setRunning: (running: boolean) => void
  setProcessingTick: (processing: boolean) => void
  incrementFoodShortage: () => void
  resetFoodShortage: () => void
  startThoughtsUnusedTimer: () => void
  clearThoughtsUnusedTimer: () => void
  openThoughtDialog: () => void
  closeThoughtDialog: () => void
  setHasShownEnergyMessage: (shown: boolean) => void
}

export const useGameLoopStore = create<GameLoopStore>((set, get) => ({
  isRunning: true,
  processingTick: false,
  foodShortageCount: 0,
  hasShownEnergyMessage: false,
  thoughtsUnusedTimer: null,
  isThoughtDialogOpen: false,
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setRunning: (running: boolean) => set({ isRunning: running }),
  setProcessingTick: (processing: boolean) => set({ processingTick: processing }),
  incrementFoodShortage: () => set((state) => ({ foodShortageCount: state.foodShortageCount + 1 })),
  resetFoodShortage: () => set({ foodShortageCount: 0 }),
  setHasShownEnergyMessage: (shown: boolean) => set({ hasShownEnergyMessage: shown }),
  startThoughtsUnusedTimer: () => {
    // Clear any existing timer first
    get().clearThoughtsUnusedTimer();
    
    // Set a new timer for 5 seconds
    const timerId = window.setTimeout(() => {
      // Pause the game
      set({ isRunning: false, isThoughtDialogOpen: true });
    }, 5000);
    
    set({ thoughtsUnusedTimer: timerId });
  },
  clearThoughtsUnusedTimer: () => {
    const { thoughtsUnusedTimer } = get();
    if (thoughtsUnusedTimer !== null) {
      window.clearTimeout(thoughtsUnusedTimer);
      set({ thoughtsUnusedTimer: null });
    }
  },
  openThoughtDialog: () => set({ isThoughtDialogOpen: true }),
  closeThoughtDialog: () => {
    set({ isThoughtDialogOpen: false });
    // Resume the game when dialog is closed
    set({ isRunning: true });
  }
}))

import { create } from 'zustand'
import { useCardsStore } from './useCardsStore'
import { useResourceStore } from './useResourceStore'

interface GameLoopStore {
  isRunning: boolean
  processingTick: boolean
  foodShortageCount: number
  hasShownEnergyMessage: boolean
  thoughtsUnusedTimer: number | null
  isThoughtDialogOpen: boolean
  thoughtDialogEnabled: boolean
  isResearchDialogOpen: boolean
  toggleRunning: () => void
  setRunning: (running: boolean) => void
  setProcessingTick: (processing: boolean) => void
  incrementFoodShortage: () => void
  resetFoodShortage: () => void
  startThoughtsUnusedTimer: () => void
  clearThoughtsUnusedTimer: () => void
  openThoughtDialog: () => void
  closeThoughtDialog: () => void
  openResearchDialog: () => void
  closeResearchDialog: () => void
  setHasShownEnergyMessage: (shown: boolean) => void
  toggleThoughtDialog: () => void
}

export const useGameLoopStore = create<GameLoopStore>((set, get) => ({
  isRunning: true,
  processingTick: false,
  foodShortageCount: 0,
  hasShownEnergyMessage: false,
  thoughtsUnusedTimer: null,
  isThoughtDialogOpen: false,
  thoughtDialogEnabled: false,
  isResearchDialogOpen: false,
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setRunning: (running: boolean) => set({ isRunning: running }),
  setProcessingTick: (processing: boolean) => set({ processingTick: processing }),
  incrementFoodShortage: () => set((state) => ({ foodShortageCount: state.foodShortageCount + 1 })),
  resetFoodShortage: () => set({ foodShortageCount: 0 }),
  setHasShownEnergyMessage: (shown: boolean) => set({ hasShownEnergyMessage: shown }),
  startThoughtsUnusedTimer: () => {
    // If timer is already running or feature is disabled, don't start a new one
    if (get().thoughtsUnusedTimer !== null || !get().thoughtDialogEnabled) {
      return;
    }
    
    console.log("Starting thoughts unused timer");
    
    // Set a new timer for 5 seconds
    const timerId = window.setTimeout(() => {
      console.log("Timer expired - showing thought dialog");
      // Pause the game and show dialog
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
  },
  toggleThoughtDialog: () => {
    const newState = !get().thoughtDialogEnabled;
    set({ thoughtDialogEnabled: newState });
    
    // If we're turning it on, check if we need to start the timer
    if (newState) {
      // Check if any card has priority set to 'on'
      const anyCardHasPriority = Object.values(useCardsStore.getState().cardStates)
        .some(card => card.discovery_state.priority === 'on');
      
      // Check if thoughts are being produced
      const resourceStore = useResourceStore.getState();
      const totalThoughtsProduced = 
        (resourceStore.resources.thoughts1.amountProducedThisSecond[0] || 0) +
        (resourceStore.resources.thoughts2.amountProducedThisSecond[0] || 0) +
        (resourceStore.resources.thoughts3.amountProducedThisSecond[0] || 0) +
        (resourceStore.resources.thoughts4.amountProducedThisSecond[0] || 0);
      
      // If thoughts are being produced but not applied, start the timer
      if (totalThoughtsProduced > 0 && !anyCardHasPriority) {
        get().startThoughtsUnusedTimer();
      }
    }
  },
  openResearchDialog: () => set({ isResearchDialogOpen: true }),
  closeResearchDialog: () => set({ isResearchDialogOpen: false })
}))

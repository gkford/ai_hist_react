import { create } from 'zustand'
import { useCardsStore } from './useCardsStore'
import { useGameLoopStore } from './useGameLoopStore'

interface DiscoveryStore {
  // Track cards that have been discovered but not acknowledged
  pendingAcknowledgments: Record<string, {
    message?: string;
    timestamp: number;
    unlockedCards: string[];
    tipText?: string;
  }>;
  
  // Track newly available cards for research
  newlyAvailableCards: string[];
  
  // Dialog state
  isResearchDialogOpen: boolean;
  
  // Actions
  addDiscovery: (cardId: string, message?: string, unlockedCards?: string[]) => void;
  acknowledgeDiscovery: (cardId: string) => void;
  openResearchDialog: () => void;
  closeResearchDialog: () => void;
}

export const useDiscoveryStore = create<DiscoveryStore>((set) => ({
  pendingAcknowledgments: {},
  newlyAvailableCards: [],
  isResearchDialogOpen: false,
  
  addDiscovery: (cardId, message, unlockedCards = []) => {
    set(state => ({
      pendingAcknowledgments: {
        ...state.pendingAcknowledgments,
        [cardId]: {
          message,
          timestamp: Date.now(),
          unlockedCards
        }
      },
      newlyAvailableCards: [...state.newlyAvailableCards, ...unlockedCards]
    }));
  },
  
  acknowledgeDiscovery: (cardId) => {
    set(state => {
      const { [cardId]: removed, ...remaining } = state.pendingAcknowledgments;
      
      // Check if we should show the research dialog
      const shouldShowResearchDialog = removed && 
        removed.unlockedCards.length > 0 && 
        !Object.values(useCardsStore.getState().cardStates)
          .some(card => card.discovery_state.priority === 'on');
      
      if (shouldShowResearchDialog) {
        // Pause the game when showing the dialog
        useGameLoopStore.getState().setRunning(false);
        return {
          pendingAcknowledgments: remaining,
          isResearchDialogOpen: true
        };
      }
      
      return { pendingAcknowledgments: remaining };
    });
  },
  
  openResearchDialog: () => {
    useGameLoopStore.getState().setRunning(false);
    set({ isResearchDialogOpen: true });
  },
  
  closeResearchDialog: () => {
    useGameLoopStore.getState().setRunning(true);
    set({ isResearchDialogOpen: false });
  }
}));

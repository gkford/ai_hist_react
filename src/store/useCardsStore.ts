import { create } from "zustand";
import type { ResourceKey } from "./useResourceStore";
import type { DiscoveryStatus } from "@/data/cards";

interface CardState {
  discovery_state: {
    current_status: DiscoveryStatus;
    thought_invested: number;
  };
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  sliderValue?: number; // For cards that need slider functionality
}

interface CardsStore {
  cardStates: Record<string, CardState>;
  updateCardState: (id: string, partial: Partial<CardState>) => void;
  setSliderValue: (id: string, value: number) => void;
}

const initialCardState: CardState = {
  discovery_state: {
    current_status: 'unthoughtof',
    thought_invested: 0
  },
  inbound_paid: {},
  outbound_owed: {},
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {
    hominids: {
      ...initialCardState,
      discovery_state: {
        current_status: 'discovered',
        thought_invested: 0
      }
    },
    gather_food: {
      ...initialCardState,
      discovery_state: {
        current_status: 'discovered',
        thought_invested: 0
      }
    },
  },
  updateCardState: (id, partial) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [id]: {
          ...state.cardStates[id],
          ...partial
        }
      }
    })),
  setSliderValue: (id, value) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [id]: {
          ...state.cardStates[id],
          sliderValue: value
        }
      }
    }))
}));

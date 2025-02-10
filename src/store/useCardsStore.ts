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
}

interface CardsStore {
  cardStates: Record<string, CardState>;
  createCard: (id: string, state: CardState) => void;
  updateCardState: (id: string, partial: Partial<CardState>) => void;
  setSliderValue: (id: string, value: number) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {},
  createCard: (id, state) =>
    set((store) => ({
      cardStates: {
        ...store.cardStates,
        [id]: state
      }
    })),
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

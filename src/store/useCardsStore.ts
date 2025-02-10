import { create } from "zustand";
import type { CardDefinition } from "../data/cards";
import type { ResourceKey } from "./useResourceStore";

interface CardState {
  discovered: boolean;
  status: 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';
  thoughtInvested: number;
  // For resource transformations
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
  discovered: false,
  status: 'unthoughtof',
  thoughtInvested: 0,
  inbound_paid: {},
  outbound_owed: {},
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {
    hominids: { ...initialCardState, discovered: true, status: 'discovered' },
    gather_food: { ...initialCardState, discovered: true, status: 'discovered' },
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

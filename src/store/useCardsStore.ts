import { create } from "zustand";
import type { CardDefinition } from "../data/cards";

interface CardState {
  discovered: boolean;
  status: 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete';
}

interface CardsStore {
  cardStates: Record<string, CardState>;
  updateCardState: (id: string, partial: Partial<CardState>) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {
    hominids: { discovered: true, status: 'discovered' },
    gather_food: { discovered: true, status: 'discovered' },
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
    }))
}));

import { create } from "zustand";
import { CardDefinition } from "@/data/cards";

interface CardState {
  discovered: boolean;
}

interface CardsStore {
  cardStates: Record<string, CardState>;
  updateCardState: (id: string, partial: Partial<CardState>) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {
    hominids: { discovered: true },
    gather_food: { discovered: true },
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

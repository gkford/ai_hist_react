import { create } from "zustand";
import type { ResourceKey } from "./useResourceStore";
import { allCards } from "@/data/cards";
import type { CardDefinition, DiscoveryStatus, rtConfig, EffectConfig, DiscoveryStats } from "@/data/cards";

// State extensions of the base configs
interface RTState extends rtConfig {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  focus_type: 'manual' | 'auto';
  focus_prop: number;
}

interface EffectState extends EffectConfig {
  active: boolean;
}

interface DiscoveryState extends DiscoveryStats {
  current_status: DiscoveryStatus;
  thought_invested: number;
  focus_type: 'thought';
  focus_prop: number;
}

// The full card state extends CardDefinition
interface CardState extends Omit<CardDefinition, 'rts' | 'effects' | 'discovery_stats'> {
  rts: Record<string, RTState>;
  effects: Record<string, EffectState>;
  discovery_state: DiscoveryState;
}

interface CardsStore {
  cardStates: Record<string, CardState>;
  createCard: (id: string, initialState?: Partial<CardState>) => void;
  updateCardState: (id: string, partial: Partial<CardState>) => void;
  updateRTState: (cardId: string, rtId: string, partial: Partial<RTState>) => void;
  updateEffectState: (cardId: string, effectId: string, partial: Partial<EffectState>) => void;
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {},
  
  createCard: (id, initialState) => {
    const cardDef = allCards.find((c: CardDefinition) => c.id === id);
    if (!cardDef) return;

    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [id]: {
          ...cardDef,
          rts: Object.fromEntries(
            (cardDef.rts || []).map((rt: rtConfig) => [
              rt.id,
              {
                ...rt,
                inbound_paid: {},
                outbound_owed: {},
                focus_type: 'manual',
                focus_prop: 0
              }
            ])
          ),
          effects: Object.fromEntries(
            (cardDef.effects || []).map((effect: EffectConfig) => [
              effect.id,
              {
                ...effect,
                active: false
              }
            ])
          ),
          discovery_state: {
            ...cardDef.discovery_stats,
            current_status: 'unthoughtof',
            thought_invested: 0,
            focus_type: 'thought',
            focus_prop: 0,
            ...initialState?.discovery_state
          },
          ...initialState
        }
      }
    }));
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

  updateRTState: (cardId, rtId, partial) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [cardId]: {
          ...state.cardStates[cardId],
          rts: {
            ...state.cardStates[cardId].rts,
            [rtId]: {
              ...state.cardStates[cardId].rts[rtId],
              ...partial
            }
          }
        }
      }
    })),

  updateEffectState: (cardId, effectId, partial) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [cardId]: {
          ...state.cardStates[cardId],
          effects: {
            ...state.cardStates[cardId].effects,
            [effectId]: {
              ...state.cardStates[cardId].effects[effectId],
              ...partial
            }
          }
        }
      }
    }))
}));

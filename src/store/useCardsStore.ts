import { create } from "zustand";
import type { ResourceKey } from "./useResourceStore";
import { allCards } from "@/data/cards";
import type { CardDefinition, DiscoveryStatus, rtConfig, FocusConfig, EffectConfig, DiscoveryStats } from "@/data/cards";

// State extensions of the base configs
interface FocusState extends FocusConfig {
  prop: number;
  priority: 'low' | 'high' | 'none';
}

interface RTState extends Omit<rtConfig, 'focus'> {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  focus: FocusState;
}

interface EffectState extends Omit<EffectConfig, 'focus'> {
  active: boolean;
  focus: FocusState;
}

interface DiscoveryState extends Omit<DiscoveryStats, 'focus'> {
  current_status: DiscoveryStatus;
  thought_invested: number;
  focus: FocusState;
}

// The full card state extends CardDefinition
interface CardState extends Omit<CardDefinition, 'rts' | 'effects' | 'discovery_stats'> {
  rts: Record<string, RTState>;
  effects: Record<string, EffectState>;
  discovery_state: DiscoveryState;
}

interface CardsStore {
  cardStates: Record<string, CardState>;
  createCard: (id: string, initialState?: { 
    discovery_state?: Partial<DiscoveryState> 
  }) => void;
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
                focus: {
                  resource: rt.focus.resource,
                  prop: 0,
                  priority: 'none'
                }
              }
            ])
          ),
          effects: Object.fromEntries(
            (cardDef.effects || []).map((effect: EffectConfig) => [
              effect.id,
              {
                ...effect,
                active: false,
                focus: {
                  resource: effect.focus.resource,
                  prop: 0,
                  priority: 'none'
                }
              }
            ])
          ),
          discovery_state: {
            thought_to_imagine: cardDef.discovery_stats.thought_to_imagine,
            further_thought_to_discover: cardDef.discovery_stats.further_thought_to_discover,
            current_status: 'unthoughtof',
            thought_invested: 0,
            focus: {
              resource: cardDef.discovery_stats.focus.resource,
              prop: 0,
              priority: 'none'
            },
            ...(initialState?.discovery_state || {})  // This will override only the provided values
          }
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

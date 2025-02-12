import { create } from "zustand";
import { useResourceStore } from "./useResourceStore";
import type { ResourceKey } from "./useResourceStore";
import { allCards } from "@/data/cards";
import type { CardDefinition, DiscoveryStatus, rtConfig, FocusConfig, EffectConfig, DiscoveryStats } from "@/data/cards";

// State extensions of the base configs
export interface FocusState extends FocusConfig {
  priority: 'low' | 'high' | 'none';
}

export interface RTState extends Omit<rtConfig, 'focus'> {
  inbound_paid: Partial<Record<ResourceKey, number>>;
  outbound_owed: Partial<Record<ResourceKey, number>>;
  focus: FocusState;
  last_process_time?: number;
}

interface EffectState extends Omit<EffectConfig, 'focus'> {
  active: boolean;
  focus: FocusState;
}

export interface DiscoveryState extends Omit<DiscoveryStats, 'focus'> {
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
                inbound_paid: Object.fromEntries(
                  Object.keys(rt.inbound_cost).map(resource => [resource, 0])
                ),
                outbound_owed: Object.fromEntries(
                  Object.keys(rt.outbound_gain).map(resource => [resource, 0])
                ),
                focus: {
                  resource: rt.focus.resource,
                  priority: 'none'
                }
              }
            ])
          ),
          ongoingEffects: cardDef.ongoingEffects ? {
            resourceModifiers: cardDef.ongoingEffects.resourceModifiers,
            active: false,
            focus: {
              resource: cardDef.ongoingEffects.focus.resource,
              priority: 'none'
            }
          } : undefined,
          hasProcessedOnCreate: false,
          // Process onCreate effects if they exist
          ...(cardDef.onCreateEffects && !initialState?.hasProcessedOnCreate ? (() => {
            const resources = useResourceStore.getState();
            Object.entries(cardDef.onCreateEffects.resourceBonuses).forEach(([resource, amount]) => {
              if (amount !== undefined) {
                resources.addResource(resource as ResourceKey, amount);
              }
            });
            return {};
          })() : {}),
          discovery_state: {
            thought_to_imagine: cardDef.discovery_stats.thought_to_imagine,
            further_thought_to_discover: cardDef.discovery_stats.further_thought_to_discover,
            current_status: 'unthoughtof',
            thought_invested: 0,
            focus: {
              resource: cardDef.discovery_stats.focus.resource,
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

  updateEffectState: (cardId, partial: Partial<OngoingEffectsState>) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [cardId]: {
          ...state.cardStates[cardId],
          ongoingEffects: state.cardStates[cardId].ongoingEffects ? {
            ...state.cardStates[cardId].ongoingEffects,
            ...partial
          } : undefined
        }
      }
    }))
}));

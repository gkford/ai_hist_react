import { create } from 'zustand'
import type { ResourceKey } from './useResourceStore'
import { allCards } from '@/data/cards'
import { calculateFocusPropFromPriorities } from '@/lib/focusCalculator'
import { useFocusStore } from '@/store/useFocusStore'
import type {
  CardDefinition,
  rtConfig,
  FocusConfig,
  DiscoveryStats,
  OngoingEffects,
} from '@/data/cards'

export type DiscoveryStatus = 'unthoughtof' | 'imagined' | 'discovered' | 'obsolete'

// State extensions of the base configs
export interface FocusState extends FocusConfig {
  priority: 'low' | 'high' | 'none'
}

export interface RTState extends Omit<rtConfig, 'focus'> {
  inbound_paid: Partial<Record<ResourceKey, number>>
  outbound_owed: Partial<Record<ResourceKey, number>>
  focus: FocusState
  last_process_time?: number
}

interface OngoingEffectsState extends Omit<OngoingEffects, 'focus'> {
  active: boolean
  focus: FocusState
}

export interface DiscoveryState extends Omit<DiscoveryStats, 'focus'> {
  current_status: DiscoveryStatus
  thought_invested: number
  focus: FocusState
}

// The full card state extends CardDefinition
interface CardState
  extends Omit<
    CardDefinition,
    'rts' | 'ongoingEffects' | 'OnDiscoveryEffects' | 'discovery_stats'
  > {
  rts: Record<string, RTState>
  ongoingEffects?: OngoingEffectsState
  discovery_state: DiscoveryState
}

interface CardsStore {
  cardStates: Record<string, CardState>
  createCard: (
    id: string,
    initialState?: {
      discovery_state?: Partial<DiscoveryState>
    }
  ) => void
  updateCardState: (id: string, partial: Partial<CardState>) => void
  updateRTState: (
    cardId: string,
    rtId: string,
    partial: Partial<RTState>
  ) => void
  updateEffectState: (
    cardId: string,
    partial: Partial<OngoingEffectsState>
  ) => void
  removeCard: (id: string) => void
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {},

  createCard: (id, initialState) => {
    const cardDef = allCards.find((c: CardDefinition) => c.id === id)
    if (!cardDef) return

    set((state) => {
      const newCardState = {
          ...cardDef,
          rts: Object.fromEntries(
            (cardDef.rts || []).map((rt: rtConfig) => [
              rt.id,
              {
                ...rt,
                inbound_paid: Object.fromEntries(
                  Object.keys(rt.inbound_cost).map((resource) => [resource, 0])
                ),
                outbound_owed: Object.fromEntries(
                  Object.keys(rt.outbound_gain).map((resource) => [resource, 0])
                ),
                focus: {
                  resource: rt.focus.resource,
                  priority: 'none',
                },
              },
            ])
          ),
          ongoingEffects: cardDef.ongoingEffects
            ? {
                resourceModifiers: cardDef.ongoingEffects.resourceModifiers,
                active: false,
                focus: {
                  resource: cardDef.ongoingEffects.focus.resource,
                  priority: 'none',
                },
              }
            : undefined,
          discovery_state: cardDef.discovery_stats 
            ? {
                thought_to_imagine: cardDef.discovery_stats.thought_to_imagine,
                further_thought_to_discover: cardDef.discovery_stats.further_thought_to_discover,
                current_status: 'unthoughtof',
                thought_invested: 0,
                focus: {
                  resource: cardDef.discovery_stats.focus.resource,
                  priority: 'none',
                },
                ...(initialState?.discovery_state || {}),
              }
            : {
                thought_to_imagine: 0,
                further_thought_to_discover: 0,
                current_status: 'unthoughtof',
                thought_invested: 0,
                focus: {
                  resource: 'thoughts',
                  priority: 'none',
                },
                ...(initialState?.discovery_state || {}),
              },
        },
      };

      // Calculate focus props for each resource after adding the new card
      const newCardStates = {
        ...state.cardStates,
        [id]: newCardState,
      };

      // Get all unique resources from RTs across all cards
      const resourceTypes = new Set<ResourceKey>();
      Object.values(newCardStates).forEach(card => {
        Object.values(card.rts).forEach(rt => {
          resourceTypes.add(rt.focus.resource);
        });
      });

      // Update focus props for each resource
      resourceTypes.forEach(resource => {
        const rtFocusStates: Array<'none' | 'low' | 'high'> = [];
        Object.values(newCardStates).forEach(card => {
          Object.values(card.rts).forEach(rt => {
            if (rt.focus.resource === resource) {
              rtFocusStates.push(rt.focus.priority);
            }
          });
        });

        const propValues = calculateFocusPropFromPriorities(rtFocusStates);
        useFocusStore.getState().updateResourceProps(resource, propValues);
      });

      return { cardStates: newCardStates };
    })
  },

  updateCardState: (id, partial) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [id]: {
          ...state.cardStates[id],
          ...partial,
        },
      },
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
              ...partial,
            },
          },
        },
      },
    })),

  updateEffectState: (cardId, partial: Partial<OngoingEffectsState>) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [cardId]: {
          ...state.cardStates[cardId],
          ongoingEffects: state.cardStates[cardId].ongoingEffects
            ? {
                ...state.cardStates[cardId].ongoingEffects,
                ...partial,
              }
            : undefined,
        },
      },
    })),
  removeCard: (id: string) => 
    set((state) => {
      const { [id]: removed, ...remaining } = state.cardStates;
      return { cardStates: remaining };
    }),
}))

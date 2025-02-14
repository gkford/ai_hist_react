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
interface OngoingEffectsState extends OngoingEffects {
  active: boolean
}

export interface DiscoveryState extends DiscoveryStats {
  current_status: DiscoveryStatus
  thought_invested: number
}

// The full card state extends CardDefinition
interface CardState
  extends Omit<
    CardDefinition,
    'ongoingEffects' | 'OnDiscoveryEffects' | 'discovery_stats'
  > {
  ongoingEffects?: OngoingEffectsState
  discovery_state: DiscoveryState
  assigned_workers: number
}

interface CardsStore {
  cardStates: Record<string, CardState>
  createCard: (
    id: string,
    initialState?: {
      discovery_state?: Partial<DiscoveryState>
      assigned_workers?: number
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
  updateAssignedWorkers: (cardId: string, newValue: number) => void
}

export const useCardsStore = create<CardsStore>((set) => ({
  cardStates: {},

  createCard: (id, initialState) => {
    const cardDef = allCards.find((c: CardDefinition) => c.id === id)
    if (!cardDef) return

    set((state) => {
      const newCardState: CardState = {
        ...cardDef,
        assigned_workers: initialState?.assigned_workers || 0,
        rt: cardDef.rt ? {
          ...cardDef.rt,
          inbound_paid: Object.fromEntries(
            Object.keys(cardDef.rt.inbound_cost).map((resource) => [resource, 0])
          ),
          outbound_owed: Object.fromEntries(
            Object.keys(cardDef.rt.outbound_gain).map((resource) => [resource, 0])
          ),
          focus: {
            resource: cardDef.rt.focus.resource,
            priority: 'none',
          },
        } : undefined,
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
            }
      };

      const newCardStates = {
        ...state.cardStates,
        [id]: newCardState,
      };

      // Calculate focus props just for thoughts resource
      const thoughtFocusStates: Array<'none' | 'low' | 'high'> = [];
      Object.values(newCardStates).forEach(card => {
        if (card.discovery_state.current_status === 'unthoughtof' || 
            card.discovery_state.current_status === 'imagined') {
          thoughtFocusStates.push(card.discovery_state.focus.priority);
        }
      });

      const propValues = calculateFocusPropFromPriorities(thoughtFocusStates);
      useFocusStore.getState().updateResourceProps('thoughts', propValues);

      // Calculate focus props for RT resources
      const rtResourceTypes = new Set<ResourceKey>();
      Object.values(newCardStates).forEach(card => {
        if (card.rt) {
          rtResourceTypes.add(card.rt.focus.resource);
        }
      });

      rtResourceTypes.forEach(resource => {
        const rtFocusStates: Array<'none' | 'low' | 'high'> = [];
        Object.values(newCardStates).forEach(card => {
          if (card.rt && card.rt.focus.resource === resource) {
            rtFocusStates.push(card.rt.focus.priority);
          }
        });

        const rtPropValues = calculateFocusPropFromPriorities(rtFocusStates);
        useFocusStore.getState().updateResourceProps(resource, rtPropValues);
      });

      return { 
        cardStates: newCardStates,
        createCard: state.createCard,
        updateCardState: state.updateCardState,
        updateRTState: state.updateRTState,
        updateEffectState: state.updateEffectState,
        removeCard: state.removeCard
      };
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
    
  updateAssignedWorkers: (cardId: string, newValue: number) =>
    set((state) => ({
      cardStates: {
        ...state.cardStates,
        [cardId]: {
          ...state.cardStates[cardId],
          assigned_workers: newValue
        }
      }
    })),
}))

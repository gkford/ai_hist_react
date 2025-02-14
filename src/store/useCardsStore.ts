import { create } from 'zustand'
import { allCards } from '@/data/cards'
import type {
  CardDefinition,
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
  priority: 'on' | 'off'
}

// The full card state extends CardDefinition
interface CardState
  extends Omit<
    CardDefinition,
    'ongoingEffects' | 'discovery_stats'
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
        ongoingEffects: cardDef.ongoingEffects
          ? {
              resourceModifiers: cardDef.ongoingEffects.resourceModifiers,
              active: false
            }
          : undefined,
        discovery_state: cardDef.discovery_stats 
          ? {
              thought_to_imagine: cardDef.discovery_stats.thought_to_imagine,
              further_thought_to_discover: cardDef.discovery_stats.further_thought_to_discover,
              current_status: 'unthoughtof',
              thought_invested: 0,
              priority: 'off',
              ...(initialState?.discovery_state || {}),
            }
          : {
              thought_to_imagine: 0,
              further_thought_to_discover: 0,
              current_status: 'unthoughtof',
              thought_invested: 0,
              priority: 'off',
              ...(initialState?.discovery_state || {}),
            }
      };

      const newCardStates = {
        ...state.cardStates,
        [id]: newCardState,
      };


      return { 
        cardStates: newCardStates,
        createCard: state.createCard,
        updateCardState: state.updateCardState,
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
          discovery_state: {
            ...state.cardStates[id].discovery_state,
            ...(partial.discovery_state || {}),
            priority: partial.discovery_state?.priority ?? state.cardStates[id].discovery_state.priority
          }
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
          assigned_workers: Math.max(0, newValue)
        }
      }
    })),
}))

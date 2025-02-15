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
  discovery_timestamp?: number
}

// The full card state extends CardDefinition
export interface CardState
  extends Omit<
    CardDefinition,
    'ongoingEffects' | 'discovery_stats'
  > {
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
      const newCardState: CardState = {
        ...cardDef,
        ongoingEffects: cardDef.ongoingEffects
          ? {
              resourceModifiers: cardDef.ongoingEffects.resourceModifiers,
              active: false
            }
          : undefined,
        discovery_state: cardDef.discovery_stats 
          ? {
              ...cardDef.discovery_stats,
              current_status: 'unthoughtof',
              thought_invested: 0,
              priority: 'off',
              ...(initialState?.discovery_state || {}),
            }
          : {
              thought_to_imagine: 0,
              further_thought_to_discover: 0,
              thought_level: 1,
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
    
}))

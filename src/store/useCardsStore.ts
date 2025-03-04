import { create } from 'zustand'
import { allCards } from '@/data/cards'
import type {
  CardDefinition,
  DiscoveryStats,
  OngoingEffects,
} from '@/data/cards'

export type DiscoveryStatus = 'locked' | 'unlocked' | 'discovered' | 'obsolete'

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
   extends Omit<CardDefinition, 'ongoingEffects' | 'discovery_stats'> {
   ongoingEffects?: OngoingEffectsState
   discovery_state: DiscoveryState
   createdAt: number
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
        createdAt: Date.now(),
        ongoingEffects: cardDef.ongoingEffects
          ? {
              resourceModifiers: cardDef.ongoingEffects.resourceModifiers,
              active: false,
            }
          : undefined,
        discovery_state: cardDef.discovery_stats
          ? {
              ...cardDef.discovery_stats,
              current_status: 'locked',
              thought_invested: 0,
              priority: 'off',
              ...(initialState?.discovery_state || {}),
            }
          : {
              thought_to_imagine: 0,
              further_thought_to_discover: 0,
              thought_level: 1,
              current_status: 'locked',
              thought_invested: 0,
              priority: 'off',
              ...(initialState?.discovery_state || {}),
            },
      }

      const newCardStates = {
        ...state.cardStates,
        [id]: newCardState,
      }

      return {
        cardStates: newCardStates,
        createCard: state.createCard,
        updateCardState: state.updateCardState,
        updateEffectState: state.updateEffectState,
        removeCard: state.removeCard,
      }
    })
  },

  updateCardState: (id, partial) =>
    set((state) => {
      // If we're turning on priority for this card
      if (partial.discovery_state?.priority === 'on') {
        // First, create new card states with all other priorities turned off
        const resetCardStates = Object.entries(state.cardStates).reduce(
          (acc, [cardId, cardState]) => ({
            ...acc,
            [cardId]:
              cardId !== id && cardState.discovery_state.priority === 'on'
                ? {
                    ...cardState,
                    discovery_state: {
                      ...cardState.discovery_state,
                      priority: 'off',
                    },
                  }
                : cardState,
          }),
          {}
        )

        // Then update the target card
        return {
          cardStates: {
            ...resetCardStates,
            [id]: {
              ...state.cardStates[id],
              ...partial,
              discovery_state: {
                ...state.cardStates[id].discovery_state,
                ...(partial.discovery_state || {}),
              },
            },
          },
        }
      }

      // If we're not turning on priority, just update normally
      return {
        cardStates: {
          ...state.cardStates,
          [id]: {
            ...state.cardStates[id],
            ...partial,
            discovery_state: {
              ...state.cardStates[id].discovery_state,
              ...(partial.discovery_state || {}),
            },
          },
        },
      }
    }),

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
      const { [id]: removed, ...remaining } = state.cardStates
      return { cardStates: remaining }
    }),
}))

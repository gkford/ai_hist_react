import { useKnowledgeLevelStore } from '@/store/useKnowledgeLevelStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useCardsStore } from '@/store/useCardsStore'
import { allCards, CardType } from '@/data/cards'
import { logger } from './logger'

// Helper to find replacement card for a given level
function findReplacementCard(type: CardType, level: number) {
  if (type !== 'people' && type !== 'computation') return undefined
  return allCards.find(card => 
    card.type === type && 
    card.knowledge_level === level
  )
}

// Handle card replacements when knowledge level increases
function handleCardReplacements(newLevel: number) {
  const cardStore = useCardsStore.getState()
  
  // Get all currently discovered cards of type 'people' or 'computation'
  const cardsToReplace = Object.values(cardStore.cardStates)
    .filter(card => {
      const cardDef = allCards.find(c => c.id === card.id)
      return cardDef && 
        (cardDef.type === 'people' || cardDef.type === 'computation') &&
        card.discovery_state.current_status === 'discovered'
    })

  // Replace each card with its higher level version
  cardsToReplace.forEach(card => {
    const cardDef = allCards.find(c => c.id === card.id)
    if (!cardDef) return

    const replacementCard = findReplacementCard(cardDef.type, newLevel)
    if (!replacementCard) return

    // Update the old card to obsolete
    cardStore.updateCardState(card.id, {
      discovery_state: {
        ...card.discovery_state,
        current_status: 'obsolete'
      }
    })

    // Add the new card as discovered
    cardStore.updateCardState(replacementCard.id, {
      discovery_state: {
        current_status: 'discovered',
        thought_invested: 0,
        priority: 'off',
        thought_to_imagine: 0,
        further_thought_to_discover: 0,
        thought_level: 1
      }
    })

    logger.log(`Replaced ${card.id} with ${replacementCard.id}`)
  })
}

export function processKnowledgeLevel() {
  const knowledgeLevelStore = useKnowledgeLevelStore.getState()
  const currentKnowledge = useResourceStore.getState().resources.knowledge.amount[0]
  const currentLevel = knowledgeLevelStore.level

  // Find the highest level we qualify for
  const newLevel = knowledgeLevelStore.thresholds.reduce((highest, threshold, index) => {
    if (currentKnowledge >= threshold) {
      return index + 1
    }
    return highest
  }, 1)

  // If we've reached a new level
  if (newLevel > currentLevel) {
    // Update the level
    knowledgeLevelStore.setLevel(newLevel)

    // Show notification
    window.alert(`Knowledge Level Increased to ${newLevel}!`)

    // Handle card replacements
    handleCardReplacements(newLevel)

    logger.log(`Knowledge level increased to ${newLevel}`)
  }
}

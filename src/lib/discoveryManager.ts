import { useCardsStore } from '@/store/useCardsStore'
import { useResourceStore } from '@/store/useResourceStore'
import { logger } from './logger'

export function processDiscoveries() {
  const cardStore = useCardsStore.getState()
  const resourceStore = useResourceStore.getState()
  
  // Get the amount of thoughts produced this turn
  const thoughtsProduced = resourceStore.resources.thoughts.amountProducedThisSecond[0]
  
  if (thoughtsProduced <= 0) {
    return // No thoughts to process
  }

  // Find the first card with priority 'on' that's either unthoughtof or imagined
  const priorityCard = Object.values(cardStore.cardStates).find(card => 
    (card.discovery_state.current_status === 'unthoughtof' || 
     card.discovery_state.current_status === 'imagined') &&
    card.discovery_state.priority === 'on'
  )

  if (!priorityCard) {
    return // No card with priority on found
  }

  // Update the thought_invested for the priority card
  const newThoughtInvested = priorityCard.discovery_state.thought_invested + thoughtsProduced

  logger.log(`Adding ${thoughtsProduced} thoughts to ${priorityCard.id}. Total: ${newThoughtInvested}`)

  // Update the card's discovery state with new thought investment
  cardStore.updateCardState(priorityCard.id, {
    discovery_state: {
      thought_invested: newThoughtInvested
    }
  })
}

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

  // Check if we need to transition from unthoughtof to imagined
  if (priorityCard.discovery_state.current_status === 'unthoughtof' && 
      newThoughtInvested >= priorityCard.discovery_state.thought_to_imagine) {
    
    logger.log(`Card ${priorityCard.id} has been imagined!`)
    
    // Update to imagined status and reset thought investment
    cardStore.updateCardState(priorityCard.id, {
      discovery_state: {
        ...priorityCard.discovery_state,
        current_status: 'imagined',
        thought_invested: 0,
        priority: 'off' // Turn off priority when transitioning
      }
    })
  } else {
    // Just update thought investment
    cardStore.updateCardState(priorityCard.id, {
      discovery_state: {
        ...priorityCard.discovery_state,
        thought_invested: newThoughtInvested
      }
    })
  }
}

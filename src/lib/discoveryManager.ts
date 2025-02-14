import { useCardsStore } from '@/store/useCardsStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useWorkersStore } from '@/store/useWorkersStore'
import { logger } from './logger'
import type { ResourceKey } from '@/store/useResourceStore'

export function processDiscoveries() {
  const cardStore = useCardsStore.getState()
  const resourceStore = useResourceStore.getState()
  
  // Get all thought resources for this turn
  const thoughtLevels = [
    resourceStore.resources.thoughts1.amountProducedThisSecond[0],
    resourceStore.resources.thoughts2.amountProducedThisSecond[0],
    resourceStore.resources.thoughts3.amountProducedThisSecond[0],
    resourceStore.resources.thoughts4.amountProducedThisSecond[0],
  ]

  // If no thoughts were produced at any level, return early
  if (thoughtLevels.every(amount => amount <= 0)) {
    return
  }

  // Find all cards with priority 'on' that are either unthoughtof or imagined
  const priorityCards = Object.values(cardStore.cardStates)
    .filter(card => 
      (card.discovery_state.current_status === 'unthoughtof' || 
       card.discovery_state.current_status === 'imagined') &&
      card.discovery_state.priority === 'on'
    )
    .sort((a, b) => a.discovery_state.thought_level - b.discovery_state.thought_level)

  if (priorityCards.length === 0) {
    return // No cards with priority on found
  }

  // Process each thought level separately
  thoughtLevels.forEach((thoughtsProduced, index) => {
    const thoughtLevel = index + 1
    
    if (thoughtsProduced <= 0) return // Skip if no thoughts at this level

    // Find the first card that can use this thought level
    const card = priorityCards.find(c => c.discovery_state.thought_level <= thoughtLevel)
    if (!card) return // No card can use this thought level

    // Update the thought_invested for the card
    const newThoughtInvested = card.discovery_state.thought_invested + thoughtsProduced

    logger.log(`Adding ${thoughtsProduced} thoughts to ${card.id}. Total: ${newThoughtInvested}`)

    // Check if we need to transition from unthoughtof to imagined
    if (card.discovery_state.current_status === 'unthoughtof' && 
        newThoughtInvested >= card.discovery_state.thought_to_imagine) {
      
      logger.log(`Card ${card.id} has been imagined!`)
      
      // Update to imagined status and reset thought investment
      cardStore.updateCardState(card.id, {
        discovery_state: {
          ...card.discovery_state,
          current_status: 'imagined',
          thought_invested: 0,
          priority: 'off' // Turn off priority when transitioning
        }
      })
    } else if (card.discovery_state.current_status === 'imagined' && 
               newThoughtInvested >= card.discovery_state.further_thought_to_discover) {
      
      logger.log(`Card ${card.id} has been discovered!`)
      
      // Apply OnDiscoveryEffects if they exist
      if (card.OnDiscoveryEffects?.resourceBonuses) {
        Object.entries(card.OnDiscoveryEffects.resourceBonuses).forEach(([resource, amount]) => {
          resourceStore.produceResource(resource as ResourceKey, Number(amount))
          logger.log(`Applied discovery bonus: ${amount} ${resource}`)
        })
      }

      if (card.OnDiscoveryEffects?.upgradeWorkers) {
        const count = card.OnDiscoveryEffects.upgradeWorkers;
        useWorkersStore.getState().upgradeWorkers(count);
        logger.log(`Upgraded ${count} workers due to discovery effect on card ${card.id}.`);
      }

      // Update to discovered status and turn off priority
      cardStore.updateCardState(card.id, {
        discovery_state: {
          ...card.discovery_state,
          current_status: 'discovered',
          thought_invested: newThoughtInvested,
          priority: 'off' // Turn off priority when discovered
        }
      })
    } else {
      // Just update thought investment
      cardStore.updateCardState(card.id, {
        discovery_state: {
          ...card.discovery_state,
          thought_invested: newThoughtInvested
        }
      })
    }
  })
}

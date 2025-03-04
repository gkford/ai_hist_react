import { useCardsStore } from '@/store/useCardsStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
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

  logger.log('Thought levels produced:', thoughtLevels)

  // If no thoughts were produced at any level, return early
  if (thoughtLevels.every((amount) => amount <= 0)) {
    return
  }

  // Find all unlocked cards with priority 'on'
  const priorityCards = Object.values(cardStore.cardStates).filter(
    (card) => {
      const isUnlocked = card.discovery_state.current_status === 'unlocked';
      const hasPriority = card.discovery_state.priority === 'on';
      
      if (isUnlocked && hasPriority) {
        logger.log(`Found priority card: ${card.id} with priority ${card.discovery_state.priority}`);
      }
      
      return isUnlocked && hasPriority;
    }
  )

  if (priorityCards.length === 0) {
    return // No cards with priority on found
  }

  // Process each thought level separately, starting from highest level
  // This ensures higher-level thoughts are used for higher-level cards when possible
  for (let index = thoughtLevels.length - 1; index >= 0; index--) {
    const thoughtsProduced = thoughtLevels[index]
    const thoughtLevel = index + 1

    if (thoughtsProduced <= 0) continue // Skip if no thoughts at this level

    // Find cards that can use this thought level, prioritizing exact matches first
    const exactLevelCards = priorityCards.filter(
      (c) => c.discovery_state.thought_level === thoughtLevel
    )
    const lowerLevelCards = priorityCards.filter(
      (c) => c.discovery_state.thought_level < thoughtLevel
    )

    // Prioritize exact level matches, then lower levels
    const card =
      exactLevelCards.length > 0
        ? exactLevelCards[0]
        : lowerLevelCards.length > 0
        ? lowerLevelCards[0]
        : null
    if (!card) continue // No card can use this thought level

    // Update the thought_invested for the card
    const newThoughtInvested =
      card.discovery_state.thought_invested + thoughtsProduced

    logger.log(
      `Adding ${thoughtsProduced} thoughts to ${card.id}. Total: ${newThoughtInvested}`
    )

    // Check if we have enough thoughts to discover
    if (newThoughtInvested >= card.discovery_state.thought_to_imagine) {
      logger.log(`Card ${card.id} has been discovered!`)

      // Apply OnDiscoveryEffects if they exist
      if (card.OnDiscoveryEffects?.resourceBonuses) {
        Object.entries(card.OnDiscoveryEffects.resourceBonuses).forEach(
          ([resource, amount]) => {
            resourceStore.produceResource(
              resource as ResourceKey,
              Number(amount)
            )
            logger.log(`Applied discovery bonus: ${amount} ${resource}`)
          }
        )
      }

      if (card.OnDiscoveryEffects?.upgradeWorkers && card.OnDiscoveryEffects?.targetLevel) {
        const targetLevel = card.OnDiscoveryEffects.targetLevel;
        
        // First step: upgrade half the workers to the next level
        useWorkersStore.getState().upgradeWorkersFirstStep(targetLevel);
        
        logger.log(
          `First step upgrade: Half of workers upgraded toward level ${targetLevel} for card ${card.id}.`
        )
      }

      // Special message for tally marks discovery
      let discoveryMessage = undefined
      if (card.id === 'tally_marks') {
        discoveryMessage =
          'Congratulations! Your people have progressed from the hominids of prehistory to the storytellers who created the earliest historical records by humans, cave paintings and wall markings. Next, onto the agricultural revolution!'
      }

      // Create any unlocked cards
      let unlockedCardIds: string[] = []
      if (card.discovery_state?.discovery_unlocks?.length) {
        card.discovery_state.discovery_unlocks.forEach((cardId: string) => {
          // Create each unlocked card
          cardStore.createCard(cardId)
          unlockedCardIds.push(cardId)
          logger.log(
            `Unlocked new card: ${cardId} due to discovering ${card.id}`
          )
        })
      }

      // Update to discovered status and turn off priority
      cardStore.updateCardState(card.id, {
        discovery_state: {
          ...card.discovery_state,
          current_status: 'discovered',
          thought_invested: newThoughtInvested,
          priority: 'off', // Turn off priority when discovered
          discovery_timestamp: Date.now(),
        },
      })

      // Add the discovery to the discovery store
      useDiscoveryStore
        .getState()
        .addDiscovery(card.id, discoveryMessage, unlockedCardIds)
    } else {
      // Just update thought investment
      cardStore.updateCardState(card.id, {
        discovery_state: {
          ...card.discovery_state,
          thought_invested: newThoughtInvested,
        },
      })
    }
  }
}

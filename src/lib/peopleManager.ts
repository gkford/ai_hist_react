import { useWorkersStore } from '@/store/useWorkersStore'
import { useCardsStore } from '@/store/useCardsStore'
import { logger } from './logger'

export function processPeopleLevel() {
  const workersStore = useWorkersStore.getState()
  const cardStore = useCardsStore.getState()
  
  // Get all workers
  const workers = workersStore.workers
  
  // If no workers, return early
  if (workers.length === 0) return
  
  // Check for each level upgrade
  const allAboveLevel1 = workers.every(worker => worker.level > 1)
  const allAboveLevel2 = workers.every(worker => worker.level > 2)
  const allAboveLevel3 = workers.every(worker => worker.level > 3)
  
  if (allAboveLevel3) {
    // Check if we still have the level 3 reasoners card
    const hasLevel3Card = cardStore.cardStates['reasoners']
    
    if (hasLevel3Card) {
      logger.log('All workers above level 3 - upgrading reasoners card')
      
      // Create the level 4 card first
      cardStore.createCard('storytellers', {
        discovery_state: {
          current_status: 'discovered',
          thought_invested: 0,
          priority: 'off',
          thought_to_imagine: 0,
          further_thought_to_discover: 0,
          thought_level: 1
        }
      })
      
      // Then remove the level 3 card
      cardStore.removeCard('reasoners')
      
      logger.log('Successfully upgraded reasoners to storytellers')
    }
  }
  else if (allAboveLevel2) {
    // Check if we still have the level 2 grunts card
    const hasLevel2Card = cardStore.cardStates['grunts']
    
    if (hasLevel2Card) {
      logger.log('All workers above level 2 - upgrading grunts card')
      
      // Create the level 3 card first
      cardStore.createCard('reasoners', {
        discovery_state: {
          current_status: 'discovered',
          thought_invested: 0,
          priority: 'off',
          thought_to_imagine: 0,
          further_thought_to_discover: 0,
          thought_level: 1
        }
      })
      
      // Then remove the level 2 card
      cardStore.removeCard('grunts')
      
      logger.log('Successfully upgraded grunts to reasoners')
    }
  }
  else if (allAboveLevel1) {
    // Check if we still have the level 1 hominids card
    const hasLevel1Card = cardStore.cardStates['hominids']
    
    if (hasLevel1Card) {
      logger.log('All workers above level 1 - upgrading hominids card')
      
      // Create the level 2 card first
      cardStore.createCard('grunts', {
        discovery_state: {
          current_status: 'discovered',
          thought_invested: 0,
          priority: 'off',
          thought_to_imagine: 0,
          further_thought_to_discover: 0,
          thought_level: 1
        }
      })
      
      // Then remove the level 1 card
      cardStore.removeCard('hominids')
      
      logger.log('Successfully upgraded hominids to grunts')
    }
  }
}

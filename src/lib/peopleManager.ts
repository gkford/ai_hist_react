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
  
  // Check if all workers are above level 1
  const allAboveLevel1 = workers.every(worker => worker.level > 1)
  
  if (allAboveLevel1) {
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
      
      logger.log('Successfully upgraded hominids to homo erectus')
    }
  }
}

import { processDiscoveries } from './discoveryManager'
import { processKnowledgeLevel } from './knowledgeManager'
import { useResourceStore, ResourceKey } from '@/store/useResourceStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { useCardsStore } from '@/store/useCardsStore'
import { useWorkersStore } from '@/store/useWorkersStore'
import { allCards } from '@/data/cards'
import { logger } from './logger'

function processFoodConsumption() {
  const resourceStore = useResourceStore.getState()
  const population = resourceStore.resources.population.amount[0]
  const maxStorage = resourceStore.resources.food.max_storage
  const currentFood = resourceStore.resources.food.amount[0]
  
  logger.log(`Food before consumption: ${currentFood}`)
  
  // Each population unit consumes 1 food
  resourceStore.spendResource('food', population)
  
  // After consumption, if remaining food exceeds storage, reduce to max storage
  const remainingFood = resourceStore.resources.food.amount[0]
  if (maxStorage && remainingFood > maxStorage) {
    resourceStore.spendResource('food', remainingFood - maxStorage)
  }
  
  logger.log(`Food after consumption and storage cap: ${resourceStore.resources.food.amount[0]}`)
}

function processWorkerProduction() {
  const cardStore = useCardsStore.getState()
  const resourceStore = useResourceStore.getState()
  const workersStore = useWorkersStore.getState()

  logger.log('=== Starting Worker Production ===')

  // Process each card that has workers assigned and is discovered
  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status === 'discovered' && card.generates) {
      const workers = workersStore.workers.filter(w => w.assignedTo === card.id)
      
      if (workers.length > 0) {
        // For computation cards, check if there's food before generating thoughts
        if (allCards.find(c => c.id === card.id)?.type === 'computation') {
          const food = resourceStore.resources.food.amount[0]
          logger.log(`Processing computation card ${card.id}. Food available: ${food}`)
          if (food > 0) {
            // Group workers by level
            const workersByLevel = workers.reduce((acc, worker) => {
              acc[worker.level] = (acc[worker.level] || 0) + 1
              return acc
            }, {} as Record<number, number>)

            logger.log(`Workers by level for ${card.id}:`, workersByLevel)

            // Generate thoughts for each worker level
            Object.entries(workersByLevel).forEach(([level, count]) => {
              const thoughtLevel = `thoughts${level}` as ResourceKey
              const amount = (card.generates?.amount ?? 0) * count
              logger.log(`Attempting to produce ${amount} ${thoughtLevel}`)
              resourceStore.produceResource(thoughtLevel, amount)
              logger.log(`After production, ${thoughtLevel} amount:`, resourceStore.resources[thoughtLevel].amount[0])
            })
          } else {
            logger.log(`Card ${card.id} cannot generate thoughts - no food`)
          }
        } else {
          // For non-computation cards, all workers contribute to the same resource
          const amount = card.generates.amount * workers.length
          resourceStore.produceResource(card.generates.resource, amount)
          logger.log(`Card ${card.id} produced ${amount} ${card.generates.resource}`)
        }
      }
    }
  })
  
  logger.log('=== Ending Worker Production ===')
}

let intervalId: number | null = null

export function setVerboseLogging(verbose: boolean) {
  logger.setVerbose(verbose)
}

const handleFoodShortage = async () => {
  const gameLoopStore = useGameLoopStore.getState()
  const resourceStore = useResourceStore.getState()
  
  // Pause the game
  gameLoopStore.setRunning(false)
  
  // Increment shortage counter
  gameLoopStore.incrementFoodShortage()
  
  // let message = ''
  // if (gameLoopStore.foodShortageCount === 1) {
  //   message = "You've run out of food! Luckily, you've found 10 more food. Just lucky this time I guess, but if that happens again, your people will starve."
  //   resourceStore.produceResource('food', 10)
  // } else if (!gameLoopStore.hasShownEnergyMessage) {
  //   message = "Your people are very low on energy due to food shortages. You will automatically get 5 energy per turn when you have no food and energy, but you are better off going hunting!"
  //   gameLoopStore.setHasShownEnergyMessage(true)
  // }
  
  // // Only show alert if there's a message
  // if (message) {
  //   // Show alert and wait for user acknowledgment
  //   await new Promise(resolve => {
  //     window.alert(message)
  //     resolve(null)
  //   })
  // }
  
  // Resume the game
  gameLoopStore.setRunning(true)
}

const checkAndHandleResources = async () => {
  const resourceStore = useResourceStore.getState()
  const food = resourceStore.resources.food.amount[0]
  const humanEnergy = resourceStore.resources.humanEnergy.amount[0]
  
  // Handle food shortage
  if (food <= 0) {
    await handleFoodShortage()
  }
  
  // Free energy boost when both food and energy are depleted
  if (food <= 0 && humanEnergy <= 0) {
    resourceStore.produceResource('humanEnergy', 5)
  }
}

export async function processTick() {
  const gameLoopStore = useGameLoopStore.getState()
  
  if (gameLoopStore.processingTick) return
  gameLoopStore.setProcessingTick(true)
  
  try {
    logger.log('=== Game Loop Start ===')
    const store = useResourceStore.getState()

    // Check resources before processing
    await checkAndHandleResources()

    // Only continue processing if the game is still running
    if (useGameLoopStore.getState().isRunning) {
      // Always process worker production first
      logger.log('Processing Worker Production...')
      processWorkerProduction()

      // Process discoveries using the produced thoughts
      logger.log('Processing Discoveries...')
      processDiscoveries()

      // Process knowledge level after discoveries
      processKnowledgeLevel()

      // Deduct food based on population (moved to end)
      logger.log('Processing Food Consumption...')
      processFoodConsumption()

      // Progress to next second (handles resetting rate resources)
      logger.log('Progressing to next second...')
      store.progressToNextSecond()
    }

    logger.log('=== Game Loop End ===')
  } finally {
    gameLoopStore.setProcessingTick(false)
  }
}

export function startGameLoop() {
  if (intervalId) return

  intervalId = window.setInterval(() => {
    if (useGameLoopStore.getState().isRunning) {
      processTick()
    }
  }, 1000)
}

export function stopGameLoop() {
  if (!intervalId) return
  clearInterval(intervalId)
  intervalId = null
}

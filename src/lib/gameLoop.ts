import { processDiscoveries } from './discoveryManager'
import { processKnowledgeLevel } from './knowledgeManager'
import { useResourceStore } from '@/store/useResourceStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { useCardsStore } from '@/store/useCardsStore'
import { logger } from './logger'

function processFoodConsumption() {
  const resourceStore = useResourceStore.getState()
  const population = resourceStore.resources.population.amount[0]
  
  // Each population unit consumes 1 food
  resourceStore.spendResource('food', population)
  logger.log(`Population ${population} consumed ${population} food`)
}

function processWorkerProduction() {
  const cardStore = useCardsStore.getState()
  const resourceStore = useResourceStore.getState()

  // Process each card that has workers assigned and is discovered
  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status === 'discovered' && 
        card.assigned_workers > 0 && 
        card.generates) {
      const amount = card.generates.amount * card.assigned_workers
      resourceStore.produceResource(card.generates.resource, amount)
      logger.log(`Card ${card.id} produced ${amount} ${card.generates.resource}`)
    }
  })
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
  
  let message = ''
  if (gameLoopStore.foodShortageCount === 1) {
    message = "You've run out of food! Luckily, you've found 10 more food. Just lucky this time I guess, but if that happens again, your people will starve."
    resourceStore.produceResource('food', 10)
  } else if (!gameLoopStore.hasShownEnergyMessage) {
    message = "Your people are very low on energy due to food shortages. You will automatically get 5 energy per turn when you have no food and energy, but you are better off going hunting!"
    gameLoopStore.setHasShownEnergyMessage(true)
  }
  
  // Only show alert if there's a message
  if (message) {
    // Show alert and wait for user acknowledgment
    await new Promise(resolve => {
      window.alert(message)
      resolve(null)
    })
  }
  
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

    // Progress to next second (handles resetting rate resources)
    logger.log('Progressing to next second...')
    store.progressToNextSecond()

    // Check resources before processing
    await checkAndHandleResources()

    // Only continue processing if the game is still running
    if (useGameLoopStore.getState().isRunning) {
      // Deduct food based on population
      logger.log('Processing Food Consumption...')
      processFoodConsumption()

      // Generate resources from workers
      logger.log('Processing Worker Production...')
      processWorkerProduction()

      // Process knowledge level before other updates
      processKnowledgeLevel()

      // Process discoveries
      logger.log('Processing Discoveries...')
      processDiscoveries()
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

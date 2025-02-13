import { processTransformations } from './rtManager'
import { processDiscoveries } from './discoveryManager'
import { processKnowledgeLevel } from './knowledgeManager'
import { useResourceStore } from '@/store/useResourceStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { logger } from './logger'

let intervalId: number | null = null

export function setVerboseLogging(verbose: boolean) {
  logger.setVerbose(verbose)
}

export function processTick() {
  const gameLoopStore = useGameLoopStore.getState()
  
  if (gameLoopStore.processingTick) return
  gameLoopStore.setProcessingTick(true)
  
  try {
    logger.log('=== Game Loop Start ===')
    const store = useResourceStore.getState()

    // Progress to next second (handles resetting rate resources)
    logger.log('Progressing to next second...')
    store.progressToNextSecond()

    // Process resource transformations
    logger.log('Processing Transformations...')
    processTransformations()

    // Process knowledge level before other updates
    processKnowledgeLevel()

    // Process discoveries
    logger.log('Processing Discoveries...')
    processDiscoveries()

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

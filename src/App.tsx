import { useDevStore } from '@/store/useDevStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { CardDesign } from '@/components/ui/CardDesign'
import { Button } from '@/components/ui/button'
import { ThoughtApplicationDialog } from './components/ui/ThoughtApplicationDialog'
import { ResearchDialog } from './components/ui/ResearchDialog'
import type { CardType } from '@/data/cards'
import { allCards } from '@/data/cards'
import { type CardState, useCardsStore } from '@/store/useCardsStore'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useResource } from '@/store/useResourceStore'
import { useEffect, useState } from 'react'
import { startGameLoop, stopGameLoop } from '@/lib/gameLoop'

function sortCardsInColumn(a: CardState, b: CardState): number {
  // Find the card definitions
  const cardA = allCards.find((c) => c.id === a.id)
  const cardB = allCards.find((c) => c.id === b.id)

  if (!cardA || !cardB) return 0

  // People cards should always be above all other cards
  if (cardA.type === 'people' && cardB.type !== 'people') return -1
  if (cardB.type === 'people' && cardA.type !== 'people') return 1
  // Ensure food_resource card always above create_worker cards
  if (cardA.id === 'food_resource' && cardB.type === 'create_worker') return -1
  if (cardB.id === 'food_resource' && cardA.type === 'create_worker') return 1

  // Instead of discovery_timestamp, sort by createdAt.
  return (b.createdAt || 0) - (a.createdAt || 0)
}

function getCardColumn(cardDef: { id: string; type: CardType }): number {
  if (['non_verbal_communication', 'early_language', 'storytelling'].includes(cardDef.id)) {
    return 4
  }
  switch (cardDef.type) {
    case 'people':
    case 'computation':
    case 'resource':
    case 'create_worker':
      return 1
    case 'production':
      return 2
    case 'science':
      return 3
    case 'worker_upgrade':
      return 4
    default:
      return 3
  }
}

function initializeCards() {
  const cardStore = useCardsStore.getState()

  cardStore.createCard('hominids', {
    discovery_state: {
      current_status: 'discovered',
    },
  })

  cardStore.createCard('raise_children', {
    discovery_state: {
      current_status: 'discovered',
    },
  })

  // Add food resource card
  cardStore.createCard('food_resource', {
    discovery_state: {
      current_status: 'discovered',
    },
  })

  cardStore.createCard('gather_food', {
    discovery_state: {
      current_status: 'discovered',
    },
  })

  cardStore.createCard('think', {
    discovery_state: {
      current_status: 'discovered',
    },
  })
  

  cardStore.createCard('hunt', {
    discovery_state: {
      current_status: 'unlocked',
      priority: 'on',
    },
  })
}

function App() {
  const { devMode } = useDevStore()
  const formatNumber = (n: number): string => {
    const trimmed = parseFloat(n.toFixed(3))
    return trimmed.toString()
  }

  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts1 = useResource('thoughts1')
  const humanEnergy = useResource('humanEnergy')
  const workers = useWorkersStore((state) => state.workers)

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Initialize cards
    console.log('init')
    initializeCards()

    setInitialized(true)
    // Start the game loop
    startGameLoop()
    // Stop it on unmount
    return () => stopGameLoop()
  }, [])

  return (
    <div className="min-h-screen p-4 flex flex-col">
        <ThoughtApplicationDialog />
        <ResearchDialog />
        {/* Floating Button Bar */}
        <div className="fixed right-4 top-4 flex flex-col gap-2 z-50">
          <Button
            onClick={() => useGameLoopStore.getState().toggleRunning()}
            variant="outline"
            className="w-40"
          >
            {useGameLoopStore.getState().isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Button
            onClick={() => useDevStore.getState().toggleVerbose()}
            variant="outline"
            className="w-40"
          >
            {useDevStore.getState().verbose ? 'Hide Verbose' : 'Show Verbose'}
          </Button>
          <Button
            onClick={() => useGameLoopStore.getState().toggleThoughtDialog()}
            variant="outline"
            className="w-40"
          >
            Thought Popup:{' '}
            {useGameLoopStore.getState().thoughtDialogEnabled ? 'On' : 'Off'}
          </Button>
        </div>

        <div className="flex gap-8">
          {[1, 2, 3, 4].map((columnNumber) => (
            <div key={columnNumber} className="flex flex-col gap-4">
              {initialized &&
                Object.values(useCardsStore.getState().cardStates)
                  .filter((cardState) => {
                    const cardDef = allCards.find((c) => c.id === cardState.id)
                    return (
                      cardDef && getCardColumn(cardDef) === columnNumber
                    )
                  })
                  .sort(sortCardsInColumn)
                  .map((cardState) => (
                    <CardDesign key={cardState.id} id={cardState.id} />
                  ))}
            </div>
          ))}
        </div>

        {/* Developer Dashboard - only show when devMode is true */}
        {devMode && (
          <div className="ml-8 flex flex-col gap-4">
            <div className="p-4 border border-gray-200 rounded">
              <h2 className="font-semibold mb-2">Developer Dashboard</h2>
              <p>Food: {formatNumber(food.amount[0])}</p>
              <p>Knowledge: {formatNumber(knowledge.amount[0])}</p>
              <p>Thoughts L1: {formatNumber(thoughts1.amount[0])}</p>
              <p>Human Energy: {formatNumber(humanEnergy.amount[0])}</p>
              <p>Population: {workers.length}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded">
              <h2 className="font-semibold mb-2">Card States</h2>
              {Object.entries(useCardsStore.getState().cardStates).map(
                ([cardId, state]) => (
                  <div key={cardId} className="mb-2">
                    <h3 className="font-medium">{cardId}</h3>
                    <pre className="text-xs">
                      {JSON.stringify(state, null, 2)}
                    </pre>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  )
}

export default App

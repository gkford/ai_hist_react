import { useDevStore } from "@/store/useDevStore"
import { useGameLoopStore } from "@/store/useGameLoopStore"
import { CardDesign } from "@/components/ui/CardDesign"
import { Button } from "@/components/ui/button"
import { ThoughtApplicationDialog } from './components/ui/ThoughtApplicationDialog'
import type { CardType } from "@/data/cards";
import type { DiscoveryStatus } from "@/data/cards";
import { allCards } from "@/data/cards";
import { type CardState } from "@/store/useCardsStore";

function sortCardsInColumn(a: CardState, b: CardState): number {
  // Find the card definitions
  const cardA = allCards.find(c => c.id === a.id);
  const cardB = allCards.find(c => c.id === b.id);
  
  if (!cardA || !cardB) return 0;
  
  // People cards should always be above all other cards
  if (cardA.type === 'people' && cardB.type !== 'people') return -1;
  if (cardB.type === 'people' && cardA.type !== 'people') return 1;
  
  // For non-people cards, sort by discovery timestamp (newer cards on top)
  if (true) {
    const stateA = useCardsStore.getState().cardStates[a.id];
    const stateB = useCardsStore.getState().cardStates[b.id];
    const timeA = stateA?.discovery_state?.discovery_timestamp || 0;
    const timeB = stateB?.discovery_state?.discovery_timestamp || 0;
    return timeB - timeA;  // More recent timestamps (larger numbers) come first
  }
  
  return 0;
}
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useWorkersStore } from '@/store/useWorkersStore'

function getCardColumn(type: CardType, discoveryStatus: DiscoveryStatus): number {
  if (discoveryStatus === 'unthoughtof' || discoveryStatus === 'imagined') {
    return 4;
  }
  
  switch (type) {
    case 'people':
    case 'computation':
    case 'resource':
      return 1;
    case 'production':
      return 2;
    case 'science':
      return 3;
    default:
      return 3;
  }
}
import { useResource } from "@/store/useResourceStore"
import { useCardsStore } from "@/store/useCardsStore"
import { useEffect, useState } from "react"
import { startGameLoop, stopGameLoop } from "@/lib/gameLoop"

function initializeCards() {
  const cardStore = useCardsStore.getState();
  
  cardStore.createCard('hominids', {
    discovery_state: {
      current_status: 'discovered'
    }
  });
  
  // Add food resource card
  cardStore.createCard('food_resource', {
    discovery_state: {
      current_status: 'discovered'
    }
  });

  cardStore.createCard('gather_food', {
    discovery_state: {
      current_status: 'discovered'
    },
  });

  cardStore.createCard('think', {
    discovery_state: {
      current_status: 'discovered'
    }
  });

  cardStore.createCard('hunt', {
    discovery_state: {
      current_status: 'unthoughtof'
    }
  });
}

function WorkerIcon() {
  return (
    <span className="text-sm flex justify-center cursor-grabbing">
      👤
    </span>
  )
}

function App() {
  const [isDragging, setIsDragging] = useState(false)
  const { devMode } = useDevStore()
  const formatNumber = (n: number): string => {
    const trimmed = parseFloat(n.toFixed(3));
    return trimmed.toString();
  }

  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts1 = useResource('thoughts1')
  const humanEnergy = useResource('humanEnergy')
  const workers = useWorkersStore(state => state.workers)

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize cards
    console.log("init")
    initializeCards();
    
    setInitialized(true);
    // Start the game loop
    startGameLoop();
    // Stop it on unmount
    return () => stopGameLoop();
  }, []);

  return (
    <DndContext 
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event) => {
        setIsDragging(false);
        const { active, over } = event;
        if (!over) return;
        
        // Retrieve data we attached in useDraggable
        const activeData = active.data.current;
        if (!activeData) return;
        const workerId = activeData.workerId;
        const currentAssignment = activeData.from;
        const newAssignment = over.id.toString();
        
        // If worker is dropped onto the same tracker, do nothing
        if (currentAssignment === newAssignment) return;
        
        // Update the worker's assignment in the worker store
        useWorkersStore.getState().assignWorker(workerId, newAssignment);
    }}>
      <div className="min-h-screen p-4 flex flex-col">
        <ThoughtApplicationDialog />
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
        </div>
      
      <div className="flex gap-8">
        {[1, 2, 3, 4].map((columnNumber) => (
          <div key={columnNumber} className="flex flex-col gap-4">
            {initialized && 
              Object.values(useCardsStore.getState().cardStates)
                .filter(cardState => {
                  const cardDef = allCards.find(c => c.id === cardState.id);
                  return cardDef && getCardColumn(cardDef.type, cardState.discovery_state.current_status) === columnNumber;
                })
                .sort(sortCardsInColumn)
                .map((cardState) => (
                  <CardDesign key={cardState.id} id={cardState.id} />
                ))
            }
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
            {Object.entries(useCardsStore.getState().cardStates).map(([cardId, state]) => (
              <div key={cardId} className="mb-2">
                <h3 className="font-medium">{cardId}</h3>
                <pre className="text-xs">
                  {JSON.stringify(state, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      <DragOverlay>
        {isDragging && <WorkerIcon />}
      </DragOverlay>
    </DndContext>
  )
}

export default App

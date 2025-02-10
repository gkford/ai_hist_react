import { ResourceDashboard } from "@/components/ui/ResourceDashboard"
import { MasterCard } from "@/components/ui/MasterCard"
import { useResource } from "@/store/useResourceStore"
import { allCards } from "@/data/cards"
import { useCardsStore } from "@/store/useCardsStore"
import { useEffect } from "react"
import { startGameLoop, stopGameLoop } from "@/lib/gameLoop"

function initializeCards() {
  const cardStore = useCardsStore.getState();

  allCards.forEach(cardDef => {
    cardStore.createCard(cardDef.id, {
      discovery_state: {
        current_status: cardDef.id === 'hominids' ? 'discovered' : 'unthoughtof'
      }
    });
  });
}

function App() {
  const formatNumber = (n: number): string => {
    const trimmed = parseFloat(n.toFixed(3));
    return trimmed.toString();
  }

  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts = useResource('thoughts')
  const humanEnergy = useResource('humanEnergy')
  const population = useResource('population')

  useEffect(() => {
    // Initialize cards first
    initializeCards();
    // Then start the game loop
    startGameLoop()
    // Stop it on unmount
    return () => stopGameLoop()
  }, [])

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Resources Dashboard at the top */}
      <ResourceDashboard className="mb-4" />

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          {allCards
            .filter((card) => card.column === 1)
            .map((card) => (
              <MasterCard key={card.id} id={card.id} />
            ))}
        </div>

        <div className="flex flex-col gap-4">
          {allCards
            .filter((card) => card.column === 2)
            .map((card) => (
              <MasterCard key={card.id} id={card.id} />
            ))}
        </div>
      </div>

      {/* Developer Dashboard - moved to the right */}
      <div className="ml-8 flex flex-col gap-4">
        <div className="p-4 border border-gray-200 rounded">
          <h2 className="font-semibold mb-2">Developer Dashboard</h2>
          <p>Food: {formatNumber(food.amount)}</p>
          <p>Knowledge: {formatNumber(knowledge.amount)}</p>
          <p>Thoughts: {formatNumber(thoughts.amount)}</p>
          <p>Human Energy: {formatNumber(humanEnergy.amount)}</p>
          <p>Population: {formatNumber(population.amount)}</p>
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
    </div>
  )
}

export default App

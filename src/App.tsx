import type { ResourceKey } from "@/store/useResourceStore";
import { ResourceDashboard } from "@/components/ui/ResourceDashboard"
import { MasterCard } from "@/components/ui/MasterCard"
import { useResource } from "@/store/useResourceStore"
import { useCardsStore } from "@/store/useCardsStore"
import { calculateFocusPropFromPriorities } from "@/lib/focusCalculator"
import { useFocusStore } from "@/store/useFocusStore"
import { useEffect, useState } from "react"
import { startGameLoop, stopGameLoop } from "@/lib/gameLoop"

function initializeCards() {
  const cardStore = useCardsStore.getState();
  
  cardStore.createCard('hominids', {
    discovery_state: {
      current_status: 'discovered'
    }
  });
  
  cardStore.createCard('gather_food', {
    discovery_state: {
      current_status: 'discovered'
    }
  });

  cardStore.createCard('think', {
    discovery_state: {
      current_status: 'discovered'
    }
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

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize cards first
    console.log("init")
    initializeCards();
    
    // Calculate initial focus values for all resources
    const cardStates = useCardsStore.getState().cardStates;
    const resourceTypes = new Set<ResourceKey | "thoughts">();
    
    // Collect all unique resource types from RT focuses
    Object.values(cardStates).forEach(card => {
      Object.values(card.rts).forEach(rt => {
        resourceTypes.add(rt.focus.resource);
      });
    });

    // For each resource type, calculate focus props
    resourceTypes.forEach(resource => {
      const rtFocusStates: Array<'none' | 'low' | 'high'> = [];
      Object.values(cardStates).forEach(card => {
        Object.values(card.rts).forEach(rt => {
          if (rt.focus.resource === resource) {
            rtFocusStates.push(rt.focus.priority);
          }
        });
      });

      const propValues = calculateFocusPropFromPriorities(rtFocusStates);
      useFocusStore.getState().updateResourceProps(resource, propValues);
    });

    setInitialized(true);
    // Then start the game loop
    startGameLoop();
    // Stop it on unmount
    return () => stopGameLoop();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Resources Dashboard at the top */}
      <ResourceDashboard className="mb-4" />

      <div className="flex gap-8">
        {initialized && Object.values(useCardsStore.getState().cardStates).map((cardState) => (
          <MasterCard key={cardState.id} id={cardState.id} />
        ))}
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

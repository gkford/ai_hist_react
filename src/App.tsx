import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { HominidsCard } from "./components/card_library/HominidsCard"
import { ResourceDashboard } from "@/components/ui/ResourceDashboard"
import { useEffectsStore } from "@/store/useEffectsStore"
import { HuntingCard } from "./components/card_library/HuntingCard"
import { ThinkingCard } from "./components/card_library/ThinkingCard"
import { EarlyStoneToolsCard } from "./components/card_library/EarlyStoneToolsCard"
import { NonVerbalCommunicationCard } from "./components/card_library/NonVerbalCommunicationCard"
import { useResource, useResourceStore } from "@/store/useResourceStore"
import { useRTStore } from "@/store/useRTStore"
import { payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
import { useEffect } from "react"
import { startGameLoop, stopGameLoop } from "@/lib/gameLoop"

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
  const rtStates = useRTStore((state) => state.states)

  useEffect(() => {
    // Start the loop on mount
    startGameLoop()
    // Stop it on unmount
    return () => stopGameLoop()
  }, [])

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Resources Dashboard at the top */}
      <ResourceDashboard className="mb-4" />

      {/* Main game area */}
      <div className="flex gap-8">
        {/* People & Thinking Column */}
        <div className="flex flex-col gap-4">
          <HominidsCard />
          <ThinkingCard />
        </div>

        {/* Food Actions Column */}
        <div className="flex flex-col gap-4">
          <GatherFoodCard />
          <HuntingCard />
        </div>

        {/* Effects Column */}
        <div className="flex flex-col gap-4">
          <EarlyStoneToolsCard />
        </div>

        {/* Communication Column */}
        <div className="flex flex-col gap-4">
          <NonVerbalCommunicationCard />
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
          <h2 className="font-semibold mb-2">RT States</h2>
          {Object.entries(rtStates).map(([rtId, state]) => (
            <div key={rtId} className="mb-2">
              <h3 className="font-medium">{rtId}</h3>
              <pre className="text-xs">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
          ))}
        </div>

        <div className="p-4 border border-gray-200 rounded">
          <h2 className="font-semibold mb-2">Effects States</h2>
          {Object.entries(useEffectsStore.getState().effects).map(([effectId, state]) => {
            // Determine if we should highlight this row
            const shouldHighlight = state.thought_focus > 0 && 
              (state.thought_priority === 'high' || state.thought_priority === 'low');
            
            return (
              <div key={effectId} className="mb-2">
                <h3 className="font-medium">{effectId}</h3>
                <pre className={`text-xs ${shouldHighlight ? "bg-yellow-100" : ""}`}>
                  {JSON.stringify(state, null, 2)}
                </pre>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  )
}

export default App

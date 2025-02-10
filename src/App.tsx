import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { HominidsCard } from "./components/card_library/HominidsCard"
import { ResourceDashboard } from "@/components/ui/ResourceDashboard"
import { HuntingCard } from "./components/card_library/HuntingCard"
import { ThinkingCard } from "./components/card_library/ThinkingCard"
import { EarlyStoneToolsCard } from "./components/card_library/EarlyStoneToolsCard"
import { NonVerbalCommunicationCard } from "./components/card_library/NonVerbalCommunicationCard"
import { useResource, useResourceStore } from "@/store/useResourceStore"
import { useRTStore } from "@/store/useRTStore"
import { payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
import { useEffect, useState } from "react"

function App() {
  const [isPaymentActive, setIsPaymentActive] = useState(true);
  const [isCyclingActive, setIsCyclingActive] = useState(true);
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
    if (!isPaymentActive) return;
    
    const intervalId = setInterval(() => {
      const rtStates = useRTStore.getState().states;
      const population = useResourceStore.getState().resources.population.amount;

      Object.entries(rtStates).forEach(([rtId, state]) => {
        // Type check the focuses
        if ((state.eating_focus === null && state.human_energy_focus === null) ||
            (state.eating_focus !== null && state.human_energy_focus !== null)) {
          console.error(`RT ${rtId} has invalid focus configuration:`, state);
          return;
        }

        // Get the active focus value
        const focusType = state.eating_focus !== null ? 'eating' : 'human_energy';
        const focusValue = state.eating_focus ?? state.human_energy_focus;

        if (focusValue === null) {
          console.error(`RT ${rtId} has unexpected null focus value`);
          return;
        }

        // Skip if focus is 0
        if (focusValue === 0) return;

        // Calculate multiplier based on focus type
        const multiplier = focusType === 'eating' 
          ? focusValue * population 
          : focusValue / 100;

        const success = payForResourceTransformation(rtId, multiplier);
        console.log(`Auto-${focusType} triggered for ${rtId}, multiplier: ${multiplier}, success: ${success}`);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaymentActive]);

  useEffect(() => {
    if (!isCyclingActive) return;
    const intervalId = setInterval(() => {
      const rtStates = useRTStore.getState().states;
      Object.keys(rtStates).forEach(rtId => {
        processRTState(rtId);
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isCyclingActive]);

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

        <div className="mt-4">
          <button 
            onClick={() => setIsPaymentActive(prev => !prev)}
            className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            {isPaymentActive ? "Turn off Payment Function" : "Turn on Payment Function"}
          </button>
          <button 
            onClick={() => setIsCyclingActive(prev => !prev)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            {isCyclingActive ? "Turn off RT State Cycler" : "Turn on RT State Cycler"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { FoodResourceCard } from "./components/card_library/FoodResourceCard"
import { HominidsCard } from "./components/card_library/HominidsCard"
import { HuntingCard } from "./components/card_library/HuntingCard"
import { ThinkingCard } from "./components/card_library/ThinkingCard"
import { useResource, useResourceStore } from "@/store/useResourceStore"
import { useRTStore } from "@/store/useRTStore"
import { payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
import { useEffect, useState } from "react"

function App() {
  const [isEatingActive, setIsEatingActive] = useState(true);
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
    if (!isEatingActive) return;
    
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
          : focusValue;

        const success = payForResourceTransformation(rtId, multiplier);
        console.log(`Auto-${focusType} triggered for ${rtId}, multiplier: ${multiplier}, success: ${success}`);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isEatingActive]);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* <GatherFoodCard /> */}
          {/* <FoodResourceCard /> */}
          <HominidsCard />
          <HuntingCard />
          <ThinkingCard />
        </div>
      </div>
      <div className="flex flex-col gap-4">
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
            onClick={() => setIsEatingActive(prev => !prev)}
            className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            {isEatingActive ? "Turn off Eating Function" : "Turn on Eating Function"}
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

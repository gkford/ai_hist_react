import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { FoodResourceCard } from "./components/card_library/FoodResourceCard"
import { HominidsCard } from "./components/card_library/HominidsCard"
import { useResource, useTransformation } from "@/store/useResourceStore"

function App() {
  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts = useResource('thoughts')
  const humanEnergy = useResource('humanEnergy')
  const population = useResource('population')
  const eatingChickenTransformation = useTransformation("eating_chicken")

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* <GatherFoodCard /> */}
          {/* <FoodResourceCard /> */}
          <HominidsCard />
        </div>
      </div>
      <div className="flex flex-col mt-8 p-4 border border-gray-200 rounded">
        <h2 className="font-semibold mb-2">Developer Dashboard</h2>
        <p>Food: {food.amount.toFixed(3)}</p>
        <p>Knowledge: {knowledge.amount.toFixed(3)}</p>
        <p>Thoughts: {thoughts.amount.toFixed(3)}</p>
        <p>Human Energy: {humanEnergy.amount.toFixed(3)}</p>
        <p>Population: {population.amount.toFixed(3)}</p>
        <p>Eating Chicken Focus: {(eatingChickenTransformation.focusProp * 100).toFixed(0)}%</p>
      </div>
    </div>
  )
}

export default App

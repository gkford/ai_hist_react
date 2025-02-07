import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { FoodResourceCard } from "./components/card_library/FoodResourceCard"
import { HominidsCard } from "./components/card_library/HominidsCard"
import { useResourceStore, useResource } from "@/store/useResourceStore"
import { useEffect } from "react"

function App() {
  const { tick } = useResourceStore()
  const food = useResource('food')
  const knowledge = useResource('knowledge')
  const thoughts = useResource('thoughts')
  const humanEnergy = useResource('humanEnergy')

  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 1000)
    
    console.log('Base URL:', import.meta.env.BASE_URL)
    
    return () => clearInterval(interval)
  }, [tick])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <GatherFoodCard />
          <FoodResourceCard />
          <HominidsCard />
        </div>
      </div>
      <div className="flex flex-col mt-8 p-4 border border-gray-200 rounded">
        <h2 className="font-semibold mb-2">Developer Dashboard</h2>
        <p>Food: {food.amount} (Rate: {food.rate})</p>
        <p>Knowledge: {knowledge.amount} (Rate: {knowledge.rate})</p>
        <p>Thoughts: {thoughts.amount} (Rate: {thoughts.rate})</p>
        <p>Human Energy: {humanEnergy.amount} (Rate: {humanEnergy.rate})</p>
      </div>
    </div>
  )
}

export default App

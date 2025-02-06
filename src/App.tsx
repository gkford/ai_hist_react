import { GatherFoodCard } from "./components/card_library/GatherFoodCard"
import { FoodResourceCard } from "./components/card_library/FoodResourceCard"
import { HominidsCard } from "./components/card_library/HominidsCard"
import { useResourceStore } from "@/store/useResourceStore"
import { useEffect } from "react"

function App() {
  const {
    food,
    knowledge,
    thoughts,
    foodRate,
    knowledgeRate,
    thoughtsRate,
    tick
  } = useResourceStore()

  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 1000)

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
        <p>Food: {food} (Rate: {foodRate})</p>
        <p>Knowledge: {knowledge} (Rate: {knowledgeRate})</p>
        <p>Thoughts: {thoughts} (Rate: {thoughtsRate})</p>
      </div>
    </div>
  )
}

export default App

import { MasterCard } from "@/components/MasterCard"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "../ui/CardInfo"
import { useState } from "react"
import { useResourceStore } from "@/store/useResourceStore"

export function GatherFoodCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const { setFoodRate } = useResourceStore()

  return (
    <MasterCard title="Gather Food">
      <CardImage imageSrc="/card_images/gatherFood.png" />
      <CardInfo className="text-center">+1🍗 per worker</CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={(newValue) => {
          setWorkerCount(newValue)
          setFoodRate(newValue * 1) // 1 food/second per worker
        }}
      />
    </MasterCard>
  )
}

import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { useState } from "react"
import { useResourceStore } from "@/store/useResourceStore"

export function HominidsCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const { setFoodRate } = useResourceStore()

  return (
    <MasterCard title="Hominids">
      <CardImage imageSrc="/placeholder.svg" />
      <CardInfo className="text-center">Eats 1🍗 per worker</CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={(newValue) => {
          setWorkerCount(newValue)
          setFoodRate(-newValue * 1) // -1 food/second per worker
        }}
      />
    </MasterCard>
  )
}

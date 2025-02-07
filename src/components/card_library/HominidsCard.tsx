import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { EatDrumstickProcess } from "@/components/ui/EatDrumstickProcess"
import { useState } from "react"
import { useResourceStore } from "@/store/useResourceStore"

export function HominidsCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const { setFoodConsumption, setHumanEnergyRate } = useResourceStore()

  return (
    <MasterCard title="Hominids" typeIcon="👥" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hominids.png"} />
      <CardInfo className="text-center">Eats 1🍗 per worker</CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={(newValue) => {
          setWorkerCount(newValue)
          setFoodConsumption(-newValue * 1), // -1 food/second per worker
          setHumanEnergyRate(newValue) // 1 energy per worker
        }}
      />
      <EatDrumstickProcess workerCount={workerCount} />
    </MasterCard>
  )
}

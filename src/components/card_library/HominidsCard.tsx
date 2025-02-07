import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { WorkerBar } from "@/components/ui/WorkerBar"
import { EatDrumstickProcess } from "@/components/ui/EatDrumstickProcess"
import { useState } from "react"
import { useResource } from "@/store/useResourceStore"

export function HominidsCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const [processActive, setProcessActive] = useState(false)
  const food = useResource('food')
  const humanEnergy = useResource('humanEnergy')

  const triggerOneTimeProcess = () => {
    setProcessActive(true)
    setTimeout(() => setProcessActive(false), 3000)
  }

  return (
    <MasterCard title="Hominids" typeIcon="👥" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hominids.png"} />
      <CardInfo className="text-center">
        Eats 1{food.icon} per worker
        <button 
          onClick={triggerOneTimeProcess}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Eat Once
        </button>
      </CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={setWorkerCount}
      />
      <EatDrumstickProcess workerCount={processActive} />
    </MasterCard>
  )
}

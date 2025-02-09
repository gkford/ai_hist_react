import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { WorkerBar } from "@/components/ui/WorkerBar"
import type { ResourceTransformationHandle } from "@/components/ui/ResourceTransformation"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { animateResourceTransformation, payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { useRTStore } from "@/store/useRTStore"

export function HominidsCard() {
  const [workerCount, setWorkerCount] = useState(0)
  const food = useResource('food')
  const humanEnergy = useResource('humanEnergy')
  const { states, updateState } = useRTStore()
  const rtState = states["eating_chicken"]

  const handleSliderChange = (value: number[]) => {
    updateState("eating_chicken", {
      ...rtState,
      eating_focus: value[0] / 100
    })
  }

  const triggerPay = () => {
    const success = payForResourceTransformation("eating_chicken");
    console.log("Payment success:", success);
  }

  const triggerTransformation = () => {
    animateResourceTransformation("eating_chicken", inboundEmojis, outboundEmojis, 2500, 2400)
  }

  const transformation = getTransformation("eating_chicken")
  const inboundEmojis = transformation?.inbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(food.icon)
  }).flat() ?? []
  const outboundEmojis = transformation?.outbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(humanEnergy.icon)
  }).flat() ?? []

  return (
    <MasterCard title="Hominids" typeIcon="👥" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hominids.png"} />
      <CardInfo className="text-center">
        Transforms {transformation?.inbound[0].amount}{food.icon} into {transformation?.outbound[0].amount}{humanEnergy.icon} per second per person
        <div className="mt-4 px-8 w-full">
          <Slider
            defaultValue={[rtState?.eating_focus ? rtState.eating_focus * 100 : 100]}
            value={[rtState?.eating_focus ? rtState.eating_focus * 100 : 100]}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
            aria-label="Eating Focus"
          />
          <div className="text-sm text-gray-500 mt-1 text-center">
            Eating Focus: {rtState?.eating_focus ? (rtState.eating_focus * 100).toFixed(0) : 100}%
          </div>
        </div>
        <button 
          onClick={triggerTransformation}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Animate Transformation
        </button>
        <button 
          onClick={triggerPay}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
        >
          Pay For Transform
        </button>
        <button 
          onClick={() => processRTState("eating_chicken")}
          className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
        >
          Process RT Deduction
        </button>
      </CardInfo>
      <WorkerBar
        value={workerCount}
        onChange={setWorkerCount}
      />
      <ResourceTransformation rtId="eating_chicken" />
    </MasterCard>
  )
}

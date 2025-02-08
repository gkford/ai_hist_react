import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { animateResourceTransformation, payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
import { useState } from "react"

export function HuntingCard() {
  // Retrieve resources from the store
  const energy = useResource('humanEnergy')
  const food = useResource('food')

  // Get the "hunt" transformation configuration
  const transformation = getTransformation("hunt")
  
  // Build emoji arrays based on transformation configuration.
  // Inbound should use humanEnergy's icon; outbound should use food's icon.
  const inboundEmojis = transformation?.inbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(energy.icon)
  }).flat() ?? []
  
  const outboundEmojis = transformation?.outbound.map(item => {
    const count = Math.floor(item.amount)
    return Array(count).fill(food.icon)
  }).flat() ?? []

  // Handlers to trigger the various transformations
  const triggerPay = () => {
    const success = payForResourceTransformation("hunt")
    console.log("Hunt Payment success:", success)
  }

  const triggerAnimation = () => {
    animateResourceTransformation("hunt", inboundEmojis, outboundEmojis, 2500, 2400)
  }

  const triggerProcess = () => {
    processRTState("hunt")
  }

  return (
    <MasterCard title="Hunting" typeIcon="🦌" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hunt.png"} />
      <CardInfo className="text-center">
        Converts {transformation?.inbound[0].amount}{energy.icon} into {transformation?.outbound[0].amount}{food.icon} per hunt
        <div className="mt-2">
          <button 
            onClick={triggerAnimation}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Animate Hunt
          </button>
          <button 
            onClick={triggerPay}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Pay For Hunt
          </button>
          <button 
            onClick={triggerProcess}
            className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
          >
            Process Hunt
          </button>
        </div>
      </CardInfo>
      <ResourceTransformation rtId="hunt" />
    </MasterCard>
  )
}

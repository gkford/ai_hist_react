import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"

export function HominidsCard() {
  const food = useResource('food')
  const humanEnergy = useResource('humanEnergy')
  const population = useResource('population')
  const transformation = getTransformation("eating_chicken")

  return (
    <MasterCard title="Hominids" typeIcon="👥" discoveryStatusIcon={null}>
      <CardImage imageSrc={import.meta.env.BASE_URL + "card_images/hominids.png"} />
      <CardInfo className="text-center">
        Your {Math.floor(population.amount)} hominids are eating.... <br></br>
        Transforms {transformation?.inbound[0].amount}{food.icon} into {transformation?.outbound[0].amount}{humanEnergy.icon} per second per person
        {/* <div className="mt-4 px-8 w-full">
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
        </div> */}
      </CardInfo>
      <ResourceTransformation rtId="eating_chicken" />
    </MasterCard>
  )
}

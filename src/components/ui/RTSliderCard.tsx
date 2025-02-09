import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { ResourceTransformation } from "@/components/ui/ResourceTransformation"
import { Slider } from "@/components/ui/slider"
import { useResource } from "@/store/useResourceStore"
import { getTransformation } from "@/data/resourceTransformations"
import { useRTStore } from "@/store/useRTStore"

interface RTSliderCardProps {
  title: string
  typeIcon: string
  imageSrc: string
  rtId: string
}

export function RTSliderCard({ title, typeIcon, imageSrc, rtId }: RTSliderCardProps) {
  const transformation = getTransformation(rtId)
  const { states, updateState } = useRTStore()
  const rtState = states[rtId]

  // Get resources for displaying icons
  const resourcesForDisplay = transformation?.inbound.concat(transformation?.outbound || [])
    .map(item => useResource(item.key))

  const handleSliderChange = (value: number[]) => {
    updateState(rtId, {
      ...rtState,
      human_energy_focus: value[0]
    })
  }

  if (!transformation) return null

  const descriptionText = `Converts ${transformation.inbound.map(item => 
    `${item.amount}${resourcesForDisplay?.find(r => r.key === item.key)?.icon}`
  ).join(', ')} into ${transformation.outbound.map(item => 
    `${item.amount}${resourcesForDisplay?.find(r => r.key === item.key)?.icon}`
  ).join(', ')}`

  return (
    <MasterCard title={title} typeIcon={typeIcon} discoveryStatusIcon={null}>
      <CardImage imageSrc={imageSrc} />
      <CardInfo className="text-center">
        {descriptionText}
        <div className="mt-4 px-8">
          <Slider
            defaultValue={[rtState.human_energy_focus || 0]}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
          />
        </div>
      </CardInfo>
      <ResourceTransformation rtId={rtId} />
    </MasterCard>
  )
}

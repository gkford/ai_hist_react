import { MasterCard } from "@/components/MasterCard"
import { CardImage } from "@/components/ui/CardImage"
import { CardInfo } from "@/components/ui/CardInfo"
import { ResourceTransformation, payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"
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

  // Only show slider if transformation.eating is false
  const showSlider = !transformation?.eating;

  const handleSliderChange = (value: number[]) => {
    updateState(rtId, {
      ...rtState,
      human_energy_focus: showSlider ? value[0] : null
    })
  }

  if (!transformation) return null

  const descriptionText = `Converts ${transformation.inbound.map(item => {
    const resource = resourcesForDisplay?.find(r => r.key === item.key);
    return `${item.amount} ${resource?.icon || ''} ${resource?.name || item.key}`;
  }).join(' and ')} into ${transformation.outbound.map(item => {
    const resource = resourcesForDisplay?.find(r => r.key === item.key);
    return `${item.amount} ${resource?.icon || ''} ${resource?.name || item.key}`;
  }).join(' and ')}`;

  const triggerPay = () => {
    const success = payForResourceTransformation(rtId);
    console.log("Payment success:", success);
  }

  return (
    <MasterCard title={title} typeIcon={typeIcon} discoveryStatusIcon={null}>
      <CardImage imageSrc={imageSrc} />
      <CardInfo className="text-center">
        {descriptionText}
        {showSlider && (
          <div className="mt-4 px-8 w-full">
            <Slider
              defaultValue={[rtState?.human_energy_focus ?? 0]}
              value={[rtState?.human_energy_focus ?? 0]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className="w-full"
              aria-label="Human Energy Focus"
            />
            <div className="text-sm text-gray-500 mt-1 text-center">
              Energy Focus: {rtState?.human_energy_focus ?? 0}%
            </div>
          </div>
        )}
        {/* Debug buttons */}
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={triggerPay}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Pay
          </button>
          <button
            onClick={() => processRTState(rtId)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Process
          </button>
        </div>
      </CardInfo>
      <ResourceTransformation rtId={rtId} />
    </MasterCard>
  )
}

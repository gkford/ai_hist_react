import { OngoingEffects } from '@/data/cards'
import { useResourceStore } from '@/store/useResourceStore'

interface OngoingEffectsViewerProps {
  effects: OngoingEffects
  isDiscovered: boolean
  compact?: boolean
}

export function OngoingEffectsViewer({
  effects,
  isDiscovered,
  compact = false
}: OngoingEffectsViewerProps) {
  if (
    !effects.resourceModifiers ||
    Object.keys(effects.resourceModifiers).length === 0
  ) {
    return null
  }

  const resources = useResourceStore(state => state.resources)
  
  const modifierElements = Object.entries(effects.resourceModifiers).map(([resource, modifier]) => {
    const resourceInfo = resources[resource as keyof typeof resources]
    // Extract level number for thought resources
    const thoughtLevel = resource.match(/thoughts(\d+)/)?.[1]
    
    // Calculate actual bonus amount
    const baseAmount = resourceInfo.rawAmountProducedThisSecond[0]
    const totalAmount = resourceInfo.amountProducedThisSecond[0]
    const bonusAmount = totalAmount - baseAmount
    
    if (compact) {
      return (
        <span key={resource} className="flex items-center gap-1 text-sm">
          {modifier} {resourceInfo.icon} 
          {bonusAmount > 0 && (
            <span className="text-green-600">(+{bonusAmount.toFixed(1)})</span>
          )}
        </span>
      )
    }

    return (
      <div key={resource} className="flex flex-col items-center">
        <span className="flex items-center gap-1">
          {modifier} {thoughtLevel ? `L${thoughtLevel} thoughts ` : ''}{resourceInfo.icon}
        </span>
        {isDiscovered && bonusAmount > 0 && (
          <span className="text-sm text-green-600">
            +{bonusAmount.toFixed(1)}/s
          </span>
        )}
      </div>
    )
  })

  if (compact) {
    return (
      <div className="flex gap-2 items-center">
        {modifierElements}
      </div>
    )
  }

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600">
      <div className="text-center mb-1">
        {isDiscovered ? 'Active' : 'Will give'}:
      </div>
      <div className="flex gap-4 items-center justify-center">
        {modifierElements}
      </div>
    </div>
  )
}

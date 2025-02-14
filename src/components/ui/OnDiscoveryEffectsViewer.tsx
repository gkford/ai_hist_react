import { OnDiscoveryEffects } from '@/data/cards'
import { useResourceStore } from '@/store/useResourceStore'

interface OnDiscoveryEffectsViewerProps {
  effects: OnDiscoveryEffects
  isDiscovered: boolean
}

export function OnDiscoveryEffectsViewer({
  effects,
  isDiscovered,
}: OnDiscoveryEffectsViewerProps) {
  if (
    !effects.resourceBonuses ||
    Object.keys(effects.resourceBonuses).length === 0
  ) {
    return null
  }

  const resources = useResourceStore(state => state.resources)
  
  const bonusElements = Object.entries(effects.resourceBonuses).map(([resource, amount]) => (
    <span key={resource} className="flex items-center gap-1">
      +{amount} {resources[resource as keyof typeof resources].icon}
    </span>
  ))

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600 flex gap-2 items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {bonusElements}
      </div>
      {isDiscovered ? ' awarded' : ' on discovery'}
    </div>
  )
}

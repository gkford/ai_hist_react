import { OnDiscoveryEffects } from '@/data/cards'

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

  const bonusText = Object.entries(effects.resourceBonuses)
    .map(([resource, amount]) => `${amount} ${resource}`)
    .join(' and ')

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600">
      {isDiscovered
        ? `Gave ${bonusText} when it was discovered`
        : `Gives ${bonusText} on discovery`}
    </div>
  )
}

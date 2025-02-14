import { OnDiscoveryEffects } from '@/data/cards'
import { useResourceStore } from '@/store/useResourceStore'
import { WORKER_ICONS } from '@/store/useWorkersStore'

interface OnDiscoveryEffectsViewerProps {
  effects: OnDiscoveryEffects
  isDiscovered: boolean
}

export function OnDiscoveryEffectsViewer({
  effects,
  isDiscovered,
}: OnDiscoveryEffectsViewerProps) {
  if (
    (!effects.resourceBonuses || Object.keys(effects.resourceBonuses).length === 0) &&
    !effects.upgradeWorkers
  ) {
    return null
  }

  const resources = useResourceStore(state => state.resources)
  
  const bonusElements = effects.resourceBonuses ? 
    Object.entries(effects.resourceBonuses).map(([resource, amount]) => (
      <span key={resource} className="flex items-center gap-1">
        +{amount} {resources[resource as keyof typeof resources].icon}
      </span>
    )) : []

  const workerUpgradeElement = effects.upgradeWorkers ? (
    <span className="flex items-center gap-1">
      Upgrade {effects.upgradeWorkers} {WORKER_ICONS[1]} → {WORKER_ICONS[2]}
    </span>
  ) : null

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600 flex gap-2 items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {bonusElements}
        {bonusElements.length > 0 && workerUpgradeElement && <span className="mx-1">•</span>}
        {workerUpgradeElement}
      </div>
      {isDiscovered ? ' awarded' : ' on discovery'}
    </div>
  )
}

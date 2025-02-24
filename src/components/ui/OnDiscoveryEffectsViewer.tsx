import { OnDiscoveryEffects } from '@/data/cards'
import { useResourceStore } from '@/store/useResourceStore'
import { WORKER_TYPES } from '@/store/useWorkersStore'

interface OnDiscoveryEffectsViewerProps {
  effects: OnDiscoveryEffects
  isDiscovered: boolean
  compact?: boolean
}

export function OnDiscoveryEffectsViewer({
  effects,
  isDiscovered,
  compact = false
}: OnDiscoveryEffectsViewerProps) {
  if (
    (!effects.resourceBonuses || Object.keys(effects.resourceBonuses).length === 0) &&
    !effects.upgradeWorkers
  ) {
    return null
  }

  const resources = useResourceStore(state => state.resources)
  
  const bonusElements = effects.resourceBonuses ? 
    Object.entries(effects.resourceBonuses).map(([resource, amount]) => {
      const resourceInfo = resources[resource as keyof typeof resources]
      // Handle percentage values
      const displayAmount = amount.toString().includes('%') 
        ? amount 
        : `+${amount}`
      
      return (
        <span key={resource} className="flex items-center gap-1">
          {displayAmount} {resourceInfo.icon}
        </span>
      )
    }) : []

  const workerUpgradeElement = effects.upgradeWorkers ? (
    <span className="flex items-center gap-1">
      <div className="flex flex-col items-center">
        <div>CULTURAL EVOLUTION! 📚</div>
        <div>
          {isDiscovered ? 'The thinking of' : 'The thinking of'} {effects.upgradeWorkers} {effects.upgradeWorkers === 1 ? 'worker' : 'workers'} {isDiscovered ? 'improved' : 'will improve'} to {WORKER_TYPES[(effects.targetLevel || 1) as keyof typeof WORKER_TYPES].name}!
        </div>
      </div>
    </span>
  ) : null

  if (compact) {
    const workerUpgradeElement = effects.upgradeWorkers ? (
      <span className="flex items-center gap-1 text-sm">
        +{effects.upgradeWorkers} {WORKER_TYPES[(effects.targetLevel || 2) as keyof typeof WORKER_TYPES].icon}
      </span>
    ) : null;

    return (
      <div className="flex gap-2 items-center">
        {bonusElements}
        {workerUpgradeElement}
      </div>
    );
  }

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600 flex gap-2 items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {bonusElements}
        {bonusElements.length > 0 && workerUpgradeElement && <span className="mx-1">•</span>}
        {workerUpgradeElement}
      </div>
    </div>
  )
}

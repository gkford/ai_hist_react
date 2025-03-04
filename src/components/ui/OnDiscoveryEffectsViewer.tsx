import { OnDiscoveryEffects } from '@/data/cards'
import { useResourceStore } from '@/store/useResourceStore'
import { WORKER_TYPES, useWorkersStore } from '@/store/useWorkersStore'

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

  const workers = useWorkersStore(state => state.workers)
  let fromLevel = 0, targetLevel = 0, count = 0;
  if (workers.length > 0) {
    const levels = workers.map(w => w.level)
    fromLevel = Math.min(...levels)
    if (new Set(levels).size === 1) {
      targetLevel = Math.min(fromLevel + 1, 4)
      count = Math.ceil(workers.length / 2)
    } else {
      targetLevel = Math.max(...levels)
      count = workers.filter(w => w.level < targetLevel).length
    }
  }
  const workerUpgradeElement = effects.upgradeWorkers ? (
    <span className="flex items-center gap-1">
      <div className="flex flex-col items-center">
        <div>CULTURAL EVOLUTION! 📚</div>
        <div>
          {count} {WORKER_TYPES[fromLevel].icon} → {WORKER_TYPES[targetLevel].icon}
        </div>
      </div>
    </span>
  ) : null

  if (compact) {
    const workerUpgradeElement = effects.upgradeWorkers ? (
      <span className="flex items-center gap-1 text-sm">
        {count} {WORKER_TYPES[fromLevel].icon} → {WORKER_TYPES[targetLevel].icon}
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

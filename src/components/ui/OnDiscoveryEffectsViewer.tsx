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
      {effects.upgradeWorkers === 5 ? (
        <>CULTURAL EVOLUTION! 📚 The thinking of your population improves!</>
      ) : (
        <>{isDiscovered ? ' Upgraded' : ' Will upgrade'} {effects.upgradeWorkers} workers</>
      )}
    </span>
  ) : null

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

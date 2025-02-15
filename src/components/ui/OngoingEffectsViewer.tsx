import { OngoingEffects } from '@/data/cards'

interface OngoingEffectsViewerProps {
  effects: OngoingEffects
  isDiscovered: boolean
}

export function OngoingEffectsViewer({
  effects,
  isDiscovered,
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
    return (
      <span key={resource} className="flex items-center gap-1">
        {modifier} {resourceInfo.icon}
      </span>
    )
  })

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600 flex gap-2 items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {modifierElements}
      </div>
      {isDiscovered ? ' active' : ' when discovered'}
    </div>
  )
}

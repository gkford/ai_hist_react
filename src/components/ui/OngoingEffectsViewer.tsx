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
    if (compact) {
      return (
        <span key={resource} className="flex items-center gap-1 text-sm">
          {modifier} {resourceInfo.icon}
        </span>
      )
    }

    return (
      <span key={resource} className="flex items-center gap-1">
        {modifier} {thoughtLevel ? `L${thoughtLevel} thoughts ` : ''}{resourceInfo.icon}
      </span>
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
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600 flex gap-2 items-center justify-center">
      <div className="flex gap-2 items-center justify-center">
        {isDiscovered ? ' Active' : 'Will give'}:{modifierElements}
      </div>
    </div>
  )
}

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

  const modifierText = Object.entries(effects.resourceModifiers)
    .map(([resource, multiplier]) => {
      const percentage = ((multiplier - 1) * 100).toFixed(0)
      return `${resource} by ${percentage}%`
    })
    .join(' and ')

  return (
    <div className="p-2 text-sm border-t border-gray-200 text-gray-600">
      {isDiscovered
        ? `Increases ${modifierText}`
        : `Will increase ${modifierText} when discovered`}
    </div>
  )
}

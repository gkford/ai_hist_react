import { useCardsStore } from '@/store/useCardsStore'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
import { CardDesign } from './CardDesign'
import { Button } from './button'
import { cn } from '@/lib/utils'

export function ResearchDialog() {
  const { isResearchDialogOpen, closeResearchDialog, newlyAvailableCards } =
    useDiscoveryStore()
  const { cardStates, updateCardState } = useCardsStore()

  // Get all unlocked cards that can be researched
  const researchableCards = Object.values(cardStates)
    .filter((card) => card.discovery_state.current_status === 'unlocked')
    .map((card) => card.id)

  const handleCardSelect = (cardId: string) => {
    // Set the selected card's priority to 'on'
    const card = cardStates[cardId]
    updateCardState(cardId, {
      discovery_state: {
        ...card.discovery_state,
        priority: 'on',
      },
    })

    // Close the dialog and resume the game
    closeResearchDialog()
  }

  if (!isResearchDialogOpen || researchableCards.length === 0) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-4">Research Options</h2>
        <p className="text-gray-600 mb-4">
          Select a discovery to focus your thoughts on:
        </p>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto mb-4">
          {researchableCards.map((cardId) => {
            const isNew = newlyAvailableCards.includes(cardId)

            return (
              <div
                key={cardId}
                className={cn(
                  'border rounded-lg p-4 hover:bg-blue-50 transition-colors',
                  isNew && 'border-blue-500 bg-blue-50'
                )}
              >
                {isNew && (
                  <div className="mb-2 text-blue-600 font-medium flex items-center gap-1">
                    <span>✨</span> Newly Available
                  </div>
                )}
                <CardDesign id={cardId} />
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => handleCardSelect(cardId)}
                    variant="outline"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Focus Thoughts on This
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={closeResearchDialog} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

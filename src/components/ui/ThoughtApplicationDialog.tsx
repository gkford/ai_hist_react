import { useCardsStore } from '@/store/useCardsStore'
import { Button } from '@/components/ui/button'
import { WORKER_ICONS } from '@/store/useWorkersStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'

export function ThoughtApplicationDialog() {
  const { isThoughtDialogOpen, closeThoughtDialog } = useGameLoopStore()
  const { cardStates, updateCardState } = useCardsStore()
  
  // Find all unthoughtof cards
  const unthoughtofCards = Object.values(cardStates)
    .filter(card => card.discovery_state.current_status === 'unthoughtof')
    .sort((a, b) => a.discovery_state.thought_level - b.discovery_state.thought_level)
  
  const handleCardSelect = (cardId: string) => {
    // Set the selected card's priority to 'on'
    const card = cardStates[cardId];
    updateCardState(cardId, {
      discovery_state: {
        ...card.discovery_state,
        priority: 'on'
      }
    })
    
    // Close the dialog and resume the game
    closeThoughtDialog()
  }
  
  if (!isThoughtDialogOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Where would you like to apply your thoughts?</h2>
        
        {unthoughtofCards.length === 0 ? (
          <p className="text-gray-600 mb-4">No discoveries available to apply thoughts to.</p>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-4">
            {unthoughtofCards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardSelect(card.id)}
                className="w-full text-left p-3 border rounded bg-white hover:bg-blue-50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{card.title}</div>
                  <div className="text-sm text-gray-500">
                    Requires {WORKER_ICONS[card.discovery_state.thought_level as keyof typeof WORKER_ICONS]} level thoughts
                  </div>
                </div>
                <div className="text-blue-500">Select</div>
              </button>
            ))}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button onClick={closeThoughtDialog} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

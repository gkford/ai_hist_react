import { useCardsStore } from '@/store/useCardsStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { CardDesign } from './CardDesign'
import { Button } from './button'

export function DiscoveryDialog() {
  const { isDiscoveryDialogOpen, closeDiscoveryDialog, newlyDiscoveredCards } = useGameLoopStore()
  const { cardStates, updateCardState } = useCardsStore()
  
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
    closeDiscoveryDialog()
  }
  
  if (!isDiscoveryDialogOpen || newlyDiscoveredCards.length === 0) return null
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-4">New Discoveries Available!</h2>
        <p className="text-gray-600 mb-4">
          You've unlocked new possibilities. Would you like to focus your thoughts on one of these discoveries?
        </p>
        
        <div className="space-y-6 max-h-[70vh] overflow-y-auto mb-4">
          {newlyDiscoveredCards.map(cardId => (
            <div key={cardId} className="border rounded-lg p-4 hover:bg-blue-50 transition-colors">
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
          ))}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={closeDiscoveryDialog}
            variant="outline"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

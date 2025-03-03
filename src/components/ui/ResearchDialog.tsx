import * as React from 'react'
import { useCardsStore } from '@/store/useCardsStore'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { CardDesign } from './CardDesign'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { allCards } from '@/data/cards'
import { UnlockQuizModal } from './UnlockQuizModal'

export function ResearchDialog() {
  const { newlyAvailableCards } = useDiscoveryStore()
  const { isResearchDialogOpen, closeResearchDialog } = useGameLoopStore()
  const { cardStates, updateCardState } = useCardsStore()
  const [showQuiz, setShowQuiz] = React.useState(false)
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(null)

  // Get all unlocked and locked cards that can be researched
  const researchableCards = Object.values(cardStates)
    .filter((card) => 
      card.discovery_state.current_status === 'unlocked' || 
      card.discovery_state.current_status === 'locked'
    )
    .map((card) => card.id)

  const handleCardSelect = (cardId: string) => {
    const card = cardStates[cardId]
    
    if (card.discovery_state.current_status === 'locked') {
      // For locked cards, show the quiz
      setSelectedCardId(cardId)
      setShowQuiz(true)
    } else {
      // For unlocked cards, set priority to 'on'
      updateCardState(cardId, {
        discovery_state: {
          ...card.discovery_state,
          priority: 'on',
        },
      })

      // Close the dialog and resume the game
      closeResearchDialog()
    }
  }

  const handleQuizClose = () => {
    setShowQuiz(false)
    setSelectedCardId(null)
  }

  if (!isResearchDialogOpen) return null

  return (
    <>
      {showQuiz && selectedCardId && (
        <UnlockQuizModal 
          cardId={selectedCardId} 
          onClose={handleQuizClose} 
        />
      )}
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
          <h2 className="text-xl font-bold mb-4">Research Options</h2>
          <p className="text-gray-600 mb-4">
            Select a discovery to focus your thoughts on:
          </p>

          {researchableCards.length === 0 ? (
            <p className="text-center text-gray-500 my-8">
              No cards available for research at this time.
            </p>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto mb-4">
              {researchableCards.map((cardId) => {
                const card = cardStates[cardId]
                const cardDef = allCards.find(c => c.id === cardId)
                const isNew = newlyAvailableCards.includes(cardId)
                const isLocked = card.discovery_state.current_status === 'locked'

                return (
                  <div
                    key={cardId}
                    className={cn(
                      'border rounded-lg p-4 hover:bg-blue-50 transition-colors',
                      isNew && 'border-blue-500 bg-blue-50'
                    )}
                  >
                    {isNew && !isLocked && (
                      <div className="mb-2 text-blue-600 font-medium flex items-center gap-1">
                        <span>✨</span> Newly Available
                      </div>
                    )}
                    {isLocked && (
                      <div className="mb-2 text-amber-600 font-medium flex items-center gap-1">
                        <span>🔒</span> Locked - Click to take quiz
                      </div>
                    )}
                    <CardDesign id={cardId} />
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={() => handleCardSelect(cardId)}
                        variant="outline"
                        className={isLocked ? "text-amber-500 hover:text-amber-700" : "text-blue-500 hover:text-blue-700"}
                      >
                        {isLocked ? "Unlock with Quiz" : "Focus Thoughts on This"}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button onClick={closeResearchDialog} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

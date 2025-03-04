import * as React from 'react'
import { useCardsStore } from '@/store/useCardsStore'
import { useDiscoveryStore } from '@/store/useDiscoveryStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { CardDesign } from './CardDesign'
import { Button } from './button'
import { cn } from '@/lib/utils'
// import { allCards } from '@/data/cards'
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
      // For locked cards, show the quiz and close the research dialog
      setSelectedCardId(cardId)
      setShowQuiz(true)
      closeResearchDialog() // Close the research dialog when showing quiz
    } else {
      // First, turn off priority for all other cards
      Object.entries(cardStates).forEach(([id, cardState]) => {
        if (id !== cardId && cardState.discovery_state.priority === 'on') {
          updateCardState(id, {
            discovery_state: {
              ...cardState.discovery_state,
              priority: 'off',
            }
          });
        }
      });
      
      // For unlocked cards, set priority to 'on'
      updateCardState(cardId, {
        discovery_state: {
          ...card.discovery_state,
          priority: 'on',
        },
      });
      
      console.log(`Set priority for card ${cardId} to 'on' from ResearchDialog`);

      // Close the dialog and resume the game
      closeResearchDialog()
    }
  }

  const handleQuizClose = () => {
    // Make sure the game is running when closing the quiz
    useGameLoopStore.getState().setRunning(true)
    setShowQuiz(false)
    setSelectedCardId(null)
  }

  // If quiz is showing, render only the quiz modal
  if (showQuiz && selectedCardId) {
    return (
      <UnlockQuizModal 
        cardId={selectedCardId} 
        onClose={handleQuizClose} 
      />
    )
  }

  if (!isResearchDialogOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
          <h2 className="text-xl font-bold mb-4">What would you like to do next?</h2>
          <p className="text-gray-600 mb-4">
            Here are some cards you can either research or unlock:
          </p>

          {researchableCards.length === 0 ? (
            <p className="text-center text-gray-500 my-8">
              No cards available for research at this time.
            </p>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto mb-4">
              {researchableCards.map((cardId) => {
                const card = cardStates[cardId]
                // const cardDef = allCards.find(c => c.id === cardId)
                const isNew = newlyAvailableCards.includes(cardId)
                const isLocked = card.discovery_state.current_status === 'locked'

                return (
                  <div
                    key={cardId}
                    className={cn(
                      'border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer relative group',
                      isNew && 'border-blue-500 bg-blue-50'
                    )}
                    onClick={() => handleCardSelect(cardId)}
                  >
                    {isNew && !isLocked && (
                      <div className="mb-2 text-blue-600 font-medium flex items-center gap-1">
                        <span>✨</span> Ready to research
                      </div>
                    )}
                    {isLocked && (
                      <div className="mb-2 text-amber-600 font-medium flex items-center gap-1">
                        <span>🔒</span> Unlock to research
                      </div>
                    )}
                    <div className="pointer-events-none relative">
                      <CardDesign id={cardId} disableInteractions={true} />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                        <span className="bg-white/70 text-black font-medium text-lg px-4 py-2 rounded">
                          {isLocked ? "Unlock this card" : "Focus Thoughts on This"}
                        </span>
                      </div>
                    </div>
                    {/* No explicit button, just hover text on the card itself */}
                  </div>
                )
              })}
            </div>
          )}

          {/* No close button - force player to make a choice */}
        </div>
      </div>
  )
}

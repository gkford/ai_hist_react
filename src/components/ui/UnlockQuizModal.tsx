import * as React from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { useCardsStore } from '@/store/useCardsStore'
import { allCards } from '@/data/cards'

interface UnlockQuizModalProps {
  cardId: string
  onClose: () => void
}

export function UnlockQuizModal({ cardId, onClose }: UnlockQuizModalProps) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null)
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null)
  const [isWaiting, setIsWaiting] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(5)
  const cardDef = allCards.find(c => c.id === cardId)
  
  // Get quiz for this card
  const quiz = cardDef?.quiz || {
    question: "What is the primary benefit of hunting?",
    answers: [
      "It provides more food than gathering",
      "It's easier than gathering",
      "It requires fewer workers",
      "It doesn't require any tools"
    ],
    correctAnswer: 0
  }
  
  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    const correct = selectedAnswer === quiz.correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      // Unlock the card and set it to being researched
      useCardsStore.getState().updateCardState(cardId, {
        discovery_state: {
          ...useCardsStore.getState().cardStates[cardId].discovery_state,
          current_status: 'unlocked',
          priority: 'on',
        }
      })
      
      // Close the modal after a short delay
      setTimeout(() => {
        onClose()
      }, 1000)
    } else {
      // Start the waiting period
      setIsWaiting(true)
      
      // Set up countdown timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsWaiting(false)
            setSelectedAnswer(null)
            setIsCorrect(null)
            return 5
          }
          return prev - 1
        })
      }, 1000)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Unlock {cardDef?.title || 'Card'}</h2>
        
        <p className="text-gray-700 mb-4">
          {quiz.question}
        </p>
        
        <div className="space-y-2 mb-6">
          {quiz.answers.map((answer, index) => (
            <div 
              key={index}
              className={cn(
                "border rounded-md p-3 cursor-pointer hover:bg-blue-50 transition-colors",
                selectedAnswer === index && "border-blue-500 bg-blue-50"
              )}
              onClick={() => !isWaiting && setSelectedAnswer(index)}
            >
              {answer}
            </div>
          ))}
        </div>
        
        {isCorrect === true && (
          <div className="mb-4 text-green-600 font-medium">
            Correct! Unlocking card...
          </div>
        )}
        
        {isCorrect === false && (
          <div className="mb-4 text-red-600 font-medium">
            Incorrect. {isWaiting ? `Please wait ${timeLeft} seconds before trying again.` : 'Try again.'}
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={selectedAnswer === null || isWaiting}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

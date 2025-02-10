import { useCardsStore } from "@/store/useCardsStore"
import { processRTState } from "@/components/ui/ResourceTransformation"
import { allCards } from "@/data/cards"

let intervalId: number | null = null

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const cardStates = useCardsStore.getState().cardStates;

    // Process each card's transformation
    Object.keys(cardStates).forEach((cardId) => {
      const cardDef = allCards.find(c => c.id === cardId);
      if (cardDef?.transformation) {
        processRTState(cardId);
      }
    });
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

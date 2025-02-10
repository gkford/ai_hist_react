import { useCardsStore } from "@/store/useCardsStore"
import { ResourceTransformationProcessor } from "@/components/ui/ResourceTransformation"
import { allCards } from "@/data/cards"

let intervalId: number | null = null

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const cardStates = useCardsStore.getState().cardStates;

    Object.keys(cardStates).forEach((cardId) => {
      const cardDef = allCards.find(c => c.id === cardId);
      const state = cardStates[cardId];
      
      if (cardDef?.transformation && state?.discovery_state?.current_status === 'discovered') {
        ResourceTransformationProcessor.processTransformation(cardId);
      }
    });
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

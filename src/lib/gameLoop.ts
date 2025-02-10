import { useCardsStore } from "@/store/useCardsStore"
import { useResourceStore } from "@/store/useResourceStore"
import { allCards } from "@/data/cards"

let intervalId: number | null = null

function processCardTransformation(cardId: string, multiplier: number = 1) {
  const cardStore = useCardsStore.getState();
  const resourceStore = useResourceStore.getState();
  const cardDef = allCards.find(c => c.id === cardId);
  const cardState = cardStore.cardStates[cardId];

  if (!cardDef?.transformation || cardState.status !== 'discovered') return;

  // Process inbound resources
  const canPay = cardDef.transformation.inbound.every(({ resource, amount }) => {
    return resourceStore.resources[resource].amount >= amount * multiplier;
  });

  if (!canPay) return;

  // Pay resources
  cardDef.transformation.inbound.forEach(({ resource, amount }) => {
    resourceStore.updateResource(resource, -amount * multiplier);
  });

  // Grant resources
  cardDef.transformation.outbound.forEach(({ resource, amount }) => {
    resourceStore.updateResource(resource, amount * multiplier);
  });
}

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const cardStates = useCardsStore.getState().cardStates;

    // Process each card's transformation
    Object.keys(cardStates).forEach((cardId) => {
      const cardState = cardStates[cardId];
      if (cardState.sliderValue) {
        processCardTransformation(cardId, cardState.sliderValue);
      } else {
        processCardTransformation(cardId);
      }
    });
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

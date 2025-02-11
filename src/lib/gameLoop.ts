import { useCardsStore } from "@/store/useCardsStore"
// import { ResourceTransformationProcessor } from "@/components/ui/ResourceTransformation"

let intervalId: number | null = null

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const cardStates = useCardsStore.getState().cardStates;

    Object.keys(cardStates).forEach((cardId) => {
      const state = cardStates[cardId];
      

    });
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

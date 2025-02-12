import { processRTPayments, processTransformations } from "./rtManager";

let intervalId: number | null = null;

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    
    processTransformations();
    // Measure produced amounts of rate resources here
    processRTPayments();
    // Measure remaining amounts of rate resources here, and update usage proportion, then reset rate resources to 0


    
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

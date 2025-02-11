import { processRTs, processTransformations } from "./rtManager";

let intervalId: number | null = null;

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    processRTs();
    processTransformations();
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

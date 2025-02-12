import { processRTPayments, processTransformations } from "./rtManager";
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore";

let intervalId: number | null = null;

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const store = useResourceStore.getState();
    
    // First process transformations which generate resources
    processTransformations();
    
    // Track how much was produced
    store.trackProducedAmount('thoughts');
    store.trackProducedAmount('humanEnergy');
    
    // Process payments which consume resources
    processRTPayments();
    
    // Calculate usage for rate resources
    ['thoughts', 'humanEnergy'].forEach(resourceKey => {
      const resource = store.resources[resourceKey as ResourceKey];
      if (resource.amountProduced && resource.amountProduced > 0) {
        const consumed = resource.amountProduced - resource.amount;
        const usage = consumed / resource.amountProduced;
        store.setResourceUsage(resourceKey as ResourceKey, usage);
      }
      // Reset rate resource to 0
      store.updateResource(resourceKey as ResourceKey, -resource.amount);
    });
    
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

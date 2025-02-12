import { processRTPayments, processTransformations } from "./rtManager";
import { processDiscoveries } from "./discoveryManager";
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore";

let intervalId: number | null = null;

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const store = useResourceStore.getState();
    
    // First process transformations which generate resources
    processTransformations();
    
    // Process discoveries
    processDiscoveries();
    
    // Get all rate-type resources
    const rateResources = Object.entries(store.resources)
      .filter(([_, resource]) => resource.isRate)
      .map(([key]) => key as ResourceKey);
    
    // Track produced amounts for all rate resources
    rateResources.forEach(resourceKey => {
      store.trackProducedAmount(resourceKey);
    });
    
    // Process payments which consume resources
    processRTPayments();
    
    // Calculate usage for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      if (resource.amountProduced && resource.amountProduced > 0) {
        const consumed = resource.amountProduced - resource.amount;
        const usage = consumed / resource.amountProduced;
        store.setResourceUsage(resourceKey, usage);
      } else {
        store.setResourceUsage(resourceKey, 0);
      }
      // Reset rate resource to 0
      store.updateResource(resourceKey, -resource.amount);
    });
    
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

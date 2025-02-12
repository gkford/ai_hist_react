import { processRTPayments, processTransformations } from "./rtManager";
import { processDiscoveries } from "./discoveryManager";
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore";

let intervalId: number | null = null;

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    const store = useResourceStore.getState();
    console.log("Start of loop - thoughts:", store.resources.thoughts.amount);
    
    // Store previous amounts for all resources
    Object.keys(store.resources).forEach(key => {
      const resourceKey = key as ResourceKey;
      const resource = store.resources[resourceKey];
      store.updateResource(resourceKey, 0, { previousAmount: resource.amount });
    });
    console.log("After storing previous - thoughts:", store.resources.thoughts.amount);

    // Process transformations which generate resources
    processTransformations();
    console.log("After transformations - thoughts:", store.resources.thoughts.amount);

    // Get rate resources for tracking production
    const rateResources = Object.entries(store.resources)
      .filter(([_, resource]) => resource.isRate)
      .map(([key]) => key as ResourceKey);

    // Track production amounts for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      const production = resource.amount - resource.previousAmount;
      store.updateResource(resourceKey, 0, { amountProduced: production });
    });

    // Process discoveries
    processDiscoveries();
    console.log("After discoveries - thoughts:", store.resources.thoughts.amount);
    
    // Calculate raw production and apply bonuses for all resources
    Object.entries(store.resources).forEach(([key, resource]) => {
      const resourceKey = key as ResourceKey;
      const rawProduction = resource.amount - resource.previousAmount;
      
      // Store raw production amount
      store.updateResource(resourceKey, 0, { rawProduction });
      
      // Apply bonus to production if there was any
      if (rawProduction > 0) {
        const bonusedProduction = rawProduction * resource.bonus;
        const additionalFromBonus = bonusedProduction - rawProduction;
        store.updateResource(resourceKey, additionalFromBonus);
      }
    });
    console.log("After bonuses - thoughts:", store.resources.thoughts.amount);

    // Get all rate-type resources
    const rateResources = Object.entries(store.resources)
      .filter(([_, resource]) => resource.isRate)
      .map(([key]) => key as ResourceKey);
    
    // Track final produced amounts for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      const finalProduction = resource.amount - resource.previousAmount;
      store.updateResource(resourceKey, 0, { amountProduced: finalProduction });
    });
    
    // Process payments which consume resources
    processRTPayments();
    console.log("After RT payments - thoughts:", store.resources.thoughts.amount);
    
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
    console.log("End of loop - thoughts:", store.resources.thoughts.amount);
    
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

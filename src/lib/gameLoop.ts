import { processRTPayments, processTransformations } from "./rtManager";
import { processDiscoveries } from "./discoveryManager";
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore";

let intervalId: number | null = null;

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    console.log("=== Game Loop Start ===");
    const store = useResourceStore.getState();
    
    // Store previous amounts for all resources
    Object.keys(store.resources).forEach(key => {
      const resourceKey = key as ResourceKey;
      const resource = store.resources[resourceKey];
      store.updateResource(resourceKey, 0, { previousAmount: resource.amount });
    });
    console.log("Previous Resource States:", Object.fromEntries(
      Object.entries(store.resources).map(([key, r]) => [key, r.previousAmount])
    ));

    // Process transformations which generate resources
    console.log("Processing Transformations...");
    processTransformations();

    // Get rate resources for tracking production
    const rateResources = Object.entries(store.resources)
      .filter(([_, resource]) => resource.isRate)
      .map(([key]) => key as ResourceKey);
    
    console.log("Rate Resources:", rateResources);

    // Track production amounts for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      const production = resource.amount - resource.previousAmount;
      store.updateResource(resourceKey, 0, { amountProduced: production });
      console.log(`Initial ${resourceKey} production:`, production);
    });

    // Process discoveries
    console.log("Processing Discoveries...");
    processDiscoveries();
    
    // Calculate raw production and apply bonuses for all resources
    console.log("Calculating Production and Bonuses...");
    Object.entries(store.resources).forEach(([key, resource]) => {
      const resourceKey = key as ResourceKey;
      const rawProduction = resource.amount - resource.previousAmount;
      console.log(`${resourceKey} raw production:`, rawProduction);
      
      // Store raw production amount
      store.updateResource(resourceKey, 0, { rawProduction });
      
      // Apply bonus to production if there was any
      if (rawProduction > 0) {
        const bonusedProduction = rawProduction * resource.bonus;
        const additionalFromBonus = bonusedProduction - rawProduction;
        store.updateResource(resourceKey, additionalFromBonus);
        console.log(`${resourceKey} bonus production:`, additionalFromBonus);
      }
    });

    // Track final produced amounts for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      const finalProduction = resource.amount - resource.previousAmount;
      store.updateResource(resourceKey, 0, { amountProduced: finalProduction });
      console.log(`${resourceKey} final production:`, finalProduction);
    });
    
    // Process payments which consume resources
    console.log("Processing RT Payments...");
    processRTPayments();
    
    // Calculate usage for rate resources
    console.log("Calculating Resource Usage...");
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      if (resource.amountProduced && resource.amountProduced > 0) {
        const consumed = resource.amountProduced - resource.amount;
        const usage = consumed / resource.amountProduced;
        store.setResourceUsage(resourceKey, usage);
        console.log(`${resourceKey} usage:`, usage, `(consumed: ${consumed})`);
      } else {
        store.setResourceUsage(resourceKey, 0);
      }
      // Reset rate resource to 0
      store.updateResource(resourceKey, -resource.amount);
    });
    
    console.log("=== Game Loop End ===");
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

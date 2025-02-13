import { processRTPayments, processTransformations } from "./rtManager";
import { processDiscoveries } from "./discoveryManager";
import { processKnowledgeLevel } from "./knowledgeManager";
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore";
import { logger } from "./logger";

let intervalId: number | null = null;

export function setVerboseLogging(verbose: boolean) {
  logger.setVerbose(verbose);
}

export function startGameLoop() {
  if (intervalId) return;

  intervalId = window.setInterval(() => {
    logger.log("=== Game Loop Start ===");
    
    // Process knowledge level before other updates
    processKnowledgeLevel();
    
    const store = useResourceStore.getState();
    

    // Process transformations which generate resources
    logger.log("Processing Transformations...");
    processTransformations();

    // Get rate resources for tracking production
    const rateResources = Object.entries(store.resources)
      .filter(([_, resource]) => resource.isRate)
      .map(([key]) => key as ResourceKey);
    
    logger.log("Rate Resources:", rateResources);

    // Track production amounts for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      const production = resource.amount - resource.previousAmount;
      store.updateResource(resourceKey, 0, { amountProduced: production });
      logger.log(`Initial ${resourceKey} production:`, production);
    });

    // Process discoveries
    logger.log("Processing Discoveries...");
    processDiscoveries();
    

    // Track final produced amounts for rate resources
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      const finalProduction = resource.amount - resource.previousAmount;
      store.updateResource(resourceKey, 0, { amountProduced: finalProduction });
      logger.log(`${resourceKey} final production:`, finalProduction);
    });
    
    // Process payments which consume resources
    logger.log("Processing RT Payments...");
    processRTPayments();
    
    // Calculate usage for rate resources
    logger.log("Calculating Resource Usage...");
    rateResources.forEach(resourceKey => {
      const resource = store.resources[resourceKey];
      if (resource.amountProduced && resource.amountProduced > 0) {
        const consumed = resource.amountProduced - resource.amount;
        const usage = consumed / resource.amountProduced;
        store.setResourceUsage(resourceKey, usage);
        logger.log(`${resourceKey} usage:`, usage, `(consumed: ${consumed})`);
      } else {
        store.setResourceUsage(resourceKey, 0);
      }
      // Reset rate resource to 0
      store.updateResource(resourceKey, -resource.amount);
    });
    
    logger.log("=== Game Loop End ===");
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

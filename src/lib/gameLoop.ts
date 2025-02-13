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

    // Process discoveries
    logger.log("Processing Discoveries...");
    processDiscoveries();
    
    // Process payments which consume resources
    logger.log("Processing RT Payments...");
    processRTPayments();

    // Reset rate resources to 0
    Object.entries(store.resources)
      .filter(([_, resource]) => resource.isRate)
      .forEach(([key]) => {
        store.spendResource(key as ResourceKey, store.resources[key as ResourceKey].amount);
      });
    
    logger.log("=== Game Loop End ===");
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

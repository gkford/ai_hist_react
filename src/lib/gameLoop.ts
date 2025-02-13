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
    
    const store = useResourceStore.getState();
    
    // Progress to next second (handles resetting rate resources)
    logger.log("Progressing to next second...");
    store.progressToNextSecond();

    // Process knowledge level before other updates
    processKnowledgeLevel();

    // Process transformations which generate resources
    logger.log("Processing Transformations...");
    processTransformations();

    // Process discoveries
    logger.log("Processing Discoveries...");
    processDiscoveries();
    
    // Process payments which consume resources
    logger.log("Processing RT Payments...");
    processRTPayments();
    
    logger.log("=== Game Loop End ===");
  }, 1000);
}

export function stopGameLoop() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

import { useResourceStore } from "@/store/useResourceStore";
import { useCardsStore } from "@/store/useCardsStore";
import { allCards } from "@/data/cards";
import type { ResourceKey } from "@/store/useResourceStore";
import { logger } from "./logger";

// Define the possible card discovery states
type DiscoveryStatus = "unthoughtof" | "imagined" | "discovered" | "obsolete";

function recalculateResourceBonuses() {
  const cardStore = useCardsStore.getState();
  const resourceStore = useResourceStore.getState();
  
  // Start with base multiplier of 1 for each resource
  const bonuses: Record<ResourceKey, number> = {
    food: 1,
    knowledge: 1,
    thoughts: 1,
    humanEnergy: 1,
    population: 1
  };

  // Go through all discovered cards with ongoing effects
  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status === 'discovered' && 
        card.ongoingEffects?.active && 
        card.ongoingEffects.resourceModifiers) {
      
      // Multiply the current bonuses by the card's modifiers
      Object.entries(card.ongoingEffects.resourceModifiers).forEach(([resource, modifier]) => {
        bonuses[resource as ResourceKey] *= modifier;
      });
    }
  });

  // Apply the calculated bonuses to each resource
  Object.entries(bonuses).forEach(([resource, bonus]) => {
    resourceStore.setResourceBonus(resource as ResourceKey, bonus);
  });
}

export function processDiscoveries() {
  logger.log("=== Discovery Processing Start ===");
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();

  // Get the amount of thoughts produced this turn
  const thoughtsProduced = resourceStore.resources.thoughts.amountProduced || 0;
  logger.log("Thoughts produced this turn:", thoughtsProduced);
  
  if (thoughtsProduced <= 0) {
    logger.log("No thoughts produced, skipping discovery processing");
    return;
  }

  // First, filter eligible cards and calculate total focus points
  const eligibleCards = Object.entries(cardStore.cardStates).filter(([_, card]) => 
    card.discovery_state.current_status !== 'discovered'
  );
  logger.log("Eligible cards:", eligibleCards.map(([id]) => id));

  const totalFocusPoints = eligibleCards.reduce((total, [_, card]) => {
    const priority = card.discovery_state.focus.priority;
    return total + (priority === 'high' ? 3 : priority === 'low' ? 1 : 0);
  }, 0);
  logger.log("Total focus points:", totalFocusPoints);

  if (totalFocusPoints <= 0) {
    logger.log("No focus points allocated, skipping discovery processing");
    return;
  }

  // Process each eligible card
  eligibleCards.forEach(([cardId, card]) => {
    logger.log(`\nProcessing card: ${cardId}`);
    const cardFocus = card.discovery_state.focus.priority;
    let thoughtsProportion = 0;
    
    if (cardFocus === 'high') {
      thoughtsProportion = 3 / totalFocusPoints;
    } else if (cardFocus === 'low') {
      thoughtsProportion = 1 / totalFocusPoints;
    }
    logger.log(`Focus priority: ${cardFocus}, proportion: ${thoughtsProportion}`);

    // Calculate thoughts to invest in this card
    const thoughtsToInvest = thoughtsProduced * thoughtsProportion;
    logger.log(`Thoughts to invest: ${thoughtsToInvest}`);

    if (thoughtsToInvest > 0) {
      // Update the card's thought_invested
      const newThoughtInvested = card.discovery_state.thought_invested + thoughtsToInvest;
      logger.log(`New total thoughts invested: ${newThoughtInvested}`);
      logger.log(`Current thresholds - To imagine: ${card.discovery_state.thought_to_imagine}, To discover: ${card.discovery_state.further_thought_to_discover}`);
      
      // Determine new status based on thoughts invested
      let newStatus: DiscoveryStatus = card.discovery_state.current_status;
      
      if (newStatus === 'unthoughtof' && 
          newThoughtInvested >= card.discovery_state.thought_to_imagine) {
        newStatus = 'imagined';
      } else if (newStatus === 'imagined' && 
                 newThoughtInvested >= (card.discovery_state.thought_to_imagine + 
                                      card.discovery_state.further_thought_to_discover)) {
        newStatus = 'discovered';
      }

      // Store previous status to check for transitions
      const previousStatus = card.discovery_state.current_status;


      // Update the card state
      cardStore.updateCardState(cardId, {
        discovery_state: {
          ...card.discovery_state,
          current_status: newStatus,
          thought_invested: newThoughtInvested
        }
      });

      // Check if we just discovered it and apply one-time effects
      if (previousStatus === 'imagined' && newStatus === 'discovered') {
        const cardDef = allCards.find(c => c.id === cardId);
        if (cardDef?.OnDiscoveryEffects?.resourceBonuses) {
          Object.entries(cardDef.OnDiscoveryEffects.resourceBonuses).forEach(
            ([resource, amount]) => {
              resourceStore.produceResource(resource as ResourceKey, amount);
            }
          );
        }

        // If the card has ongoing effects, activate them
        if (cardDef?.ongoingEffects) {
          cardStore.updateEffectState(cardId, {
            active: true
          });
        }
        
        // Recalculate all resource bonuses
        recalculateResourceBonuses();

        // Handle unlocking new cards
        if (cardDef?.discovery_stats?.discovery_unlocks) {
          cardDef.discovery_stats.discovery_unlocks.forEach(unlockId => {
            // Only create if it doesn't already exist
            if (!cardStore.cardStates[unlockId]) {
              cardStore.createCard(unlockId);
            }
          });
        }
      }
    }
  });
  logger.log("=== Discovery Processing End ===");
}

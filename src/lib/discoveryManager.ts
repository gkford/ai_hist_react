import { useResourceStore } from "@/store/useResourceStore";
import { useCardsStore } from "@/store/useCardsStore";
import { useFocusStore } from "@/store/useFocusStore";
import { allCards } from "@/data/cards";
import type { ResourceKey } from "@/store/useResourceStore";

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
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();
  const focusStore = useFocusStore.getState();

  // Get the amount of thoughts produced this turn
  const thoughtsProduced = resourceStore.resources.thoughts.amountProduced || 0;
  
  if (thoughtsProduced <= 0) return;

  // First, filter eligible cards and calculate total focus points
  const eligibleCards = Object.entries(cardStore.cardStates).filter(([_, card]) => 
    card.discovery_state.current_status !== 'discovered'
  );

  const totalFocusPoints = eligibleCards.reduce((total, [_, card]) => {
    const priority = card.discovery_state.focus.priority;
    return total + (priority === 'high' ? 3 : priority === 'low' ? 1 : 0);
  }, 0);

  console.log('Thoughts produced this tick:', thoughtsProduced);
  console.log('Total focus points:', totalFocusPoints);
  console.log('Eligible cards:', eligibleCards.length);

  if (totalFocusPoints <= 0) return;

  // Process each eligible card
  eligibleCards.forEach(([cardId, card]) => {
    const cardFocus = card.discovery_state.focus.priority;
    let thoughtsProportion = 0;
    
    if (cardFocus === 'high') {
      thoughtsProportion = 3 / totalFocusPoints;
    } else if (cardFocus === 'low') {
      thoughtsProportion = 1 / totalFocusPoints;
    }

    // Calculate thoughts to invest in this card
    const thoughtsToInvest = thoughtsProduced * thoughtsProportion;

    if (thoughtsToInvest > 0) {
      // Update the card's thought_invested
      const newThoughtInvested = card.discovery_state.thought_invested + thoughtsToInvest;
      
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

      console.log('Investing thoughts in card:', {
        cardId,
        thoughtsToInvest,
        currentTotal: card.discovery_state.thought_invested,
        newTotal: newThoughtInvested
      });

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
              resourceStore.addResource(resource as ResourceKey, amount);
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
      }
    }
  });
}

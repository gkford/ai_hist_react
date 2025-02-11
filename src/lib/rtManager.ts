import { useResourceStore } from "@/store/useResourceStore";
import { useCardsStore } from "@/store/useCardsStore";

export function processRTs() {
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();

  // Process each card's RTs
  Object.values(cardStore.cardStates).forEach(card => {
    // Only process discovered cards
    if (card.discovery_state.current_status !== 'discovered') return;

    // Process each RT
    Object.entries(card.rts).forEach(([rtId, rt]) => {
      // Process inbound resources
      rt.inbound.forEach(({ resource, amount }) => {
        // Apply population multiplier if this RT is population-focused
        const multiplier = rt.focus.resource === 'population' 
          ? resourceStore.resources.population.amount 
          : 1;
        const adjustedAmount = amount * multiplier;
        
        const currentResource = resourceStore.resources[resource].amount;
        
        // Check if we have enough resources
        if (currentResource >= adjustedAmount) {
          // Deduct the resources
          resourceStore.updateResource(resource, -adjustedAmount);
          
          // Update both paid and owed amounts
          cardStore.updateRTState(card.id, rtId, {
            inbound_paid: {
              ...rt.inbound_paid,
              [resource]: (rt.inbound_paid[resource] || 0) + adjustedAmount
            },
            outbound_owed: {
              ...rt.outbound_owed,
              ...Object.fromEntries(
                rt.outbound.map(({ resource: outResource, amount: outAmount }) => [
                  outResource,
                  (rt.outbound_owed[outResource] || 0) + (outAmount * multiplier)
                ])
              )
            }
          });
        }
      });
    });
  });
}

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
        const currentResource = resourceStore.resources[resource].amount;
        
        // Check if we have enough resources
        if (currentResource >= amount) {
          // Deduct the resources
          resourceStore.updateResource(resource, -amount);
          
          // Update the paid amount
          cardStore.updateRTState(card.id, rtId, {
            inbound_paid: {
              ...rt.inbound_paid,
              [resource]: (rt.inbound_paid[resource] || 0) + amount
            }
          });
        }
      });
    });
  });
}

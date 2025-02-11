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
      // Apply population multiplier if this RT is population-focused
      const multiplier = rt.focus.resource === 'population' 
        ? resourceStore.resources.population.amount 
        : 1;

      // Check if we have enough of all required resources
      const canProcess = Object.entries(rt.inbound_cost).every(([resource, amount]) => {
        const adjustedAmount = amount * multiplier;
        return resourceStore.resources[resource].amount >= adjustedAmount;
      });

      if (canProcess) {
        // Deduct all input resources
        Object.entries(rt.inbound_cost).forEach(([resource, amount]) => {
          const adjustedAmount = amount * multiplier;
          resourceStore.updateResource(resource, -adjustedAmount);
        });

        // Update both paid and owed amounts
        cardStore.updateRTState(card.id, rtId, {
          inbound_paid: Object.fromEntries(
            Object.entries(rt.inbound_cost).map(([resource, amount]) => [
              resource,
              (rt.inbound_paid[resource] || 0) + (amount * multiplier)
            ])
          ),
          outbound_owed: Object.fromEntries(
            Object.entries(rt.outbound_gain).map(([resource, amount]) => [
              resource,
              (rt.outbound_owed[resource] || 0) + (amount * multiplier)
            ])
          )
        });
      }
    });
  });
}

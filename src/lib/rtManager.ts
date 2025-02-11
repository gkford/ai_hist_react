import { useResourceStore } from "@/store/useResourceStore";
import { useCardsStore } from "@/store/useCardsStore";

export function processTransformations() {
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();

  // Process each card's RTs
  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status !== 'discovered') return;

    Object.entries(card.rts).forEach(([rtId, rt]) => {
      const multiplier = rt.focus.resource === 'population' 
        ? resourceStore.resources.population.amount 
        : 1;

      // Debug log current state
      console.log(`RT ${rtId} before transform:`, {
        inbound_paid: rt.inbound_paid,
        outbound_owed: rt.outbound_owed,
        multiplier
      });

      const canTransform = Object.entries(rt.inbound_cost).every(([resource, cost]) => 
        (rt.inbound_paid[resource] || 0) >= (cost * multiplier)
      ) && Object.entries(rt.outbound_gain).every(([resource, gain]) => 
        (rt.outbound_owed[resource] || 0) >= (gain * multiplier)
      );

      if (canTransform) {
        // Deduct the costs from inbound_paid
        const newInboundPaid = { ...rt.inbound_paid };
        Object.entries(rt.inbound_cost).forEach(([resource, cost]) => {
          newInboundPaid[resource] = (newInboundPaid[resource] || 0) - (cost * multiplier);
        });

        // Deduct from outbound_owed and add to resource store
        const newOutboundOwed = { ...rt.outbound_owed };
        Object.entries(rt.outbound_gain).forEach(([resource, gain]) => {
          newOutboundOwed[resource] = (newOutboundOwed[resource] || 0) - (gain * multiplier);
          resourceStore.updateResource(resource, gain * multiplier);
        });

        // Debug log the changes
        console.log(`RT ${rtId} transform occurring:`, {
          newInboundPaid,
          newOutboundOwed
        });

        // Update the RT state with new values
        cardStore.updateRTState(card.id, rtId, {
          inbound_paid: newInboundPaid,
          outbound_owed: newOutboundOwed
        });
      }
    });
  });
}

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

import { useResourceStore, type ResourceKey } from "@/store/useResourceStore";
import { useCardsStore } from "@/store/useCardsStore";

// First phase: Take payments and accumulate resources
export function processRTPayments() {
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();

  // Process each card's RTs
  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status !== 'discovered') return;

    Object.entries(card.rts).forEach(([rtId, rt]) => {
      const multiplier = rt.focus.resource === 'population' 
        ? resourceStore.resources.population.amount 
        : 1;

      // Check if we can afford the input costs
      const canPay = Object.entries(rt.inbound_cost).every(([resource, amount]) => {
        const adjustedAmount = amount * multiplier;
        const resourceKey = resource as ResourceKey;
        return resourceStore.resources[resourceKey].amount >= adjustedAmount;
      });

      if (canPay) {
        // Take payment from resource store
        Object.entries(rt.inbound_cost).forEach(([resource, amount]) => {
          const adjustedAmount = amount * multiplier;
          const resourceKey = resource as ResourceKey;
          resourceStore.updateResource(resourceKey, -adjustedAmount);
        });

        // Update inbound_paid and outbound_owed
        const newInboundPaid = { ...rt.inbound_paid };
        const newOutboundOwed = { ...rt.outbound_owed };

        Object.entries(rt.inbound_cost).forEach(([resource, amount]) => {
          const key = resource as ResourceKey;
          newInboundPaid[key] = (newInboundPaid[key] || 0) + (amount * multiplier);
        });

        Object.entries(rt.outbound_gain).forEach(([resource, amount]) => {
          const key = resource as ResourceKey;
          newOutboundOwed[key] = (newOutboundOwed[key] || 0) + (amount * multiplier);
        });

        cardStore.updateRTState(card.id, rtId, {
          inbound_paid: newInboundPaid,
          outbound_owed: newOutboundOwed
        });
      }
    });
  });
}
// Second phase: Complete transformations when enough resources are accumulated
export function processTransformations() {
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();

  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status !== 'discovered') return;

    Object.entries(card.rts).forEach(([rtId, rt]) => {
      // Create copies of the paid and owed values
      const flooredInboundPaid = { ...rt.inbound_paid };
      const flooredOutboundOwed = { ...rt.outbound_owed };

      // Floor all values in the copies
      Object.keys(flooredInboundPaid).forEach(key => {
        flooredInboundPaid[key as ResourceKey] = Math.floor(flooredInboundPaid[key as ResourceKey] || 0);
      });
      Object.keys(flooredOutboundOwed).forEach(key => {
        flooredOutboundOwed[key as ResourceKey] = Math.floor(flooredOutboundOwed[key as ResourceKey] || 0);
      });

      // Check if ALL values are 1 or higher
      const allValuesValid = Object.values(flooredInboundPaid).every(value => value >= 1) &&
                            Object.values(flooredOutboundOwed).every(value => value >= 1);

      if (allValuesValid) {
        // Deduct floored values from actual paid/owed values
        const newInboundPaid = { ...rt.inbound_paid };
        const newOutboundOwed = { ...rt.outbound_owed };

        Object.entries(flooredInboundPaid).forEach(([resource, amount]) => {
          const key = resource as ResourceKey;
          newInboundPaid[key] = (rt.inbound_paid[key] || 0) - amount;
        });

        Object.entries(flooredOutboundOwed).forEach(([resource, amount]) => {
          const key = resource as ResourceKey;
          newOutboundOwed[key] = (rt.outbound_owed[key] || 0) - amount;
          // Add the deducted amount to the resource store
          resourceStore.updateResource(key, amount);
        });

        console.log(`RT ${rtId} transformation completed:`, {
          newInboundPaid,
          newOutboundOwed
        });

        cardStore.updateRTState(card.id, rtId, {
          inbound_paid: newInboundPaid,
          outbound_owed: newOutboundOwed
        });
      }
    });
  });
}

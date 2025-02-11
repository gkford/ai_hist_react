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

        console.log(`RT ${rtId} payment processed:`, {
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
// Second phase: Complete transformations when enough resources are accumulated
export function processTransformations() {
  const resourceStore = useResourceStore.getState();
  const cardStore = useCardsStore.getState();

  Object.values(cardStore.cardStates).forEach(card => {
    if (card.discovery_state.current_status !== 'discovered') return;

    Object.entries(card.rts).forEach(([rtId, rt]) => {
      const multiplier = rt.focus.resource === 'population' 
        ? resourceStore.resources.population.amount 
        : 1;

      // Check if we have enough accumulated resources to complete a transformation
      const canTransform = Object.entries(rt.inbound_cost).every(([resource, cost]) => {
        const key = resource as ResourceKey;
        return (rt.inbound_paid[key] || 0) >= (cost * multiplier);
      });

      if (canTransform) {
        // Deduct from inbound_paid and outbound_owed
        const newInboundPaid = { ...rt.inbound_paid };
        const newOutboundOwed = { ...rt.outbound_owed };

        // Remove the costs
        Object.entries(rt.inbound_cost).forEach(([resource, cost]) => {
          const key = resource as ResourceKey;
          newInboundPaid[key] = (newInboundPaid[key] || 0) - (cost * multiplier);
        });

        // Add gains to resource store and update owed
        Object.entries(rt.outbound_gain).forEach(([resource, gain]) => {
          const key = resource as ResourceKey;
          const adjustedGain = gain * multiplier;
          resourceStore.updateResource(key, adjustedGain);
          newOutboundOwed[key] = (newOutboundOwed[key] || 0) - adjustedGain;
        });

        console.log(`RT ${rtId} transformation completed:`, {
          newInboundPaid,
          newOutboundOwed,
          multiplier
        });

        cardStore.updateRTState(card.id, rtId, {
          inbound_paid: newInboundPaid,
          outbound_owed: newOutboundOwed
        });
      }
    });
  });
}

import { useResourceStore, type ResourceKey } from '@/store/useResourceStore'
import { useCardsStore, type RTState } from '@/store/useCardsStore'
import { useFocusStore } from '@/store/useFocusStore'
import { logger } from './logger'

const EPSILON = 0.000001; // For floating point comparison

export function processTransformations() {
  const resourceStore = useResourceStore.getState()
  const cardStore = useCardsStore.getState()
  const focusStore = useFocusStore.getState()

  // Get all discovered cards and their RTs
  const allRTs = Object.values(cardStore.cardStates)
    .filter(card => card.discovery_state.current_status === 'discovered')
    .flatMap(card => 
      Object.entries(card.rts).map(([rtId, rt]) => ({
        cardId: card.id,
        rtId,
        rt
      }))
    );

  // Process each RT
  for (const { cardId, rtId, rt } of allRTs) {
    // Get focus proportion
    let focusProportion;
    if (rt.focus.resource === 'population') {
      focusProportion = 1; // Population always uses 100%
    } else {
      const resourceProps = focusStore.resourceProps[rt.focus.resource]
      focusProportion = resourceProps[rt.focus.priority]
    }

    // Get the limiting input resource (the one that will limit how much we can process)
    const inputResourceAmounts = Object.entries(rt.inbound_cost).map(([resource, ratio]) => {
      const currentAmount = resourceStore.resources[resource as ResourceKey].amount[0]
      return {
        resource,
        available: currentAmount,
        maxProcessable: currentAmount / ratio
      }
    });

    // Find the resource that limits how much we can process
    const limitingResource = inputResourceAmounts.reduce((prev, curr) => 
      prev.maxProcessable < curr.maxProcessable ? prev : curr
    );

    // Calculate how much we'll actually process based on focus proportion
    const amountToProcess = limitingResource.maxProcessable * focusProportion;

    // Calculate actual costs and gains
    const actualInboundCosts: Partial<Record<ResourceKey, number>> = {}
    const actualOutboundGains: Partial<Record<ResourceKey, number>> = {}

    // Calculate costs
    let shortfallWarning = false;
    Object.entries(rt.inbound_cost).forEach(([resource, ratio]) => {
      const key = resource as ResourceKey
      const cost = amountToProcess * ratio
      const available = resourceStore.resources[key].amount[0]
      
      if (available < cost && (cost - available) > EPSILON) {
        shortfallWarning = true;
        logger.warn(
          `RT ${cardId}:${rtId} has resource shortfall:`,
          `${key} needs ${cost} but only has ${available}`,
          `shortfall: ${cost - available}`
        );
      }

      // If we're within epsilon of having enough, just use what's available
      actualInboundCosts[key] = Math.min(cost, available)
    });

    // Calculate gains
    Object.entries(rt.outbound_gain).forEach(([resource, ratio]) => {
      const key = resource as ResourceKey
      actualOutboundGains[key] = amountToProcess * ratio
    });

    // Spend resources
    Object.entries(actualInboundCosts).forEach(([resource, amount]) => {
      const key = resource as ResourceKey
      resourceStore.spendResource(key, amount)
    });

    // Produce resources
    Object.entries(actualOutboundGains).forEach(([resource, amount]) => {
      const key = resource as ResourceKey
      resourceStore.produceResource(key, amount)
    });

    // Update RT state for animation purposes
    cardStore.updateRTState(cardId, rtId, {
      inbound_paid: actualInboundCosts,
      outbound_owed: actualOutboundGains,
    })
  }
}

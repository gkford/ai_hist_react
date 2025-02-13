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
    let amountToProcess;

    if (rt.focus.resource === 'population') {
      focusProportion = 1; // Population always uses 100%
      const population = resourceStore.resources.population.amount[0];
      
      // Get the first (and should be only) inbound cost for population-based RTs
      const [resource, ratio] = Object.entries(rt.inbound_cost)[0];
      // Each population unit can process 1/ratio resources per tick
      const maxProcessableByPopulation = population * (1/ratio);
      
      // Check how much of the resource is actually available
      const availableResource = resourceStore.resources[resource as ResourceKey].amount[0];
      
      // Use whichever is smaller - what population can process or what's available
      amountToProcess = Math.min(maxProcessableByPopulation, availableResource);
    } else {
      // Original non-population logic
      const resourceProps = focusStore.resourceProps[rt.focus.resource];
      focusProportion = resourceProps[rt.focus.priority];

      // Get the limiting input resource
      const inputResourceAmounts = Object.entries(rt.inbound_cost).map(([resource, ratio]) => {
        const currentAmount = resourceStore.resources[resource as ResourceKey].amount[0];
        return {
          resource,
          available: currentAmount,
          maxProcessable: currentAmount / ratio
        };
      });

      const limitingResource = inputResourceAmounts.reduce((prev, curr) => 
        prev.maxProcessable < curr.maxProcessable ? prev : curr
      );

      amountToProcess = limitingResource.maxProcessable * focusProportion;
    }

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
        logger.log(
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

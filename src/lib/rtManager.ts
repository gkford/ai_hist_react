import { useResourceStore, type ResourceKey } from '@/store/useResourceStore'
import { useCardsStore, type RTState } from '@/store/useCardsStore'
import { useFocusStore } from '@/store/useFocusStore'

const RT_PRIORITY_ORDER: ResourceKey[] = [
  'humanEnergy',  // Process these first
  'thoughts',     // Then these
  // Any resources not listed will be processed after, in their default order
];

// Helper function to get priority of a resource
function getResourcePriority(resource: ResourceKey): number {
  const index = RT_PRIORITY_ORDER.indexOf(resource);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

// Helper function to get the priority of an RT based on its outbound resources
function getRTPriority(rt: RTState): number {
  let highestPriority = Number.MAX_SAFE_INTEGER;
  
  Object.keys(rt.outbound_gain).forEach((resource) => {
    const priority = getResourcePriority(resource as ResourceKey);
    if (priority < highestPriority) {
      highestPriority = priority;
    }
  });
  
  return highestPriority;
}

export function processTransformations() {
  const resourceStore = useResourceStore.getState()
  const cardStore = useCardsStore.getState()
  const focusStore = useFocusStore.getState()

  // Get all discovered cards and their RTs, and sort them
  const allRTs = Object.values(cardStore.cardStates)
    .filter(card => card.discovery_state.current_status === 'discovered')
    .flatMap(card => 
      Object.entries(card.rts).map(([rtId, rt]) => ({
        cardId: card.id,
        rtId,
        rt,
        priority: getRTPriority(rt)
      }))
    )
    .sort((a, b) => a.priority - b.priority);

  // Process RTs in priority order
  for (const { cardId, rtId, rt } of allRTs) {
    // Calculate multiplier
    let multiplier
    if (rt.focus.resource === 'population') {
      multiplier = resourceStore.resources.population.amount[0]
    } else {
      const priority = rt.focus.priority
      const resourceProps = focusStore.resourceProps[rt.focus.resource]
      multiplier = resourceProps[priority]
    }

    // Calculate actual costs and gains with multiplier
    const actualInboundCosts: Partial<Record<ResourceKey, number>> = {}
    const actualOutboundGains: Partial<Record<ResourceKey, number>> = {}

    Object.entries(rt.inbound_cost).forEach(([resource, amount]) => {
      const key = resource as ResourceKey
      actualInboundCosts[key] = Math.floor(amount * multiplier)
    })

    Object.entries(rt.outbound_gain).forEach(([resource, amount]) => {
      const key = resource as ResourceKey
      actualOutboundGains[key] = Math.floor(amount * multiplier)
    })

    // Check if we can afford all the resources
    const canAfford = Object.entries(actualInboundCosts).every(
      ([resource, amount]) => {
        const key = resource as ResourceKey
        return resourceStore.resources[key].amount[0] >= amount
      }
    )

    if (canAfford) {
      // First spend the resources
      Object.entries(actualInboundCosts).forEach(([resource, amount]) => {
        const key = resource as ResourceKey
        resourceStore.spendResource(key, amount)
      })

      // Then produce the resources
      Object.entries(actualOutboundGains).forEach(([resource, amount]) => {
        const key = resource as ResourceKey
        resourceStore.produceResource(key, amount)
      })

      // Update the RT state for animation purposes
      cardStore.updateRTState(cardId, rtId, {
        inbound_paid: actualInboundCosts,
        outbound_owed: actualOutboundGains,
      })
    }
  }
}

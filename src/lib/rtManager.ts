import { useResourceStore, type ResourceKey } from '@/store/useResourceStore'
import { useCardsStore } from '@/store/useCardsStore'
import { useFocusStore } from '@/store/useFocusStore'

// First phase: Just accumulate desired transformations in RT state
export function updateRTs() {
  const resourceStore = useResourceStore.getState()
  const cardStore = useCardsStore.getState()

  // Process each card's RTs
  Object.values(cardStore.cardStates).forEach((card) => {
    if (card.discovery_state.current_status !== 'discovered') return

    Object.entries(card.rts).forEach(([rtId, rt]) => {
      let multiplier
      if (rt.focus.resource === 'population') {
        multiplier = resourceStore.resources.population.amount[0]
      } else {
        const priority = rt.focus.priority
        const resourceProps =
          useFocusStore.getState().resourceProps[rt.focus.resource]
        multiplier = resourceProps[priority]
      }

      // Update inbound_paid and outbound_owed without checking resources
      const newInboundPaid = { ...rt.inbound_paid }
      const newOutboundOwed = { ...rt.outbound_owed }

      Object.entries(rt.inbound_cost).forEach(([resource, amount]) => {
        const key = resource as ResourceKey
        newInboundPaid[key] = (newInboundPaid[key] || 0) + amount * multiplier
      })

      Object.entries(rt.outbound_gain).forEach(([resource, amount]) => {
        const key = resource as ResourceKey
        newOutboundOwed[key] = (newOutboundOwed[key] || 0) + amount * multiplier
      })

      cardStore.updateRTState(card.id, rtId, {
        inbound_paid: newInboundPaid,
        outbound_owed: newOutboundOwed,
      })
    })
  })
}
// Second phase: Check resources and handle actual spending/production
export function processTransformations() {
  const resourceStore = useResourceStore.getState()
  const cardStore = useCardsStore.getState()

  Object.values(cardStore.cardStates).forEach((card) => {
    if (card.discovery_state.current_status !== 'discovered') return

    Object.entries(card.rts).forEach(([rtId, rt]) => {
      // Create copies of the paid and owed values
      const flooredInboundPaid = { ...rt.inbound_paid }
      const flooredOutboundOwed = { ...rt.outbound_owed }

      // Floor all values in the copies
      Object.keys(flooredInboundPaid).forEach((key) => {
        flooredInboundPaid[key as ResourceKey] = Math.floor(
          flooredInboundPaid[key as ResourceKey] || 0
        )
      })
      Object.keys(flooredOutboundOwed).forEach((key) => {
        flooredOutboundOwed[key as ResourceKey] = Math.floor(
          flooredOutboundOwed[key as ResourceKey] || 0
        )
      })

      // Check if ALL values are 1 or higher
      const allValuesValid =
        Object.values(flooredInboundPaid).every((value) => value >= 1) &&
        Object.values(flooredOutboundOwed).every((value) => value >= 1)

      if (allValuesValid) {
        // Check if we can afford all the resources
        const canAfford = Object.entries(flooredInboundPaid).every(
          ([resource, amount]) => {
            const key = resource as ResourceKey
            return resourceStore.resources[key].amount[0] >= amount
          }
        )

        if (!canAfford) {
          // Reset the RT state when we can't afford the transformation
          cardStore.updateRTState(card.id, rtId, {
            inbound_paid: {},
            outbound_owed: {},
          })

          console.warn(
            `Skipping transformation for RT ${rtId} in card ${card.id} - insufficient resources.\n` +
              `Required resources: ${Object.entries(flooredInboundPaid)
                .map(([resource, amount]) => `${amount} ${resource}`)
                .join(', ')}\n` +
              `RT state has been reset.`
          )
          return
        }

        // First spend the resources
        Object.entries(flooredInboundPaid).forEach(([resource, amount]) => {
          const key = resource as ResourceKey
          resourceStore.spendResource(key, amount)
        })

        // Then produce the resources
        Object.entries(flooredOutboundOwed).forEach(([resource, amount]) => {
          const key = resource as ResourceKey
          resourceStore.produceResource(key, amount)
        })

        // Update the RT state by deducting the processed amounts
        const newInboundPaid = { ...rt.inbound_paid }
        const newOutboundOwed = { ...rt.outbound_owed }

        Object.entries(flooredInboundPaid).forEach(([resource, amount]) => {
          const key = resource as ResourceKey
          newInboundPaid[key] = (rt.inbound_paid[key] || 0) - amount
        })

        Object.entries(flooredOutboundOwed).forEach(([resource, amount]) => {
          const key = resource as ResourceKey
          newOutboundOwed[key] = (rt.outbound_owed[key] || 0) - amount
        })

        cardStore.updateRTState(card.id, rtId, {
          inbound_paid: newInboundPaid,
          outbound_owed: newOutboundOwed,
        })
      }
    })
  })
}

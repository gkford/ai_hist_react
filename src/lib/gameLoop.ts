import { useRTStore } from "@/store/useRTStore"
import { useResourceStore } from "@/store/useResourceStore"
import { payForResourceTransformation, processRTState } from "@/components/ui/ResourceTransformation"

// Keep a reference to our interval so we can cancel it later
let intervalId: number | null = null

export function startGameLoop() {
  // If already started, do nothing
  if (intervalId) return

  intervalId = window.setInterval(() => {
    // Get current RT states and population from Zustand stores
    const rtStates = useRTStore.getState().states
    const population = useResourceStore.getState().resources.population.amount

    // Pay for transformations based on focus
    Object.entries(rtStates).forEach(([rtId, state]) => {
      const bothNullOrBothNonNull =
        (state.eating_focus === null && state.human_energy_focus === null) ||
        (state.eating_focus !== null && state.human_energy_focus !== null)

      if (bothNullOrBothNonNull) {
        console.error(`RT ${rtId} has invalid focus configuration:`, state)
        return
      }

      const focusType = state.eating_focus !== null ? "eating" : "human_energy"
      const focusValue = state.eating_focus ?? state.human_energy_focus
      if (focusValue === null || focusValue === 0) return

      const multiplier =
        focusType === "eating"
          ? focusValue * population
          : focusValue / 100

      payForResourceTransformation(rtId, multiplier)
    })

    // Then process the RT states as needed
    Object.keys(rtStates).forEach((rtId) => {
      processRTState(rtId)
    })
  }, 1000)
}

export function stopGameLoop() {
  if (!intervalId) return
  clearInterval(intervalId)
  intervalId = null
}

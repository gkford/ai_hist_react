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

    // Process each RT with a simple multiplier of 1
    Object.keys(rtStates).forEach((rtId) => {
      payForResourceTransformation(rtId, 1)
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

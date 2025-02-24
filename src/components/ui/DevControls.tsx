import { useDevStore } from "@/store/useDevStore"
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore"
import { useKnowledgeLevelStore } from "@/store/useKnowledgeLevelStore"
import { useGameLoopStore } from "@/store/useGameLoopStore"
import { processTick } from "@/lib/gameLoop"
import { Button } from "./button"

export function DevControls() {
  const { devMode, toggleDevMode } = useDevStore()
  const resourceStore = useResourceStore()
  const { level: knowledgeLevel, thresholds } = useKnowledgeLevelStore()

  const handleResourceChange = (key: ResourceKey, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      const currentAmount = resourceStore.resources[key].amount[0]
      if (numValue > currentAmount) {
        resourceStore.produceResource(key, numValue - currentAmount)
      } else if (numValue < currentAmount) {
        resourceStore.spendResource(key, currentAmount - numValue)
      }
    }
  }

  return (
    <>
      {/* Toggle Buttons - Always visible */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button 
          variant="outline"
          onClick={useDevStore.getState().toggleVerbose}
        >
          {useDevStore.getState().verbose ? "Disable Verbose" : "Enable Verbose"}
        </Button>
        <Button 
          variant="outline"
          onClick={toggleDevMode}
        >
          {devMode ? "Hide Dev Tools" : "Show Dev Tools"}
        </Button>
        <Button
          variant="outline"
          onClick={useGameLoopStore.getState().toggleRunning}
          disabled={useGameLoopStore.getState().processingTick}
        >
          {useGameLoopStore.getState().isRunning ? "⏸️ Pause" : "▶️ Play"}
        </Button>
        {!useGameLoopStore.getState().isRunning && (
          <Button
            variant="outline"
            onClick={processTick}
            disabled={useGameLoopStore.getState().processingTick}
          >
            ⏭️ Step
          </Button>
        )}
      </div>

      {/* Dev Controls - Only visible in dev mode */}
      {devMode && (
        <div className="fixed top-16 right-4 p-4 bg-white border rounded-lg shadow-lg z-40">
          <div className="mb-4 p-2 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Knowledge Level Info</h3>
            <p>Current Level: {knowledgeLevel}</p>
            <p>Next Threshold: {thresholds[knowledgeLevel]}</p>
          </div>
          <h3 className="font-semibold mb-4">Resource Controls</h3>
          {Object.entries(resourceStore.resources).map(([key, resource]) => (
            <div key={key} className="mb-2 flex items-center gap-2">
              <label className="flex items-center gap-2">
                <span>{resource.icon}</span>
                <input
                  type="number"
                  value={Math.floor(resource.amount[0])}
                  onChange={(e) => handleResourceChange(key as ResourceKey, e.target.value)}
                  className="w-24 px-2 py-1 border rounded"
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

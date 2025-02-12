import { useDevStore } from "@/store/useDevStore"
import { useResourceStore, type ResourceKey } from "@/store/useResourceStore"
import { Button } from "./button"

export function DevControls() {
  const { devMode, toggleDevMode } = useDevStore()
  const resourceStore = useResourceStore()

  const handleResourceChange = (key: ResourceKey, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      resourceStore.updateResource(key, numValue - resourceStore.resources[key].amount)
    }
  }

  return (
    <>
      {/* Toggle Button - Always visible */}
      <Button 
        variant="outline"
        className="fixed top-4 right-4 z-50"
        onClick={toggleDevMode}
      >
        {devMode ? "Hide Dev Tools" : "Show Dev Tools"}
      </Button>

      {/* Dev Controls - Only visible in dev mode */}
      {devMode && (
        <div className="fixed top-16 right-4 p-4 bg-white border rounded-lg shadow-lg z-40">
          <h3 className="font-semibold mb-4">Resource Controls</h3>
          {Object.entries(resourceStore.resources).map(([key, resource]) => (
            <div key={key} className="mb-2 flex items-center gap-2">
              <label className="flex items-center gap-2">
                <span>{resource.icon}</span>
                <input
                  type="number"
                  value={Math.floor(resource.amount)}
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

import { useWorkersStore, WORKER_TYPES } from '@/store/useWorkersStore'

export function PopulationSummary() {
  const workers = useWorkersStore(state => state.workers)
  
  // Count workers by level
  const workersByLevel = workers.reduce((acc, worker) => {
    acc[worker.level] = (acc[worker.level] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  // Count idle workers by level
  const idleWorkersByLevel = workers.reduce((acc, worker) => {
    if (worker.assignedTo === null) {
      acc[worker.level] = (acc[worker.level] || 0) + 1
    }
    return acc
  }, {} as Record<number, number>)
  
  // Only show idle workers section if there are any idle workers
  const hasIdleWorkers = Object.values(idleWorkersByLevel).some(count => count > 0)
  
  return (
    <div className="flex flex-col gap-3">
      {/* Worker types summary */}
      <div className="flex flex-col gap-3 w-full">
        {Object.entries(workersByLevel)
          .sort(([levelA], [levelB]) => Number(levelA) - Number(levelB))
          .map(([level, count]) => (
            <div key={level} className="flex items-center justify-between p-2 w-full">
              <div className="flex items-center">
                <span className="text-4xl mr-3">{WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].icon}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].name}
                  </span>
                  <span className="text-xs text-gray-500">Level {level}</span>
                </div>
              </div>
              <span className="text-3xl font-bold">{count}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

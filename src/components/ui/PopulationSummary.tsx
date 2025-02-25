import * as React from 'react'
import { useWorkersStore, WORKER_TYPES } from '@/store/useWorkersStore'

export function PopulationSummary() {
  const workers = useWorkersStore(state => state.workers)
  
  // Count workers by level
  const workersByLevel = workers.reduce((acc, worker) => {
    acc[worker.level] = (acc[worker.level] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  return (
    <div className="flex flex-col">
      {/* Worker types summary */}
      <div className="flex flex-col gap-2">
        {Object.entries(workersByLevel)
          .sort(([levelA], [levelB]) => Number(levelA) - Number(levelB))
          .map(([level, count]) => (
            <div key={level} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].icon}</span>
                <span className="text-sm">
                  {WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].name}
                  <span className="text-xs text-gray-500"> (Level {level})</span>
                </span>
              </div>
              <span className="text-lg font-medium">{count}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

import * as React from 'react'
import { useWorkersStore, WORKER_TYPES } from '@/store/useWorkersStore'

export function PopulationSummary() {
  const workers = useWorkersStore(state => state.workers)
  
  // Count workers by level
  const workersByLevel = workers.reduce((acc, worker) => {
    acc[worker.level] = (acc[worker.level] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  // Count workers by assignment status
  const assignedWorkers = workers.filter(w => w.assignedTo !== null && w.assignedTo !== 'population').length
  const unassignedWorkers = workers.filter(w => w.assignedTo === 'population').length
  
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-center">Population Summary</h4>
      
      {/* Worker types summary */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {Object.entries(workersByLevel)
          .sort(([levelA], [levelB]) => Number(levelA) - Number(levelB))
          .map(([level, count]) => (
            <div key={level} className="flex items-center gap-1">
              <span className="text-sm">{WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].icon}</span>
              <span className="text-xs">{WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].name}:</span>
              <span className="text-xs font-medium">{count}</span>
            </div>
          ))}
      </div>
      
      {/* Assignment summary */}
      <div className="flex justify-between text-xs text-gray-600 border-t border-gray-200 pt-1">
        <span>Working: {assignedWorkers}</span>
        <span>Available: {unassignedWorkers}</span>
      </div>
    </div>
  )
}

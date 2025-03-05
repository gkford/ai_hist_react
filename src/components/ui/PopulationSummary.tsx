import { useWorkersStore, WORKER_TYPES, Worker } from '@/store/useWorkersStore'
import { useEffect, useState } from 'react'
import { logger } from '@/lib/logger'

export function PopulationSummary() {
  // Track both workers and a local state to force re-renders
  const workers = useWorkersStore(state => state.workers)
  const [unassignedCounts, setUnassignedCounts] = useState<Record<number, number>>({})
  const [hasUnassigned, setHasUnassigned] = useState(false)
  
  // Force component to update when workers change assignments
  useEffect(() => {
    // Subscribe to the store
    const unsubscribe = useWorkersStore.subscribe(
      (state) => {
        logger.log('Worker store updated, recalculating unassigned workers')
        updateUnassignedCounts(state.workers)
      }
    )
    
    // Initial calculation
    updateUnassignedCounts(workers)
    
    // Cleanup subscription
    return () => unsubscribe()
  }, [])
  
  // Helper function to update unassigned counts
  const updateUnassignedCounts = (workersList: Worker[]) => {
    // Debug the workers list
    logger.log('Checking workers for unassigned status:', workersList.map(w => ({
      id: w.id,
      level: w.level,
      assignedTo: w.assignedTo
    })));
    
    const counts = workersList.reduce((acc, worker) => {
      // Check explicitly for null, undefined, or empty string
      if (worker.assignedTo === null || worker.assignedTo === undefined || worker.assignedTo === '') {
        acc[worker.level] = (acc[worker.level] || 0) + 1;
        logger.log(`Found unassigned worker: ${worker.id}, level: ${worker.level}`);
      }
      return acc;
    }, {} as Record<number, number>);
    
    const hasAny = Object.values(counts).some(count => count > 0);
    
    logger.log('Unassigned counts calculated:', counts);
    logger.log('Has unassigned calculated:', hasAny);
    
    setUnassignedCounts(counts);
    setHasUnassigned(hasAny);
  }
  
  // Count workers by level
  const workersByLevel = workers.reduce((acc, worker) => {
    acc[worker.level] = (acc[worker.level] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  
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
      
      {/* Unassigned workers summary */}
      {hasUnassigned && (
        <div className="flex items-center gap-2 px-2 text-gray-500">
          <span className="text-xs">Unassigned:</span>
          {Object.entries(unassignedCounts)
            .filter(([_, count]) => count > 0)
            .sort(([levelA], [levelB]) => Number(levelA) - Number(levelB))
            .map(([level, count]) => (
              <div key={`unassigned-${level}`} className="flex items-center gap-1">
                <span>{WORKER_TYPES[Number(level) as keyof typeof WORKER_TYPES].icon}</span>
                <span className="text-xs">{count}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

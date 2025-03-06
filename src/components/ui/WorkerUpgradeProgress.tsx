import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { Progress } from '@/components/ui/progress'
import { logger } from '@/lib/logger'
import { WORKER_ICONS } from '@/store/useWorkersStore'

interface WorkerUpgradeProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  cardId: string
  targetLevel: number
  upgradeTime: number // Time in seconds for one worker to complete an upgrade
}

export function WorkerUpgradeProgress({ 
  cardId, 
  targetLevel,
  upgradeTime = 10,
  className, 
  ...props 
}: WorkerUpgradeProgressProps) {
  // Use local state for progress
  const [progress, setProgress] = React.useState(0)
  
  // Use refs for values that shouldn't trigger re-renders
  const progressRef = React.useRef(0)
  const lastTickRef = React.useRef(Date.now())
  const intervalRef = React.useRef<number | null>(null)
  
  // Get worker count only - not the actual workers array to avoid re-renders
  const assignedWorkerCount = useWorkersStore(
    state => state.workers.filter(w => w.assignedTo === cardId).length
  )
  
  // Get the count of upgradable workers (level below target)
  const upgradableWorkerCount = useWorkersStore(
    state => state.workers.filter(w => w.level < targetLevel).length
  )
  
  // Get game running state
  const isRunning = useGameLoopStore(state => state.isRunning)
  
  // Reset progress when workers are removed
  React.useEffect(() => {
    if (assignedWorkerCount === 0) {
      setProgress(0)
      progressRef.current = 0
    }
  }, [assignedWorkerCount])
  
  // Clean up interval on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])
  
  // Setup the interval for progress updates
  React.useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Don't start a new interval if not running, no workers, or no upgradable workers
    if (!isRunning || assignedWorkerCount === 0 || upgradableWorkerCount === 0) return
    
    // Start a new interval
    intervalRef.current = window.setInterval(() => {
      try {
        // Check if the game is still running before updating progress
        if (!useGameLoopStore.getState().isRunning) {
          // Just update the lastTickRef to avoid large jumps when game resumes
          lastTickRef.current = Date.now()
          return
        }
      
      const now = Date.now()
      const delta = (now - lastTickRef.current) / 1000 // Convert to seconds
      lastTickRef.current = now
      
      // Calculate progress increment based on number of workers
      const increment = (delta / upgradeTime) * assignedWorkerCount * 100
      
      // Update the ref first
      progressRef.current += increment
      
      // Check if we've reached 100%
      if (progressRef.current >= 100) {
        // Reset progress first to prevent multiple upgrades
        const oldProgress = progressRef.current
        progressRef.current = 0
        setProgress(0)
        
        // Only proceed with upgrade if we actually crossed the 100% threshold
        if (oldProgress >= 100) {
          // Get the workers store
          const workersStore = useWorkersStore.getState()
          
          // Find upgradable workers (level below target)
          const upgradableWorkers = workersStore.workers.filter(w => w.level < targetLevel)
          
          if (upgradableWorkers.length > 0) {
            // Sort by level (ascending)
            upgradableWorkers.sort((a, b) => a.level - b.level)
            
            // Get the lowest level worker
            const workerToUpgrade = upgradableWorkers[0]
            
            // Get the icon for the new level
            const newIcon = WORKER_ICONS[targetLevel as keyof typeof WORKER_ICONS] || WORKER_ICONS[1]
            
            logger.log(`Upgrading worker ${workerToUpgrade.id} from level ${workerToUpgrade.level} to ${targetLevel}`)
            
            // Create a new worker object with the upgraded level
            const upgradedWorker = {
              ...workerToUpgrade,
              level: targetLevel,
              icon: newIcon
            }
            
            // Remove the old worker and add the upgraded one
            workersStore.removeWorker(workerToUpgrade.id)
            workersStore.addWorker(upgradedWorker)
            
            // Log a message to the console
            console.log(`Worker ${workerToUpgrade.id} upgraded from level ${workerToUpgrade.level} to ${targetLevel}`)
          } else {
            // If there are no upgradable workers, log a message
            logger.log('No workers available to upgrade')
          }
        }
      }
      
      // Update the state (for display only)
      setProgress(progressRef.current)
      } catch (error) {
        console.error('Error in worker upgrade progress:', error)
        // Continue game execution even if there's an error
      }
    }, 100) // Update every 100ms for smooth progress
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, assignedWorkerCount, upgradableWorkerCount, upgradeTime, targetLevel])
  
  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Sharing knowledge:</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-center text-xs mt-1">
        {upgradableWorkerCount === 0 ? (
          <div className="text-blue-500 font-medium">All your people have learned non verbal communication!</div>
        ) : assignedWorkerCount === 0 ? (
          <div className="text-gray-500">No workers assigned</div>
        ) : null}
      </div>
    </div>
  )
}

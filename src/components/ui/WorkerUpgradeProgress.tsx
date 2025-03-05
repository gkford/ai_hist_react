import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore } from '@/store/useWorkersStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { Progress } from '@/components/ui/progress'
import { logger } from '@/lib/logger'

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
  const [progress, setProgress] = React.useState(0)
  const [lastTick, setLastTick] = React.useState(Date.now())
  const workers = useWorkersStore(state => state.workers.filter(w => w.assignedTo === cardId))
  const isRunning = useGameLoopStore(state => state.isRunning)
  
  // Reset progress when workers are removed
  React.useEffect(() => {
    if (workers.length === 0) {
      setProgress(0)
    }
  }, [workers.length])
  
  // Progress ticker
  React.useEffect(() => {
    if (!isRunning || workers.length === 0) return
    
    const interval = setInterval(() => {
      const now = Date.now()
      const delta = (now - lastTick) / 1000 // Convert to seconds
      setLastTick(now)
      
      // Calculate progress increment based on number of workers
      // More workers = faster progress
      const increment = (delta / upgradeTime) * workers.length * 100
      
      setProgress(prev => {
        const newProgress = prev + increment
        
        // If we've reached 100%, upgrade a worker and reset
        if (newProgress >= 100) {
          // Find the lowest level worker
          const workersStore = useWorkersStore.getState()
          const allWorkers = workersStore.workers
          
          // Get all workers with level below target level
          const upgradableWorkers = allWorkers.filter(w => w.level < targetLevel)
          
          if (upgradableWorkers.length > 0) {
            // Sort by level (ascending)
            upgradableWorkers.sort((a, b) => a.level - b.level)
            
            // Get the lowest level worker
            const workerToUpgrade = upgradableWorkers[0]
            
            // Upgrade the worker
            const newLevel = targetLevel
            const newIcon = useWorkersStore.getState().getWorkerIcon(newLevel)
            
            logger.log(`Upgrading worker ${workerToUpgrade.id} from level ${workerToUpgrade.level} to ${newLevel}`)
            
            // Create a new worker object with the upgraded level
            const upgradedWorker = {
              ...workerToUpgrade,
              level: newLevel,
              icon: newIcon
            }
            
            // Remove the old worker and add the upgraded one
            workersStore.removeWorker(workerToUpgrade.id)
            workersStore.addWorker(upgradedWorker)
          }
          
          return 0 // Reset progress
        }
        
        return newProgress
      })
    }, 100) // Update every 100ms for smooth progress
    
    return () => clearInterval(interval)
  }, [isRunning, workers.length, upgradeTime, targetLevel, lastTick])
  
  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Worker upgrade progress:</span>
        <span className="text-sm font-medium">{Math.floor(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="text-xs text-gray-500 mt-1">
        {workers.length > 0 
          ? `${workers.length} worker${workers.length > 1 ? 's' : ''} assigned` 
          : 'No workers assigned'}
      </div>
    </div>
  )
}

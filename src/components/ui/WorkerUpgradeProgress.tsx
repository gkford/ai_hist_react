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
  const [progress, setProgress] = React.useState(0)
  
  // Get all the data we need from stores
  const assignedWorkers = useWorkersStore(state => 
    state.workers.filter(w => w.assignedTo === cardId)
  )
  const allWorkers = useWorkersStore(state => state.workers)
  const removeWorker = useWorkersStore(state => state.removeWorker)
  const addWorker = useWorkersStore(state => state.addWorker)
  const isRunning = useGameLoopStore(state => state.isRunning)
  
  // Use a ref for the last tick time to avoid re-renders
  const lastTickRef = React.useRef(Date.now())
  // Use a ref for the interval ID
  const intervalRef = React.useRef<number | null>(null)
  
  // Reset progress when workers are removed
  React.useEffect(() => {
    if (assignedWorkers.length === 0) {
      setProgress(0)
    }
  }, [assignedWorkers.length])
  
  // Clean up interval on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
  
  // Handle progress updates and worker upgrades
  React.useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Don't start a new interval if not running or no workers
    if (!isRunning || assignedWorkers.length === 0) return
    
    // Start a new interval
    intervalRef.current = window.setInterval(() => {
      const now = Date.now()
      const delta = (now - lastTickRef.current) / 1000 // Convert to seconds
      lastTickRef.current = now
      
      // Calculate progress increment based on number of workers
      const increment = (delta / upgradeTime) * assignedWorkers.length * 100
      
      setProgress(prev => {
        const newProgress = prev + increment
        
        // If we've reached 100%, upgrade a worker and reset
        if (newProgress >= 100) {
          // Find upgradable workers (level below target)
          const upgradableWorkers = allWorkers.filter(w => w.level < targetLevel)
          
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
            removeWorker(workerToUpgrade.id)
            addWorker(upgradedWorker)
          }
          
          return 0 // Reset progress
        }
        
        return newProgress
      })
    }, 100) // Update every 100ms for smooth progress
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, assignedWorkers.length, upgradeTime, targetLevel, allWorkers, removeWorker, addWorker])
  
  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Worker upgrade progress:</span>
        <span className="text-sm font-medium">{Math.floor(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="text-xs text-gray-500 mt-1">
        {assignedWorkers.length > 0 
          ? `${assignedWorkers.length} worker${assignedWorkers.length > 1 ? 's' : ''} assigned` 
          : 'No workers assigned'}
      </div>
    </div>
  )
}

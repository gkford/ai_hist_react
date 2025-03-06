import * as React from 'react'
import { cn } from '@/lib/utils'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useGameLoopStore } from '@/store/useGameLoopStore'
import { Progress } from '@/components/ui/progress'
import { logger } from '@/lib/logger'

export function RaiseChildren({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  // Use local state for progress
  const [progress, setProgress] = React.useState(0)
  
  // Use refs for values that shouldn't trigger re-renders
  const progressRef = React.useRef(0)
  const lastTickRef = React.useRef(Date.now())
  const intervalRef = React.useRef<number | null>(null)
  
  // Get worker count and max population
  const workers = useWorkersStore(state => state.workers)
  const max_population = useWorkersStore(state => state.max_population)
  const addWorker = useWorkersStore(state => state.addWorker)
  
  // Get assigned worker count
  const assignedWorkerCount = useWorkersStore(
    state => state.workers.filter(w => w.assignedTo === 'raise_children').length
  )
  
  // Check if population is at max
  const isAtMaxPopulation = workers.length >= max_population
  
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
  
  // Get current food amount
  const foodAmount = useResourceStore(state => state.resources.food.amount[0])
  
  // Setup the interval for progress updates
  React.useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    // Don't start a new interval if not running, no workers, at max population, or no food
    if (!isRunning || assignedWorkerCount === 0 || isAtMaxPopulation || foodAmount <= 0) return
    
    // Start a new interval
    intervalRef.current = window.setInterval(() => {
      try {
        // Check if the game is still running and there's food available before updating progress
        const foodAmount = useResourceStore.getState().resources.food.amount[0];
        if (!useGameLoopStore.getState().isRunning || foodAmount <= 0) {
          // Just update the lastTickRef to avoid large jumps when game resumes
          lastTickRef.current = Date.now()
          return
        }
      
        const now = Date.now()
        const delta = (now - lastTickRef.current) / 1000 // Convert to seconds
        lastTickRef.current = now
        
        // Calculate progress increment based on number of workers
        // Base time: 20 seconds for one worker to raise a child
        const baseTime = 20
        const increment = (delta / baseTime) * assignedWorkerCount * 100
        
        // Update the ref first
        progressRef.current += increment
        
        // Check if we've reached 100%
        if (progressRef.current >= 100) {
          // Reset progress first to prevent multiple children being raised
          const oldProgress = progressRef.current
          progressRef.current = 0
          setProgress(0)
          
          // Only proceed with creating a new worker if we actually crossed the 100% threshold
          if (oldProgress >= 100) {
            // Get the workers store
            const workersStore = useWorkersStore.getState()
            const currentWorkers = workersStore.workers
            
            // Check if we're still below max population
            if (currentWorkers.length < workersStore.max_population) {
              // Find the lowest level among current workers
              const lowestLevel = Math.min(...currentWorkers.map(w => w.level))
              
              // Create a new worker with the lowest level
              const newWorkerId = `worker-${currentWorkers.length}`
              const newWorker = {
                id: newWorkerId,
                level: lowestLevel,
                icon: WORKER_ICONS[lowestLevel as keyof typeof WORKER_ICONS],
                assignedTo: 'gather_food' // Default assignment
              }
              
              logger.log(`Creating new worker ${newWorkerId} with level ${lowestLevel}`)
              
              // Add the new worker
              workersStore.addWorker(newWorker)
              
              // Log a message to the console
              console.log(`New worker ${newWorkerId} created with level ${lowestLevel}`)
            } else {
              // If we've reached max population, log a message
              logger.log('Maximum population reached, cannot raise more children')
            }
          }
        }
        
        // Update the state (for display only)
        setProgress(progressRef.current)
      } catch (error) {
        console.error('Error in raise children progress:', error)
        // Continue game execution even if there's an error
      }
    }, 100) // Update every 100ms for smooth progress
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, assignedWorkerCount, isAtMaxPopulation, foodAmount, addWorker, max_population, workers.length])

  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Raising children:</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-center text-xs mt-1">
        {isAtMaxPopulation ? (
          <div className="text-blue-500 font-medium">Maximum population reached!</div>
        ) : assignedWorkerCount === 0 ? (
          <div className="text-gray-500">No workers assigned to raising children</div>
        ) : foodAmount <= 0 ? (
          <div className="text-red-600 font-medium">Cannot raise children without food!</div>
        ) : null}
      </div>
      <div className="flex items-center justify-between text-sm mt-1">
        <div>Calories consumed each day: {workers.length * 100}</div>
        <div>
          Excess Calories: {Math.floor(foodAmount * 100)}
        </div>
      </div>
    </div>
  )
}

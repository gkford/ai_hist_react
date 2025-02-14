import * as React from 'react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { useWorkersStore, WORKER_ICONS } from '@/store/useWorkersStore'

interface WorkerLevelTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function WorkerLevelTracker({ className, ...props }: WorkerLevelTrackerProps) {
  const workers = useWorkersStore(state => state.workers)
  
  // Get the two most common levels
  const levelCounts = workers.reduce((acc, worker) => {
    acc[worker.level] = (acc[worker.level] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  const sortedLevels = Object.entries(levelCounts)
    .sort(([, a], [, b]) => b - a) // Sort by count, descending
    .map(([level]) => parseInt(level)) // Get just the levels
  
  const primaryLevel = sortedLevels[0]
  const nextLevel = primaryLevel < 4 ? primaryLevel + 1 : primaryLevel
  
  // Calculate progress percentage
  const workersAtNextLevel = workers.filter(w => w.level === nextLevel).length
  const totalRelevantWorkers = workers.filter(w => w.level === primaryLevel || w.level === nextLevel).length
  
  const progress = totalRelevantWorkers === 0 
    ? 0 
    : (workersAtNextLevel / totalRelevantWorkers) * 100
  
  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <span className="text-sm">{WORKER_ICONS[primaryLevel as keyof typeof WORKER_ICONS]}</span>
        <span className="text-sm text-gray-600">→</span>
        <span className="text-sm">{WORKER_ICONS[nextLevel as keyof typeof WORKER_ICONS]}</span>
      </div>
      <Progress value={Math.min(100, Math.max(0, progress))} className="h-2" />
    </div>
  )
}

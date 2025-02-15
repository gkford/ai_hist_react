import * as React from 'react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { useResourceStore } from '@/store/useResourceStore'
import { useKnowledgeLevelStore } from '@/store/useKnowledgeLevelStore'

interface KnowledgeTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function KnowledgeTracker({ className, ...props }: KnowledgeTrackerProps) {
  const knowledge = useResourceStore(state => state.resources.knowledge)
  const { level, thresholds } = useKnowledgeLevelStore()
  
  // Calculate progress percentage
  const currentKnowledge = knowledge.amount[0]
  const currentThreshold = thresholds[level - 1] || 0
  const nextThreshold = thresholds[level] || currentThreshold
  
  const progress = nextThreshold === currentThreshold 
    ? 100 
    : ((currentKnowledge - currentThreshold) / (nextThreshold - currentThreshold)) * 100
  
  return (
    <div className={cn("flex flex-col gap-1 p-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <span className="text-sm">{knowledge.icon}</span>
        <span className="text-sm text-gray-600">Progress to next level</span>
      </div>
      <Progress value={Math.min(100, Math.max(0, progress))} className="h-2" />
    </div>
  )
}

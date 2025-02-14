import * as React from 'react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { useResourceStore } from '@/store/useResourceStore'

interface KnowledgeTrackerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function KnowledgeTracker({ className, ...props }: KnowledgeTrackerProps) {
  const knowledge = useResourceStore(state => state.resources.knowledge)
  
  return (
    <div 
      className={cn("flex items-center gap-2 p-2", className)}
      {...props}
    >
      <span className="text-sm">{knowledge.icon}</span>
      <Progress value={75} className="flex-1 h-2" />
    </div>
  )
}

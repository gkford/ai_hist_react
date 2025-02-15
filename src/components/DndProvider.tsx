import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useCardsStore } from '@/store/useCardsStore'
import { useResourceStore } from '@/store/useResourceStore'
import { useWorkersStore } from '@/store/useWorkersStore'

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!active || !over) return;
  const activeData = active.data.current;
  const dropTargetId = over.id;
  
  // Handle worker reassignment
  if (activeData && activeData.workerId && typeof dropTargetId === 'string') {
    let targetAssignment: string | null = null;
    
    if (dropTargetId === 'population-tracker') {
      targetAssignment = 'population';
    } else if (dropTargetId.endsWith('-tracker')) {
      targetAssignment = dropTargetId.replace('-tracker', '');
    }

    if (targetAssignment !== null) {
      useWorkersStore.getState().assignWorker(activeData.workerId, targetAssignment);
    }
  }
}

export function DndProvider({ children }: { children: React.ReactNode }) {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  )
}

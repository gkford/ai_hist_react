import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useCardsStore } from '@/store/useCardsStore'
import { useResourceStore } from '@/store/useResourceStore'

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!active || !over) return;
  const activeData = active.data.current;
  const dropTargetId = over.id;
  
  // Case 1: Drag from a card's worker (has activeData.cardId) and drop on the population tracker.
  if (activeData && activeData.cardId && dropTargetId === 'population-tracker') {
    const cardId = activeData.cardId;
    const cardState = useCardsStore.getState().cardStates[cardId];
    const population = useResourceStore.getState().resources.population;
    if (!cardState || cardState.assigned_workers <= 0) return;
    const newAssigned = cardState.assigned_workers - 1;
    const newAvailable = (population.available || 0) + 1;
    useCardsStore.getState().updateAssignedWorkers(cardId, newAssigned);
    useResourceStore.getState().produceResource('population', 0, { available: newAvailable });
  }
  
  // Case 2: Drag from population tracker (activeData.from === 'population') and drop on a card's worker tracker.
  if (activeData && activeData.from === 'population' && typeof dropTargetId === 'string' && dropTargetId.endsWith('-tracker')) {
    const cardId = dropTargetId.replace('-tracker', '');
    const cardState = useCardsStore.getState().cardStates[cardId];
    const population = useResourceStore.getState().resources.population;
    if (!cardState || (population.available || 0) <= 0) return;
    const newAssigned = cardState.assigned_workers + 1;
    const newAvailable = (population.available || 0) - 1;
    useCardsStore.getState().updateAssignedWorkers(cardId, newAssigned);
    useResourceStore.getState().produceResource('population', 0, { available: newAvailable });
  }
}

export function DndProvider({ children }: { children: React.ReactNode }) {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  )
}

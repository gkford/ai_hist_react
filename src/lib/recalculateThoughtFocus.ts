import { Priority } from '@/store/useRTStore';
import { EffectState } from '@/store/useEffectsStore';
import { RTState } from '@/store/useRTStore';

interface ThoughtEntity {
  thought_focus: number | null;
  thought_priority: Priority;
}

export function recalculateThoughtFocus(
  rtStates: Record<string, RTState>,
  effectStates: Record<string, EffectState>
): { rtStates: Record<string, RTState>, effectStates: Record<string, EffectState> } {
  // Combine all entities that can receive thought focus and filter out null thought_focus
  const allEntities: ThoughtEntity[] = [
    ...Object.values(rtStates).filter(rt => 
      (rt.status === 'unthoughtof' || rt.status === 'imagined') &&
      rt.thought_focus !== null
    ),
    ...Object.values(effectStates).filter(effect => 
      effect.status === 'unthoughtof' || effect.status === 'imagined'
    )
  ];

  // Get counts by priority
  const highPriorityEntities = allEntities.filter(e => e.thought_priority === 'high');
  const lowPriorityEntities = allEntities.filter(e => e.thought_priority === 'low');

  // Create new state objects
  const newRTStates = { ...rtStates };
  const newEffectStates = { ...effectStates };

  // Reset all thought_focus values to 0
  Object.keys(newRTStates).forEach(id => {
    if (newRTStates[id].thought_focus !== null) {
      newRTStates[id].thought_focus = 0;
    }
  });
  Object.keys(newEffectStates).forEach(id => {
    newEffectStates[id].thought_focus = 0;
  });

  // If all entities have the same priority, split focus equally
  if (allEntities.every(e => e.thought_priority === allEntities[0].thought_priority)) {
    const focusPerEntity = allEntities[0].thought_priority === 'none' ? 0 : 100 / allEntities.length;
    
    // Apply focus to RTs
    Object.entries(rtStates).forEach(([id, rt]) => {
      if (rt.thought_focus !== null) {
        newRTStates[id].thought_focus = focusPerEntity;
      }
    });
    
    // Apply focus to effects
    Object.keys(effectStates).forEach(id => {
      newEffectStates[id].thought_focus = focusPerEntity;
    });
  }
  // Handle mixed priorities
  else {
    // High priority entities split 75%
    const highFocusPerEntity = highPriorityEntities.length > 0 ? 75 / highPriorityEntities.length : 0;
    // Low priority entities split 25%
    const lowFocusPerEntity = lowPriorityEntities.length > 0 ? 25 / lowPriorityEntities.length : 0;

    // Apply focus values
    Object.entries(rtStates).forEach(([id, rt]) => {
      if (rt.thought_focus !== null) {
        newRTStates[id].thought_focus = 
          rt.thought_priority === 'high' ? highFocusPerEntity :
          rt.thought_priority === 'low' ? lowFocusPerEntity :
          0;
      }
    });

    Object.entries(effectStates).forEach(([id, effect]) => {
      newEffectStates[id].thought_focus = 
        effect.thought_priority === 'high' ? highFocusPerEntity :
        effect.thought_priority === 'low' ? lowFocusPerEntity :
        0;
    });
  }

  return { rtStates: newRTStates, effectStates: newEffectStates };
}

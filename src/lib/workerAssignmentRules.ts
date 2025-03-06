/**
 * Worker Assignment Rules Module
 * 
 * This module provides a flexible system for worker reassignment rules.
 * Rules can be defined per card type with specific card overrides if needed.
 */

import { useWorkersStore } from '@/store/useWorkersStore';
import { useCardsStore } from '@/store/useCardsStore';
import { CardType } from '@/data/cards';

/**
 * Helper function to get all card IDs of a specific type
 */
function getCardIdsByType(type: CardType | string): string[] {
  const { cardStates } = useCardsStore.getState();
  return Object.values(cardStates)
    .filter(card => card.type === type && card.discovery_state.current_status === 'discovered')
    .map(card => card.id);
}

// Define priority orders for different card types
const CARD_TYPE_PRIORITIES: Record<CardType, string[]> = {
  'production': ['gather_food', 'hunt', 'cooperative_hunting'],
  'computation': ['think'],
  'science': [],
  'people': [],
  'resource': [],
  'worker_upgrade': [],
  'create_worker': []
};

// Define fallback order for when type-specific rules don't yield a worker
// First take from worker_upgrade cards, then create_worker cards, then others
const FALLBACK_PRIORITY = [
  // Card types to prioritize taking workers from
  ...getCardIdsByType('worker_upgrade'),
  ...getCardIdsByType('create_worker'),
  
  // Traditional fallback priorities
  'think', 
  'gather_food', 
  'hunt', 
  'cooperative_hunting'
];

// Card-specific override rules (empty for now, but structure is ready)
const CARD_SPECIFIC_PRIORITIES: Record<string, string[]> = {};

export function assignWorkerToCard(cardId: string): void {
  const { workers, assignWorker } = useWorkersStore.getState();
  const { cardStates } = useCardsStore.getState();
  const targetCard = cardStates[cardId];

  if (!targetCard) {
    console.error(`Card ${cardId} not found`);
    return;
  }

  // ALWAYS try unassigned workers first
  const unassignedWorkers = workers.filter(worker => 
    worker.assignedTo === null || 
    worker.assignedTo === undefined || 
    worker.assignedTo === '' || 
    worker.assignedTo === 'population'
  );
  if (unassignedWorkers.length > 0) {
    // Take the first unassigned worker
    assignWorker(unassignedWorkers[0].id, cardId);
    return;
  }

  // Try card-specific rules if they exist
  if (CARD_SPECIFIC_PRIORITIES[cardId]) {
    for (const candidateId of CARD_SPECIFIC_PRIORITIES[cardId]) {
      if (tryReassignWorker(candidateId, cardId)) return;
    }
  }

  // Try card type rules
  const typeRules = CARD_TYPE_PRIORITIES[targetCard.type] || [];
  for (const candidateId of typeRules) {
    if (candidateId === cardId) continue;
    if (tryReassignWorker(candidateId, cardId)) return;
  }

  // Try fallback rules
  for (const candidateId of FALLBACK_PRIORITY) {
    if (candidateId === cardId) continue;
    if (tryReassignWorker(candidateId, cardId)) return;
  }

  // If we still haven't found a worker, take from any card
  const anyWorker = workers.find(w => w.assignedTo !== cardId);
  if (anyWorker) {
    assignWorker(anyWorker.id, cardId);
    return;
  }

}

function tryReassignWorker(fromCardId: string, toCardId: string): boolean {
  const { workers, assignWorker } = useWorkersStore.getState();
  const worker = workers.find(w => w.assignedTo === fromCardId);
  if (worker) {
    assignWorker(worker.id, toCardId);
    return true;
  }
  return false;
}

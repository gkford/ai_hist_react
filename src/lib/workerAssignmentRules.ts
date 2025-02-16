/**
 * Worker Assignment Rules Module
 *
 * This module contains ad-hoc rules for assigning workers to production cards.
 * If there are no unassigned workers available, and a worker is being added to a
 * production card, this module will attempt to reassign a worker from another production card.
 * The order of production cards from worst to best is:
 *   1. gather_food (worst)
 *   2. hunt (middle)
 *   3. cooperative_hunting (best)
 *
 * Rules:
 * - Always try to assign an unassigned worker first.
 * - If no unassigned workers exist, reassign a worker from the first available production card in the specified order,
 *   skipping the target card.
 *
 * Note: These rules are provisional and may require refactoring as the game mechanics become more refined.
 */

import { useWorkersStore } from '@/store/useWorkersStore';

export function assignWorkerToProductionCard(cardId: string): void {
  const { workers, assignWorker } = useWorkersStore.getState();

  // Check for unassigned workers
  const unassignedWorker = workers.find(worker => worker.assignedTo === null);
  if (unassignedWorker) {
    assignWorker(unassignedWorker.id, cardId);
    console.log(`Worker ${unassignedWorker.id} was assigned to ${cardId} from unassigned pool.`);
    return;
  }

  // Production card order from worst to best
  const productionOrder = ['gather_food', 'hunt', 'cooperative_hunting'];

  // Reassign from other production cards in order, skipping the target card
  for (const candidateId of productionOrder) {
    if (candidateId === cardId) continue;
    const candidateWorker = workers.find(worker => worker.assignedTo === candidateId);
    if (candidateWorker) {
      assignWorker(candidateWorker.id, cardId);
      console.log(`Worker ${candidateWorker.id} was reassigned from ${candidateId} to ${cardId}.`);
      return;
    }
  }

  console.log(`No available workers to assign to ${cardId}.`);
}

import { create } from 'zustand'
import { useWorkersStore } from './useWorkersStore'
import { useResourceStore } from './useResourceStore'
import { logger } from '@/lib/logger'

// Moved from gameLoop.ts
export const CALORIE_CONSUMPTION_PER_PERSON = 2000;

interface PopulationStore {
  // The target population based on workers assigned to raise children
  populationTarget: number;
  
  // Calorie-constrained equilibrium population
  calorieEquilibrium: number;
  
  // The lower of target and calorie equilibrium
  dominantEquilibrium: number;
  
  // Fractional progress toward next population change (-1.0 to 1.0)
  populationProgress: number;
  
  // Calculate and update the population target
  updatePopulationTarget: () => void;
  
  // Calculate the calorie-constrained equilibrium
  calculateCalorieEquilibrium: () => void;
  
  // Calculate the dominant equilibrium (lower of target and calorie)
  calculateDominantEquilibrium: () => void;
  
  // Update population progress based on difference from equilibrium
  updatePopulationProgress: () => void;
  
  // Apply population changes when progress hits thresholds
  applyPopulationChanges: () => void;
}

export const usePopulationStore = create<PopulationStore>((set, get) => ({
  populationTarget: 0,
  calorieEquilibrium: 0,
  dominantEquilibrium: 0,
  populationProgress: 0,
  
  updatePopulationTarget: () => {
    const workersStore = useWorkersStore.getState();
    const assignedWorkers = workersStore.workers.filter(w => w.assignedTo === 'raise_children').length;
    
    // Population target is 3x the number of workers assigned to raise children
    const target = assignedWorkers * 3;
    
    set({ populationTarget: target });
  },
  
  calculateCalorieEquilibrium: () => {
    const resourceStore = useResourceStore.getState();
    const workersStore = useWorkersStore.getState();
    
    // Get food production rate (amount produced in the last second)
    const foodProduction = resourceStore.resources.food.amountProducedThisSecond[0] || 0;
    
    // Get calories per food unit
    const caloriesPerFood = resourceStore.resources.food.calories || 2000;
    
    // Calculate total calories produced per day
    const totalCaloriesPerDay = foodProduction * caloriesPerFood;
    
    // Calculate the current ratio of workers raising children to total workers
    const totalWorkers = workersStore.workers.length;
    const raisingChildrenWorkers = workersStore.workers.filter(w => w.assignedTo === 'raise_children').length;
    
    // If no workers, avoid division by zero
    if (totalWorkers === 0) {
      set({ calorieEquilibrium: 0 });
      return;
    }
    
    const raisingChildrenRatio = raisingChildrenWorkers / totalWorkers;
    
    // Calculate average calorie consumption per person based on current ratio
    // Regular workers: 100%, Workers raising children: 200%
    const avgCaloriesPerPerson = CALORIE_CONSUMPTION_PER_PERSON * (1 + (1.0 * raisingChildrenRatio));
    
    // Calculate how many people can be sustained with this calorie production
    const equilibrium = totalCaloriesPerDay / avgCaloriesPerPerson;
    
    // Round down to get a whole number of people
    const roundedEquilibrium = Math.floor(equilibrium);
    
    set({ calorieEquilibrium: roundedEquilibrium });
  },
  
  calculateDominantEquilibrium: () => {
    const { populationTarget, calorieEquilibrium } = get();
    
    // If either value is 0, use the other one
    if (populationTarget === 0) {
      set({ dominantEquilibrium: calorieEquilibrium });
      return;
    }
    if (calorieEquilibrium === 0) {
      set({ dominantEquilibrium: populationTarget });
      return;
    }
    
    // Otherwise use the lower value
    const dominant = Math.min(populationTarget, calorieEquilibrium);
    set({ dominantEquilibrium: dominant });
  },
  
  updatePopulationProgress: () => {
    const { dominantEquilibrium, populationProgress } = get();
    const currentPopulation = useWorkersStore.getState().workers.length;
    
    // Calculate the difference
    const difference = dominantEquilibrium - currentPopulation;
    
    // If no difference, no change needed
    if (difference === 0) {
      set({ populationProgress: 0 });
      return;
    }
    
    // Calculate the rate of change based on the difference
    // The larger the difference, the faster the change
    // Using a tanh function to make it smooth
    const changeRate = Math.tanh(difference / 5) * 0.2; // Scale factor of 0.2 means max ±0.2 per tick
    
    logger.log(`Population progress: current=${populationProgress.toFixed(2)}, change=${changeRate.toFixed(2)}, difference=${difference}`);
    
    // Update the progress
    const newProgress = populationProgress + changeRate;
    
    set({ populationProgress: newProgress });
  },
  
  applyPopulationChanges: () => {
    const { populationProgress } = get();
    const workersStore = useWorkersStore.getState();
    const currentWorkers = workersStore.workers;
    
    // If progress reaches +1, add a worker
    if (populationProgress >= 1) {
      // Create a new worker
      const newWorkerId = `worker-${currentWorkers.length}`;
      
      // Find the lowest level among current workers
      const lowestLevel = Math.min(...currentWorkers.map(w => w.level));
      
      const newWorker = {
        id: newWorkerId,
        level: lowestLevel,
        icon: workersStore.getWorkerIcon(lowestLevel),
        assignedTo: 'gather_food' // Default assignment
      };
      
      logger.log(`Adding new worker ${newWorkerId} due to population growth`);
      
      // Add the worker
      workersStore.addWorker(newWorker);
      
      // Reset progress (keeping any excess)
      set({ populationProgress: populationProgress - 1 });
    }
    
    // If progress reaches -1, remove a worker
    else if (populationProgress <= -1 && currentWorkers.length > 0) {
      // Find an unassigned worker or one assigned to gather_food
      const workerToRemove = currentWorkers.find(w => 
        w.assignedTo === null || w.assignedTo === 'gather_food'
      );
      
      if (workerToRemove) {
        logger.log(`Removing worker ${workerToRemove.id} due to population decline`);
        workersStore.removeWorker(workerToRemove.id);
      } else {
        // If no unassigned/food gatherers, remove the last worker
        const lastWorker = currentWorkers[currentWorkers.length - 1];
        logger.log(`Removing worker ${lastWorker.id} due to population decline (no unassigned workers available)`);
        workersStore.removeWorker(lastWorker.id);
      }
      
      // Reset progress (keeping any excess)
      set({ populationProgress: populationProgress + 1 });
    }
  }
}));

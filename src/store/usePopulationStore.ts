import { create } from 'zustand'
import { useWorkersStore } from './useWorkersStore'
import { useResourceStore } from './useResourceStore'

// Moved from gameLoop.ts
export const CALORIE_CONSUMPTION_PER_PERSON = 2000;

interface PopulationStore {
  // The target population based on workers assigned to raise children
  populationTarget: number;
  
  // Calorie-constrained equilibrium population
  calorieEquilibrium: number;
  
  // Calculate and update the population target
  updatePopulationTarget: () => void;
  
  // Calculate the calorie-constrained equilibrium
  calculateCalorieEquilibrium: () => void;
}

export const usePopulationStore = create<PopulationStore>((set) => ({
  populationTarget: 0,
  calorieEquilibrium: 0,
  
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
  }
}));

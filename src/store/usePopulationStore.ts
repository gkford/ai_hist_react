import { create } from 'zustand'
import { useWorkersStore } from './useWorkersStore'

interface PopulationStore {
  // The target population based on workers assigned to raise children
  populationTarget: number;
  
  // Calculate and update the population target
  updatePopulationTarget: () => void;
}

export const usePopulationStore = create<PopulationStore>((set) => ({
  populationTarget: 0,
  
  updatePopulationTarget: () => {
    const workersStore = useWorkersStore.getState();
    const assignedWorkers = workersStore.workers.filter(w => w.assignedTo === 'raise_children').length;
    
    // Population target is 3x the number of workers assigned to raise children
    const target = assignedWorkers * 3;
    
    set({ populationTarget: target });
  }
}));

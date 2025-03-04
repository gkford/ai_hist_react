import { create } from 'zustand'

export const WORKER_TYPES = {
  1: { name: 'Hominids', icon: '😊' },
  2: { name: 'Grunts', icon: '🤔' },
  3: { name: 'Reasoners', icon: '🧑‍🔬' },
  4: { name: 'Storytellers', icon: '🧙‍♂️' }
} as const;

export const WORKER_ICONS = {
  1: WORKER_TYPES[1].icon,
  2: WORKER_TYPES[2].icon,
  3: WORKER_TYPES[3].icon,
  4: WORKER_TYPES[4].icon,
} as const;

export interface Worker {
  id: string;
  level: number;
  icon: string;
  assignedTo: string | null;
}

interface WorkersStore {
  workers: Worker[];
  addWorker: (worker: Worker) => void;
  assignWorker: (workerId: string, newAssignment: string | null) => void;
  removeWorker: (workerId: string) => void;
  getWorkersByAssignment: (assignment: string | null) => Worker[];
  upgradeWorkers: (count: number) => void; // Legacy method
  upgradeWorkersOnDiscovery: (cardId?: string) => void; // New unified method
}

export const useWorkersStore = create<WorkersStore>((set, get) => ({
  getWorkerIcon: (level: number) => WORKER_ICONS[level as keyof typeof WORKER_ICONS] || WORKER_ICONS[1],
  workers: Array(1).fill(null).map((_, i) => ({
    id: `worker-${i}`,
    level: 1,
    icon: WORKER_ICONS[1],
    assignedTo: 'gather_food'
  })),

  addWorker: (worker) =>
    set((state) => ({ 
      workers: [...state.workers, {
        ...worker,
        // Automatically assign new workers to gather_food
        assignedTo: worker.assignedTo || 'gather_food'
      }] 
    })),

  assignWorker: (workerId, newAssignment) =>
    set((state) => ({
      workers: state.workers.map((w) => 
        w.id === workerId ? { ...w, assignedTo: newAssignment } : w
      ),
    })),

  removeWorker: (workerId) =>
    set((state) => ({
      workers: state.workers.filter((w) => w.id !== workerId),
    })),

  getWorkersByAssignment: (assignment) => {
    return get().workers.filter(w => w.assignedTo === assignment);
  },

  // Legacy method kept for backward compatibility
  upgradeWorkers: (count: number) => {
    console.warn('upgradeWorkers is deprecated, use upgradeWorkersOnDiscovery instead');
    // Call the new method
    get().upgradeWorkersOnDiscovery();
  },
  
  // New unified worker upgrade method
  upgradeWorkersOnDiscovery: (cardId?: string) => {
    set((state) => {
      // Get current worker levels
      const currentLevels = new Set(state.workers.map(w => w.level));
      
      // If we already have workers at max level, no upgrade needed
      if (currentLevels.has(4)) {
        return { workers: state.workers };
      }
      
      // Get the current lowest and highest levels
      const lowestLevel = Math.min(...Array.from(currentLevels));
      const highestLevel = Math.max(...Array.from(currentLevels));
      
      // Determine the target level for this upgrade
      // If all workers are at the same level, increase by 1
      // If there are multiple levels, bring all to the highest level
      const targetLevel = currentLevels.size === 1 
        ? Math.min(lowestLevel + 1, 4) // Increase by 1, max of 4
        : highestLevel; // Bring all to highest current level
      
      // If all workers are already at max level, no change needed
      if (lowestLevel >= 4) {
        return { workers: state.workers };
      }
      
      // If we have multiple levels, upgrade all to the highest level
      if (currentLevels.size > 1) {
        // Upgrade all workers to the highest current level
        const updatedWorkers = state.workers.map(worker => {
          if (worker.level < targetLevel) {
            return {
              ...worker,
              level: targetLevel,
              icon: WORKER_ICONS[targetLevel as keyof typeof WORKER_ICONS]
            };
          }
          return worker;
        });
        
        logger.log(`All workers upgraded to level ${targetLevel}`);
        return { workers: updatedWorkers };
      }
      
      // If all workers are at the same level, upgrade half of them to the next level
      // Upgrade half of the workers (rounded up)
      const workersToUpgrade = Math.ceil(state.workers.length / 2);
      
      // Sort workers by ID for consistent selection
      const sortedWorkers = [...state.workers].sort((a, b) => a.id.localeCompare(b.id));
      
      // Select the first half to upgrade
      const upgradeIds = new Set(
        sortedWorkers.slice(0, workersToUpgrade).map(w => w.id)
      );
      
      // Update the workers
      const updatedWorkers = state.workers.map(worker => {
        if (upgradeIds.has(worker.id)) {
          return {
            ...worker,
            level: targetLevel,
            icon: WORKER_ICONS[targetLevel as keyof typeof WORKER_ICONS]
          };
        }
        return worker;
      });
      
      logger.log(`Half of workers upgraded to level ${targetLevel}`);
      return { workers: updatedWorkers };
    });
  }
}));

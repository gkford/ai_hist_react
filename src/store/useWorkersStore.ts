import { create } from 'zustand'

export const WORKER_TYPES = {
  1: { name: 'Hominids', icon: '😊' },
  2: { name: 'Grunts', icon: '🤔' },
  3: { name: 'Storytellers', icon: '🧙‍♂️' },
  4: { name: 'Reasoners', icon: '🧑‍🔬' }
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
  upgradeWorkers: (count: number) => void;
}

export const useWorkersStore = create<WorkersStore>((set, get) => ({
  getWorkerIcon: (level: number) => WORKER_ICONS[level as keyof typeof WORKER_ICONS] || WORKER_ICONS[1],
  workers: Array(10).fill(null).map((_, i) => ({
    id: `worker-${i}`,
    level: 1,
    icon: WORKER_ICONS[1],
    assignedTo: 'gather_food'
  })),

  addWorker: (worker) =>
    set((state) => ({ 
      workers: [...state.workers, worker] 
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

  upgradeWorkers: (count: number) => {
    set((state) => {
      // Sort workers by level (ascending) and then by ID to ensure stable sorting
      const sortedWorkers = [...state.workers].sort((a, b) => 
        a.level === b.level ? a.id.localeCompare(b.id) : a.level - b.level
      );

      // Find the workers to upgrade (taking only 'count' number of lowest level workers)
      const workersToUpgrade = new Set(
        sortedWorkers
          .filter(w => w.level < 4) // Only workers below max level
          .slice(0, count)
          .map(w => w.id)
      );

      // Update the workers array with upgrades
      const updatedWorkers = state.workers.map(worker => {
        if (workersToUpgrade.has(worker.id)) {
          const newLevel = Math.min(4, worker.level + 1);
          return {
            ...worker,
            level: newLevel,
            icon: WORKER_ICONS[newLevel as keyof typeof WORKER_ICONS]
          };
        }
        return worker;
      });

      return { workers: updatedWorkers };
    });
  }
}));

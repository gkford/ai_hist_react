import { create } from 'zustand'

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
}

export const useWorkersStore = create<WorkersStore>((set, get) => ({
  workers: Array(10).fill(null).map((_, i) => ({
    id: `worker-${i}`,
    level: 1,
    icon: '👤',
    assignedTo: 'population'
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
  }
}));

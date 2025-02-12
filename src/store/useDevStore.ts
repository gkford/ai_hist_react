import { create } from 'zustand'

interface DevStore {
  devMode: boolean
  verbose: boolean
  toggleDevMode: () => void
  toggleVerbose: () => void
}

export const useDevStore = create<DevStore>((set) => ({
  devMode: false,
  verbose: false,
  toggleDevMode: () => set((state) => ({ devMode: !state.devMode })),
  toggleVerbose: () => set((state) => {
    const newVerbose = !state.verbose;
    setVerboseLogging(newVerbose);
    return { verbose: newVerbose };
  })
}))

import { create } from 'zustand'

interface DevStore {
  devMode: boolean
  toggleDevMode: () => void
}

export const useDevStore = create<DevStore>((set) => ({
  devMode: false,
  toggleDevMode: () => set((state) => ({ devMode: !state.devMode }))
}))

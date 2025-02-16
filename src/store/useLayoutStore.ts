import { create } from 'zustand'

interface LayoutStore {
  layout: 'vertical' | 'horizontal'
  toggleLayout: () => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  layout: 'horizontal',
  toggleLayout: () => set((state) => ({ 
    layout: state.layout === 'vertical' ? 'horizontal' : 'vertical' 
  })),
}))

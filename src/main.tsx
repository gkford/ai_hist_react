import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Apptwo from './Apptwo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Apptwo />
    </DndProvider>
  </StrictMode>,
)

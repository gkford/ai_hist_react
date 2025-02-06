import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Apptwo from './Apptwo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Apptwo />
  </StrictMode>,
)

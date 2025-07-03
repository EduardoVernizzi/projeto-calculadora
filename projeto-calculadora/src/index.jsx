import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Calculator from './Main/Calculator'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calculator />
  </StrictMode>,
)

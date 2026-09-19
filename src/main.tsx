import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StoreProvider from './store/StoreProvider'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreProvider><App /></StoreProvider>
  </BrowserRouter>,
)

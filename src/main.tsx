import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AppProviders } from '@/contexts/AppProviders'
import { ConfigNotice } from '@/components/shared/ConfigNotice'
import { isFirebaseConfigured } from '@/firebase/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isFirebaseConfigured ? (
      <AppProviders>
        {/* BASE_URL supports serving from a subpath (GitHub Pages). */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </AppProviders>
    ) : (
      <ConfigNotice />
    )}
  </StrictMode>,
)

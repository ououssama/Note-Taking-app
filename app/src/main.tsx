// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppProviderContext } from './Features/Context/notesContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AppProviderContext>
      <App />
    </AppProviderContext>
  // </React.StrictMode>,
)

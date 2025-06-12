import './App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from "react-router";
import CustomRoutes from './Routes.tsx'

registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
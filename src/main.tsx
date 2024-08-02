import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextWrapper from "./scheduler/context/ContextWrapper.tsx";

import App from "./App.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ContextWrapper>
          <BrowserRouter>
              <App />
          </BrowserRouter>

      </ContextWrapper>
  </React.StrictMode>,
)

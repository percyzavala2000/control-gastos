import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BudgetProvider from './context/BudgetContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    { /* Aquí se envuelve la aplicación en el proveedor de contexto BudgetProvider */}
    <BudgetProvider>
      {/*  Aquí se renderiza la aplicación */}
    <App />
    </BudgetProvider>
  </React.StrictMode>,
)

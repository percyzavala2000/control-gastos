import { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';

// Hook personalizado para usar el contexto de Budget
export const useBudget = () => {
  // Aquí se usa el hook useContext para acceder al contexto de Budget
  const context= useContext(BudgetContext);
  // Si no se encuentra el contexto, se lanza un error
  if(!context){
    throw new Error('useBudget debe estar dentro del proveedor BudgetProvider')
  }
  return (
    context
  )
}
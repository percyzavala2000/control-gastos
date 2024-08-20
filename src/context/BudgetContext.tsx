import { createContext, ReactNode, useMemo, useReducer} from 'react';
import { BudgetActions, budgetReducer, BudgetState, initialBudgetState } from '../reducers/budgetReducer';
// aqui se esta configurando el contexto de la aplicacion

//aqui se crea el type de las props que se van a pasar al context state y dispatch 
type BudgetContextProps = {
  state:BudgetState;
  dispatch:React.Dispatch<BudgetActions>
  totalExpenses:number;
  remainingBudget:number;
};
//aqui se crea el type de las props que se van a pasar al provider
type BugedtProviderProps={
  children:ReactNode
}




//aqui se crea el contexto con el type de las props que se van a pasar al context state y dispatch 
export const BudgetContext = createContext<BudgetContextProps >({} as BudgetContextProps);//null!

// aqui se crea el provider con el type de las props que se van a pasar al provider
const BudgetProvider = ({children}:BugedtProviderProps) => {
  //aqui podrias tener useReducer,useState,useEffect,useContext,useRef,useMemo,useCallback
  const [state, dispatch] = useReducer(budgetReducer, initialBudgetState);

  const totalExpenses = useMemo(() => {   
    return state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }
  ,[state.expenses]);
  const remainingBudget = state.budget - totalExpenses;
  
  return (
    //aqui se retorna el provider con el value que va a tener el context state y dispatch 

   <BudgetContext.Provider value ={{state,dispatch,totalExpenses,remainingBudget}}> 
      {children}
   </BudgetContext.Provider>
  )
}
export default BudgetProvider;
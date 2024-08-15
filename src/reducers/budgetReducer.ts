export type BudgetActions={type:'add-budget',payload:{budget:number}}

export type BudgetState={
  budget:number
}
export const initialBudgetState:BudgetState={
  budget:0
}

export const budgetReducer=(state:BudgetState,action:BudgetActions):BudgetState=>{
  switch (action.type) {
    case 'add-budget':
      return {...state,budget:action.payload.budget}
    default:
      return state;
  }
}
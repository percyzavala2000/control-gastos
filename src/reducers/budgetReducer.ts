import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "reset-app" }
  | {type:"add-filter-category";payload:{id:Category["id"]}}

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory:Category["id"];
};
const initialBudget = (): number => {
  const localStoredBudget = localStorage.getItem("budget");
  return localStoredBudget ? parseInt(localStoredBudget) : 0;
};
const localStorageExpense = (): Expense[] => {
  const localStoredExpenses = localStorage.getItem("expenses");
  return localStoredExpenses ? JSON.parse(localStoredExpenses) : [];
};

export const initialBudgetState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpense(),
  editingId: "",
  currentCategory:""
};

const createExpense = (expense: DraftExpense): Expense => {
  return {
    id: uuidv4(),
    ...expense,
  };
};

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case "add-budget":
      return { ...state, budget: action.payload.budget };
    case "show-modal":
      return { ...state, modal: true };
    case "close-modal":
      return { ...state, modal: false, editingId: "" };
    case "add-expense":
      const expense = createExpense(action.payload.expense);
      return { ...state, expenses: [...state.expenses, expense], modal: false };
    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "get-expense-by-id":
      return { ...state, editingId: action.payload.id, modal: true };
    case "update-expense":
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      );
      return {
        ...state,
        expenses: updatedExpenses,
        modal: false,
        editingId: "",
      };
    case "reset-app":
      return {
        ...state,
        budget: 0,
        expenses: [],
    
      };
    case "add-filter-category":
      return {
        ...state,
        currentCategory:action.payload.id
      };

    default:
      return state;
  }
};

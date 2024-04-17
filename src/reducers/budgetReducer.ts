import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
  | {
      type: "addBudgetAmount";
      payload: { budget: number };
    }
  | {
      type: "showModal";
    }
  | {
      type: "closeModal";
    }
  | {
      type: "addExpense";
      payload: { expense: DraftExpense };
    }
  | {
      type: "removeExpense";
      payload: { id: Expense["id"] };
    }
  | {
      type: "getExpenseById";
      payload: { id: Expense["id"] };
    }
  | {
      type: "updateExpense";
      payload: { expense: Expense };
    }| {
      type: "resetApp";
      
    }| {
      type: "filterByCategory";
      payload: {id: Category['id']}
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory:Category['id']
};

const initialBudget = ():number => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = (): Expense[] =>{
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: ""
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return { ...draftExpense, id: uuidv4() };
};


export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case "addBudgetAmount":
      return {
        ...state,
        budget: action.payload.budget,
      };
      break;
    case "showModal":
      return {
        ...state,
        modal: true,
      };
      break;

    case "closeModal":
      return {
        ...state,
        modal: false,
        editingId:""
      };
      break;

    case "addExpense":
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
      break;

    case "removeExpense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
      break;

    case "getExpenseById":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };
      break;

    case "updateExpense":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.expense.id
            ? action.payload.expense
            : expense
        ),
        modal: false,
        editingId : ""
      };
      break;

    case "resetApp":
        return {
          ...state,
          budget: 0, 
          expenses: [],
        }
    break;
    case "filterByCategory":
      return {
        ...state,
        currentCategory : action.payload.id
      }
  break;
    default:
      return state;
      break;
  }
};

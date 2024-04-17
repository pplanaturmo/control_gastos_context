import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react";
import {
  BudgetActions,
  BudgetState,
  budgetReducer,
  initialState,
} from "../reducers/budgetReducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpended: number;
  available: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpended = useMemo(
    () =>
      state.expenses.reduce(
        (total, expense) => expense.expenseAmount + total,
        0
      ),
    [state.expenses]
  );

  const available: number = state.budget - totalExpended;
  

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpended,
        available
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

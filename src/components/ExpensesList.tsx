import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpensesList() {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expenses;
  return (
    <div className="mt-10 bg-white shadow-lg rounded-md p-5 ">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          <p className="text-gray -600 text-2xl font-bold my-5">
            Lista de gastos
          </p>

          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}

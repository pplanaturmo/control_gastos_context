import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpensesList from "./components/ExpensesList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(state.expenses))

  } , [state.expenses])

  useEffect(()=>{
    localStorage.setItem("budget",state.budget.toString())

  } , [state.budget])
  return (
    <>
      <header className="bg-blue-300 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>
      <div className="text-center max-w-3xl mx-auto bg-white shadow-lg rounded-md mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpensesList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;

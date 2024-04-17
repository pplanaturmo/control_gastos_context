import { ChangeEvent, useEffect, useState } from "react";
import type { DraftExpense } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Value } from "../types/index";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../helpers/index"

export default function ExpenseForm() {
  const { dispatch, state, available } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    expenseAmount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPReviousAmount(editingExpense.expenseAmount)
    }
  }, [state.editingId]);

  const [error, setError] = useState("");
  const [previousAmount, setPReviousAmount] = useState(0);


  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const isAmountField = ["expenseAmount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(expense).includes("") || expense.expenseAmount === 0) {
      setError("Todos los campos son obligatorios");
    } else if ((expense.expenseAmount - previousAmount) > available) {
      setError(`El gasto se sale del presupuesto, quedan ${formatCurrency(available)} por gastar` );
    } else if (state.editingId) {
      dispatch({
        type: "updateExpense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "addExpense", payload: { expense } });
    }
    // setExpense({
    //     expenseAmount: 0,
    //     expenseName: "",
    //     category: "",
    //     date: new Date(),
    // })
    setPReviousAmount(0)
  };

  return (
    <form className="space-y-5 " onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
        {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          placeholder="Introduce aquí el nombre del gasto"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseAmount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="expenseAmount"
          name="expenseAmount"
          placeholder="Introduce aquí la cantidad del gasto"
          className="bg-slate-100 p-2"
          value={expense.expenseAmount}
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">---Seleccione---</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Fecha:</label>
        <DatePicker
          className="bg-slate-300"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-md"
        value={state.editingId ? "Guardar Cambios" : "Registrar gasto"}
      />
    </form>
  );
}

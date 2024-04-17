import { ChangeEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
const {dispatch } = useBudget ()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  
    setBudget(event.target.valueAsNumber);
  };

  const isNotValid = useMemo (()=> {
    
    
    return isNaN(budget) || budget< 0
    
  },[budget])

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({type: 'addBudgetAmount',payload: {budget}})


  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          value={budget}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          id="budget"
        ></input>
      </div>
      <input
        type="submit"
        value="Definir Presupuesto"
        disabled={isNotValid}
        className="bg-blue-800 hover:bg-blue-500 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
      ></input>
    </form>
  );
}

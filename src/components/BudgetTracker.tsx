import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
  const { state, totalExpended, available, dispatch } = useBudget();

  const percentage = +((totalExpended / state.budget) * 100).toFixed(2);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? "#DC2626" : "#3b82f6",
            trailColor: "#F5F5F5",
            textSize: 8,
            textColor: "#3b82f6",
          })}
          text={`${percentage}%`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-md"
          onClick={() => dispatch({ type: "resetApp" })}
        >
          Resetear APP
        </button>
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        ></AmountDisplay>
        <AmountDisplay label="Gastado" amount={totalExpended}></AmountDisplay>
        <AmountDisplay label="Disponible" amount={available}></AmountDisplay>
      </div>
    </div>
  );
}

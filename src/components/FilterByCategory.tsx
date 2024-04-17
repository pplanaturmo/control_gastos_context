import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const { dispatch } = useBudget();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type:"filterByCategory",payload:{id:event.target.value}})

  }

  return (
    <div className="bg-white shadow-lg rounded-md p-10">
      <form>
        <div className="flex flex-col md-fkex-row md:items-center gap-5">
          <label htmlFor="filter">Filtrar gastos</label>
          <select
            name="filter"
            id="filter"
            className=" bg-slate-100 p-3 flex-1 rounded-md"
            onChange={handleChange}
          >
            <option value={""}>----Todas las categorias----</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

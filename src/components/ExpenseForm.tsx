import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { categories } from "../data/categories";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const [previosAmount, setPreviosAmount] = useState(0);
  const { state, dispatch, remainingBudget } = useBudget();
  useEffect(() => {
    if (state.editingId) {
      const ediringExpense = state.expenses.filter(
        (expense) => expense.id === state.editingId
      )[0];

      setExpense(ediringExpense);
      setPreviosAmount(ediringExpense.amount);
    }
  }, [state.editingId]);

  const handleOnchange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? parseFloat(value) : value,
    });
  };
  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validar
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    //validar que el gasto no sea mayor al presupuesto
    if ((expense.amount-previosAmount) > remainingBudget) {
      setError(
        `El gasto no puede ser mayor al presupuesto`
      );
      return;
    }

    //agregar / actualizar un gasto nuevo
    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { ...expense, id: state.editingId } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    //resetear formulario
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre de Gasto:{" "}
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del Gasto"
          name="expenseName"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleOnchange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:{" "}
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del Gasto ejem. 300"
          name="amount"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleOnchange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Cantidad:{" "}
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleOnchange}
        >
          <option value="">Seleccione una Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Fecha Gasto:{" "}
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? "Guardar cambios" : "Registrar gasto"}
      />
    </form>
  );
};

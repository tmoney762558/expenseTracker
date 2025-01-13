import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addBudget } from "../store/slices/budgetSlice";

const AddBudget = () => {
  const budgetNameInput = useRef<HTMLInputElement>(null);
  const budgetAmountInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  return (
    <form className="flex flex-col items-center w-full mt-10 mb-5">
      <div className="flex justify-center gap-5 w-full">
        <input
          className="w-full max-w-[11.75rem] py-1 px-2 rounded-lg bg-neutral-200 border-neutral-300 border-2 outline-none"
          ref={budgetNameInput}
          type="text"
          placeholder="Budget Name"
        ></input>
        <input
          className="w-full max-w-[11.75rem] py-1 px-2 rounded-lg bg-neutral-200 border-neutral-300 border-2 outline-none"
          ref={budgetAmountInput}
          type="number"
          placeholder="Budget Amount"
        ></input>
      </div>
      <button
        className="w-full max-w-[25rem] mt-5 py-1 rounded-lg bg-purple-700 text-white"
        onClick={(e) => {
          e.preventDefault();
          if (
            budgetNameInput.current !== null &&
            budgetAmountInput.current !== null
          ) {
            if (
              budgetNameInput.current.value === "" ||
              budgetAmountInput.current.value === ""
            ) {
              alert("Please fill out all fields.");
              return;
            }
            dispatch(
              addBudget({
                name: budgetNameInput.current.value,
                budgetUsed: 0,
                budgetTotal: Number(budgetAmountInput.current.value),
              })
            );
            budgetNameInput.current.value = "";
            budgetAmountInput.current.value = "";
          }
        }}
      >
        Add Budget
      </button>
    </form>
  );
};

export default AddBudget;

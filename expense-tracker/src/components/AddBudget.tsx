import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addBudget } from "../store/slices/budgetSlice";

const AddBudget = () => {
  const budgetNameInput = useRef<HTMLInputElement>(null);
  const budgetAmountInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <input
          className="bg-neutral-100"
          ref={budgetNameInput}
          type="text"
          placeholder="Budget Name"
        ></input>
        <input
          className="bg-neutral-100"
          ref={budgetAmountInput}
          type="number"
          placeholder="Budget Amount"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (budgetNameInput.current !== null && budgetAmountInput.current !== null) {
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
    </div>
  );
};

export default AddBudget;

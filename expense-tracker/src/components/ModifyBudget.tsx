import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addBudgetUsed, changeBudgetLimit } from "../store/slices/budgetSlice";

const ModifyBudget = ({ budgetName }: { budgetName: string }) => {
  const budgetUsedInput = useRef<HTMLInputElement>(null);
  const newBudgetInput = useRef<HTMLInputElement>(null);

  const [budgetOperation, setBudgetOperation] = useState<string>("increase");

  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <input
          ref={budgetUsedInput}
          className="bg-neutral-100"
          type="number"
          placeholder="Budget Used"
        ></input>
        <label>Increase</label>
        <input
          name="budgetOperation"
          type="radio"
          defaultChecked
          onClick={() => {
            setBudgetOperation("increase");
          }}
        ></input>
        <label>Decrease</label>
        <input
          name="budgetOperation"
          type="radio"
          onClick={() => {
            setBudgetOperation("decrease");
          }}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (budgetUsedInput.current !== null && newBudgetInput !== null) {
              dispatch(
                addBudgetUsed({
                  name: budgetName,
                  amount:
                    budgetOperation === "increase"
                      ? Number(budgetUsedInput.current.value)
                      : -Number(budgetUsedInput.current.value),
                })
              );
              budgetUsedInput.current.value = "";
            }
          }}
        >
          Update Budget Used
        </button>
      </form>
      <form>
        <input
          className="bg-neutral-100"
          ref={newBudgetInput}
          placeholder="Change Budget"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (newBudgetInput.current !== null) {
              dispatch(
                changeBudgetLimit({
                  name: budgetName,
                  amount: Number(newBudgetInput.current.value),
                })
              );
              newBudgetInput.current.value = "";
            }
          }}
        >
          Update Budget
        </button>
      </form>
    </div>
  );
};

export default ModifyBudget;

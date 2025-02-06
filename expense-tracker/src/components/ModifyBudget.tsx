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
          className="w-full py-3 px-3 bg-neutral-100 border-2 border-neutral-200"
          type="number"
          placeholder="Budget Used"
        ></input>
        <div className="flex flex-wrap lg:justify-start justify-center gap-5 mt-5">
          <div className="flex items-center gap-3">
            <label>Increase</label>
            <input
              name="budgetOperation"
              type="radio"
              defaultChecked
              onClick={() => {
                setBudgetOperation("increase");
              }}
            ></input>
          </div>
          <div className="flex items-center gap-3">
            <label>Decrease</label>
            <input
              name="budgetOperation"
              type="radio"
              onClick={() => {
                setBudgetOperation("decrease");
              }}
            ></input>
          </div>
        </div>
        <button
          className="w-full mt-5 p-3 bg-cyan-900 text-white"
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
      <form className="mt-5">
        <input
          className="w-full py-3 px-3 bg-neutral-100 border-2 border-neutral-200"
          ref={newBudgetInput}
          placeholder="Change Budget"
        ></input>
        <button
          className="w-full mt-5 p-3 bg-cyan-900 text-white"
          onClick={(e) => {
            e.preventDefault();
            if (
              newBudgetInput.current !== null &&
              newBudgetInput.current.value !== ""
            ) {
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

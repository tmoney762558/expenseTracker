import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addGoalProgress, changeGoal } from "../store/slices/goalSlice";

const ModifyGoal = ({ goalName }: { goalName: string }) => {
  const goalProgressInput = useRef<HTMLInputElement>(null);
  const newGoalInput = useRef<HTMLInputElement>(null);

  const [goalOperation, setGoalOperation] = useState<string>("increase");

  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <input
          className="w-full py-3 px-3 bg-neutral-100 border-2 border-neutral-200"
          ref={goalProgressInput}
          type="number"
          placeholder="Goal Progress"
        />
        <div className="flex flex-wrap lg:justify-start justify-center gap-5 mt-5">
          <div className="flex items-center gap-3">
            <label>Increase</label>
            <input
              type="radio"
              name="goalOperation"
              defaultChecked
              onClick={() => {
                setGoalOperation("increase");
              }}
            />
          </div>
          <div className="flex items-cener gap-3">
            <label>Decrease</label>
            <input
              type="radio"
              name="goalOperation"
              onClick={() => {
                setGoalOperation("decrease");
              }}
            />
          </div>
        </div>
        <button
          className="w-full mt-5 p-3 bg-cyan-900 text-white"
          onClick={(e) => {
            e.preventDefault();
            if (goalProgressInput.current !== null) {
              dispatch(
                addGoalProgress({
                  name: goalName,
                  amount:
                    goalOperation === "increase"
                      ? Number(goalProgressInput.current.value)
                      : -Number(goalProgressInput.current.value),
                })
              );
              goalProgressInput.current.value = "";
            }
          }}
        >
          Modify Goal
        </button>
      </form>
      <form className="mt-5">
        <input
          className="w-full py-3 px-3 bg-neutral-100 border-2 border-neutral-200"
          ref={newGoalInput}
          type="number"
          placeholder="Change Goal"
        ></input>
        <button
          className="w-full mt-5 p-3 bg-cyan-900 text-white"
          onClick={(e) => {
            e.preventDefault();
            if (newGoalInput.current !== null && newGoalInput.current.value !== "") {
              dispatch(
                changeGoal({
                  name: goalName,
                  amount: Number(newGoalInput.current.value),
                })
              );
              newGoalInput.current.value = "";
            }
          }}
        >
          Update Goal
        </button>
      </form>
    </div>
  );
};

export default ModifyGoal;

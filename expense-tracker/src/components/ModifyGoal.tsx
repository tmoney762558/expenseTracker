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
          ref={goalProgressInput}
          type="number"
          placeholder="Goal Progress"
        />
        <label>Increase</label>
        <input
          type="radio"
          name="goalOperation"
          defaultChecked
          onClick={() => {
            setGoalOperation("increase");
          }}
        />
        <label>Decrease</label>
        <input
          type="radio"
          name="goalOperation"
          onClick={() => {
            setGoalOperation("decrease");
          }}
        />
        <button
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
      <form>
        <input
          ref={newGoalInput}
          type="number"
          placeholder="Change Goal"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (newGoalInput.current !== null) {
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

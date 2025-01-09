import { useDispatch } from "react-redux";
import { addGoal } from "../store/slices/goalSlice";
import { useRef } from "react";

const AddGoal = () => {
  const goalNameInput = useRef<HTMLInputElement>(null);
  const goalAmountInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <input
          className="bg-neutral-100"
          ref={goalNameInput}
          type="text"
          placeholder="Goal Name"
        ></input>
        <input
          className="bg-neutral-100"
          ref={goalAmountInput}
          type="number"
          placeholder="Goal Amount"
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (goalNameInput.current && goalAmountInput.current !== null) {
              if (goalNameInput.current.value === "" || goalAmountInput.current.value === "") {
                alert("Please fill out all fields.");
                return;
              }
              dispatch(
                addGoal({
                  name: goalNameInput.current.value,
                  goalProgress: 0,
                  goalTotal: Number(goalAmountInput.current.value),
                })
              );
              goalNameInput.current.value = "";
              goalAmountInput.current.value = "";
            }
          }}
        >
          Add Goal
        </button>
      </form>
    </div>
  );
};

export default AddGoal;

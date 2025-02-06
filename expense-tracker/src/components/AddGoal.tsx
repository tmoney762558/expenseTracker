import { useDispatch } from "react-redux";
import { addGoal } from "../store/slices/goalSlice";
import { useRef } from "react";

const AddGoal = () => {
  const goalNameInput = useRef<HTMLInputElement>(null);
  const goalAmountInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  return (
    <form className="flex flex-col items-center w-full mt-10 mb-5">
      <div className="flex flex-col items-center gap-5 w-full">
        <input
          className="w-full max-w-[25rem] py-1 px-2 bg-neutral-200 border-neutral-300 border-2 outline-none"
          ref={goalNameInput}
          type="text"
          placeholder="Goal Name"
        ></input>
        <input
          className="w-full max-w-[25rem] py-1 px-2 bg-neutral-200 border-neutral-300 border-2 outline-none"
          ref={goalAmountInput}
          type="number"
          placeholder="Goal Amount"
        ></input>
      </div>
      <button
        className="w-full max-w-[25rem] mt-5 py-1 bg-cyan-900 text-white"
        onClick={(e) => {
          e.preventDefault();
          if (goalNameInput.current && goalAmountInput.current !== null) {
            if (
              goalNameInput.current.value === "" ||
              goalAmountInput.current.value === ""
            ) {
              alert("Please fill out all fields.");
              return;
            }
            dispatch(
              addGoal({
                name: goalNameInput.current.value,
                goalProgress: 0,
                goalTotal: Number(goalAmountInput.current.value),
                goalPercentage: 0,
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
  );
};

export default AddGoal;

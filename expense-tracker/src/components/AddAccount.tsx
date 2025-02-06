import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../store/slices/accountsSlice.ts";

const AddAccount = () => {
  const accountNameInput = useRef<HTMLInputElement>(null);
  const accountBalanceInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState<string>("");

  return (
    <form className="flex flex-col items-center w-full mt-10 mb-5">
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex flex-col items-center gap-5 w-full">
          <input
            className="w-full max-w-[25rem] py-1 px-2 bg-neutral-200 border-neutral-300 border-2 outline-none"
            ref={accountNameInput}
            type="text"
            placeholder="Account Name"
          />
          <input
            className="w-full max-w-[25rem] py-1 px-2 bg-neutral-200 border-neutral-300 border-2 outline-none"
            ref={accountBalanceInput}
            type="number"
            placeholder="Initial Balance"
          />
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <label>Checking</label>
            <input
              name="accountType"
              type="radio"
              onClick={() => {
                setAccountType("checking");
              }}
            ></input>
          </div>
          <div className="flex items-center gap-2">
            <label>Savings</label>
            <input
              name="accountType"
              type="radio"
              onClick={() => {
                setAccountType("savings");
              }}
            ></input>
          </div>
          <div className="flex items-center gap-2">
            <label>Credit Card</label>
            <input
              name="accountType"
              type="radio"
              onClick={() => {
                setAccountType("credit card");
              }}
            ></input>
          </div>
        </div>
      </div>
      <button
        className="w-full max-w-[25rem] mt-5 py-1 bg-cyan-900 text-white"
        onClick={(e) => {
          e.preventDefault();
          if (
            accountNameInput.current !== null &&
            accountBalanceInput.current !== null
          ) {
            if (
              accountNameInput.current.value === "" ||
              accountBalanceInput.current.value === ""
            ) {
              alert("Please fill out all fields.");
              return;
            } else if (accountType === "") {
              alert("Please select an account type.");
              return;
            }
            dispatch(
              addAccount({
                accountType: accountType,
                name: accountNameInput.current.value,
                initialBalance: Number(accountBalanceInput.current.value),
                balance: Number(accountBalanceInput.current.value),
                transactions: [],
              })
            );
            accountNameInput.current.value = "";
            accountBalanceInput.current.value = "";
          }
        }}
      >
        Add Account
      </button>
    </form>
  );
};

export default AddAccount;

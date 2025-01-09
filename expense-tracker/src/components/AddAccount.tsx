import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../store/slices/accountsSlice.ts";

const AddAccount = () => {
  const accountNameInput = useRef<HTMLInputElement>(null);
  const accountBalanceInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState<string>("");

  return (
    <div>
      <form>
        <input
          ref={accountNameInput}
          className="bg-neutral-100"
          type="text"
          placeholder="Account Name"
        />
        <input
          ref={accountBalanceInput}
          className="bg-neutral-100"
          type="number"
          placeholder="Initial Balance"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (accountNameInput.current !== null && accountBalanceInput.current !== null) {
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
        <div>
          <label>Checking</label>
          <input
            name="accountType"
            type="radio"
            onClick={() => {
              setAccountType("checking");
            }}
          ></input>
          <label>Savings</label>
          <input
            name="accountType"
            type="radio"
            onClick={() => {
              setAccountType("savings");
            }}
          ></input>
          <label>Credit Card</label>
          <input
            name="accountType"
            type="radio"
            onClick={() => {
              setAccountType("creditCard");
            }}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;
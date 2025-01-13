import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/slices/accountsSlice";

interface AddTransactionTypes {
  accountName: string;
}

const AddTransaction = ({ accountName }: AddTransactionTypes) => {
  const dispatch = useDispatch();

  const transactionNameInput = useRef<HTMLInputElement>(null);
  const transactionAmountInput = useRef<HTMLInputElement>(null);

  const [transactionType, setTransactionType] = useState<string>("");

  return (
        <form className="flex flex-col items-center w-full mt-10 mb-5">
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex justify-center gap-5 w-full">
            <input
              className="w-full max-w-[11.75rem] py-1 px-2 rounded-lg bg-neutral-200 border-neutral-300 border-2 outline-none"
              ref={transactionNameInput}
              type="text"
              placeholder="Transaction Name"
            ></input>
            <input
              className="w-full max-w-[11.75rem] py-1 px-2 rounded-lg bg-neutral-200 border-neutral-300 border-2 outline-none"
              ref={transactionAmountInput}
              type="number"
              placeholder="Transaction Amount"
            ></input>
            </div>
            <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <label>Income</label>
              <input
                type="radio"
                name="transactionType"
                value="income"
                onClick={() => {
                  setTransactionType("income");
                }}
              ></input>
            </div>
            <div className="flex items-center gap-2">
              <label>Expense</label>
              <input
                type="radio"
                name="transactionType"
                value="expense"
                onClick={() => {
                  setTransactionType("expense");
                }}
              ></input>
              </div>
            </div>
          </div>
          <button
            className="w-full max-w-[25rem] mt-5 py-1 rounded-lg bg-purple-700 text-white"
            onClick={(e) => {
              e.preventDefault();
              if (
                transactionNameInput.current !== null &&
                transactionAmountInput.current !== null
              ) {
                if (
                  transactionNameInput.current.value === "" ||
                  transactionAmountInput.current.value === ""
                ) {
                  alert("Please fill out all fields.");
                  return;
                } else if (transactionType === "") {
                  alert("Please select a transaction type.");
                  return;
                }
                dispatch(
                  addTransaction({
                    name: accountName,
                    transaction: {
                      id: Date.now(),
                      name: transactionNameInput.current.value,
                      amount:
                        transactionType === "income"
                          ? Number(transactionAmountInput.current.value)
                          : -Number(transactionAmountInput.current.value),
                    },
                  })
                );
                transactionNameInput.current.value = "";
                transactionAmountInput.current.value = "";
              }
            }}
          >
            Add Transaction
          </button>
        </form>
  );
};

export default AddTransaction;

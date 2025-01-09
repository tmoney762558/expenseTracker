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
    <div>
      <div>
        <form>
          <input
            className="bg-neutral-100"
            ref={transactionNameInput}
            type="text"
            placeholder="Transaction Name"
          ></input>
          <input
            className="bg-neutral-100"
            ref={transactionAmountInput}
            type="number"
            placeholder="Transaction Amount"
          ></input>
          <label>Income</label>
          <input
            type="radio"
            name="transactionType"
            value="income"
            onClick={() => {
              setTransactionType("income");
            }}
          ></input>
          <label>Expense</label>
          <input
            type="radio"
            name="transactionType"
            value="expense"
            onClick={() => {
              setTransactionType("expense");
            }}
          ></input>
          <button
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
      </div>
    </div>
  );
};

export default AddTransaction;

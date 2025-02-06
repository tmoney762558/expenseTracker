import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/slices/accountsSlice";
import { addToRecents } from "../store/slices/recentTransactionsSlice";
import { RootState } from "../store";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  accountType: string;
  transactionType: string;
  transactionDate: string;
}

interface Account {
  accountType: string;
  name: string;
  initialBalance: number;
  balance: number;
  transactions: Transaction[];
}

interface AddTransactionTypes {
  accountName: string;
}

const AddTransaction = ({ accountName }: AddTransactionTypes) => {
  const dispatch = useDispatch();

  const transactionNameInput = useRef<HTMLInputElement>(null);
  const transactionAmountInput = useRef<HTMLInputElement>(null);

  const [transactionType, setTransactionType] = useState<string>("");
  const currentAccount = useSelector((state: RootState) =>
    state.accounts.accounts.find((acc: Account) => acc.name === accountName)
  );

  return (
    <form className="flex flex-col items-center w-full mt-10 mb-5">
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex flex-col items-center gap-5 w-full">
          <input
            className="w-full max-w-[25rem] py-1 px-2 bg-neutral-200 border-neutral-300 border-2 outline-none"
            ref={transactionNameInput}
            type="text"
            placeholder="Transaction Name"
          ></input>
          <input
            className="w-full max-w-[25rem] py-1 px-2 bg-neutral-200 border-neutral-300 border-2 outline-none"
            ref={transactionAmountInput}
            type="number"
            placeholder="Transaction Amount"
          ></input>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <label>
              {currentAccount && currentAccount.accountType === "credit card"
                ? "Payment"
                : "Income"}
            </label>
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
        className="w-full max-w-[25rem] mt-5 py-1 bg-cyan-900 text-white"
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
            const payload = {
              name: accountName,
              transaction: {
                id: Date.now(),
                name: transactionNameInput.current.value,
                amount:
                  (transactionType === "income" &&
                    currentAccount &&
                    currentAccount.accountType !== "credit card") ||
                  (transactionType === "expense" &&
                    currentAccount &&
                    currentAccount.accountType === "credit card")
                    ? Number(transactionAmountInput.current.value)
                    : -Number(transactionAmountInput.current.value),
                accountType: currentAccount ? currentAccount.accountType : "",
                transactionType: transactionType,
                transactionDate: new Date().toLocaleDateString(),
              },
            };
            dispatch(addTransaction(payload));
            dispatch(addToRecents(payload));
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

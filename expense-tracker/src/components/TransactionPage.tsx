import { AddTransaction, SideNav } from "./";
import { IoArrowBack, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeTransaction } from "../store/slices/accountsSlice";
import { NavLink, useParams } from "react-router-dom";
import { RootState } from "../store";

interface Transaction {
  id: number;
  name: string;
  amount: number;
}

interface Account {
  accountType: string;
  name: string;
  initialBalance: number;
  balance: number;
  transactions: Transaction[];
}

const TransactionPage = () => {
  const dispatch = useDispatch();

  const { accountName } = useParams<{ accountName: string }>();
  const account = useSelector((state: RootState) =>
    state.accounts.accounts.find((acc: Account) => acc.name === accountName)
  );

  if (!account) {
    return (
      <div>
        <p>Account not found.</p>
      </div>
    );
  }

  return (
    <div className="flex bg-neutral-100">
      <SideNav></SideNav>
      <div className="flex flex-col items-center relative w-full">
        <NavLink to="/accounts">
          <button className="absolute left-5 top-5 p-2 rounded-full bg-purple-700 text-white">
            <IoArrowBack fontSize={"1.2rem"}></IoArrowBack>
          </button>
        </NavLink>
        <AddTransaction accountName={account.name}></AddTransaction>
        <h3>Transactions</h3>
        <div className="flex flex-col items-center gap-5 w-full mt-5">
          {account.transactions.map((transaction, index) => (
            <div
              className="flex justify-between items-center w-full max-w-[25rem] py-5 px-5 rounded-lg bg-white border-neutral-300 border-2"
              key={index}
            >
              <h4>Name: {transaction.name}</h4>
              <h4>Balance: ${transaction.amount}</h4>
              <IoCloseOutline
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    removeTransaction({
                      accountName: account.name,
                      transactionId: transaction.id,
                    })
                  );
                }}
                fontSize={"1.2rem"}
              ></IoCloseOutline>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;

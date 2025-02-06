import { AddTransaction, SideNav } from "./";
import { IoArrowBack, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeTransaction } from "../store/slices/accountsSlice";
import { removeFromRecents } from "../store/slices/recentTransactionsSlice";
import { NavLink, useParams } from "react-router-dom";
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

const TransactionPage = () => {
  const dispatch = useDispatch();

  const { accountName } = useParams<{ accountName: string }>();
  const account = useSelector((state: RootState) =>
    state.accounts.accounts.find((acc: Account) => acc.name === accountName)
  );

  if (!account) {
    return (
      <div className="flex">
        <SideNav></SideNav>
        <div className="flex justify-center w-full mt-10">
          <p className="text-2xl">Account not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen bg-neutral-100">
      <SideNav></SideNav>
      <div className="flex flex-col items-center relative w-full mt-10 text-elipse">
        <h2 className="max-w-[25rem] text-2xl font-bold text-elipse">
          {accountName}
        </h2>
        <NavLink to="/accounts">
          <button className="absolute left-5 top-0 p-2 rounded-full bg-cyan-950 text-white">
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
              <h4 className="text-elipse max-w-[10rem]">
                Name: {transaction.name}
              </h4>
              <h4 className="text-elipse">Amount: ${transaction.amount}</h4>
              <IoCloseOutline
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    removeTransaction({
                      accountName: account.name,
                      transactionId: transaction.id,
                    })
                  );
                  dispatch(
                    removeFromRecents({
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

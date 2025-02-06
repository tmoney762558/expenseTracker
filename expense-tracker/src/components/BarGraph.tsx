import { DropdownMenu } from "./";

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

const BarGraph = ({
  accounts,
  currentAccount,
  setCurrentAccount,
}: {
  accounts: Account[];
  currentAccount: Account;
  setCurrentAccount: React.Dispatch<React.SetStateAction<Account>>;
}) => {
  const getMaxAmount = () => {
    let maxAmount = 0;
    currentAccount.transactions.forEach((transaction) => {
      if (transaction.amount > maxAmount) {
        maxAmount = transaction.amount;
      }
    });
    return maxAmount;
  };
  const getMinAmount = () => {
    let minAmount = 0;
    currentAccount.transactions.forEach((transaction) => {
      if (transaction.amount < minAmount) {
        minAmount = transaction.amount;
      }
    });
    return minAmount;
  };
  return (
    <div className="flex flex-col row-span-2 col-span-3 p-5 border-2 border-neutral-300 rounded-lg bg-white">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-blue-700">
          Transaction Trends (
          {currentAccount ? currentAccount.name : "No Account Selected"})
        </h2>
        <DropdownMenu
          dropdownItems={
            accounts.length > 0
              ? accounts.map((account) => {
                  return {
                    title: account.name,
                    onClick: () => setCurrentAccount(account),
                    link: "",
                  };
                })
              : [
                  {
                    title: "No Accounts Avaliable",
                    onClick: () => {
                      alert("Please add an account.");
                    },
                  },
                ]
          }
        ></DropdownMenu>
      </div>
      <div>
        <p className="text-lg font-semibold text-green-700">
          Largest Income:{" "}
          {currentAccount && currentAccount.transactions.length > 0
            ? "$" + getMaxAmount()
            : "None"}
        </p>
        <p className="text-lg font-semibold text-red-700">
          Largest Expense:{" "}
          {currentAccount && currentAccount.transactions.length > 0
            ? "$" + getMinAmount()
            : "None"}
        </p>
      </div>
      <div className="flex items-end gap-3 w-full h-full p-5 border-2 border-neutral-300 rounded-lg overflow-x-scroll">
        {currentAccount && currentAccount.transactions.length > 0 ? (
          currentAccount.transactions.map((transaction, index) => (
            <div
              className="flex flex-col justify-end items-center gap-2 h-full"
              key={index}
            >
              <p
                className={`font-bold ${
                  transaction.amount === 0
                    ? "text-neutral-300"
                    : transaction.amount > 0
                    ? "text-blue-700"
                    : "text-red-700"
                }`}
              >
                ${transaction.amount}
              </p>
              <span
                className={`w-5 min-h-1 ${
                  transaction.amount === 0
                    ? "bg-neutral-300"
                    : transaction.amount > 0
                    ? "bg-blue-700"
                    : "bg-red-700"
                } rounded-t-full`}
                style={{
                  height: `${
                    (Math.abs(transaction.amount) /
                      Math.max(
                        Math.abs(getMaxAmount()),
                        Math.abs(getMinAmount())
                      )) *
                    100
                  }%`,
                }}
              ></span>
              <p className="font-bold text-blue-700">
                {transaction.transactionDate}
              </p>
            </div>
          ))
        ) : (
          <p>No Transactions</p>
        )}
      </div>
    </div>
  );
};

export default BarGraph;

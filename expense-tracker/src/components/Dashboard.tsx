import { RootState } from "../store";
import { SideNav, CircleProgress, BarGraph } from "./";
import { useSelector } from "react-redux";
import {
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";

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

const Dashboard = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const goals = useSelector((state: RootState) => state.goals.goals);
  const budgets = useSelector((state: RootState) => state.budgets.budgets);
  const recentTransactions = useSelector(
    (state: RootState) => state.recentTransactions.recentTransactions
  );

  const [currentAccount, setCurrentAccount] = useState<Account>(accounts[0]);

  return (
    <div className="flex w-full h-full min-h-screen bg-slate-100">
      <SideNav></SideNav>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col items-center w-full max-w-[100rem] lg:px-5 px-3 py-5">
          <div className="flex lg:flex-row flex-col items-center gap-1 text-blue-900">
            <CiBadgeDollar fontSize={"2.5rem"}></CiBadgeDollar>
            <h1 className="text-center text-4xl font-bold font-mono">
              eXpensify Dashboard
            </h1>
          </div>
          <div className="grid lg:grid-rows-4 grid-rows-2 grid-cols-4 gap-3 w-full mt-7">
            <div className="grid row-span-1 grid-rows-1 grid-cols-4 col-span-4 gap-3">
              {accounts.map((account, index) =>
                index < 4 ? (
                  <div
                    key={index}
                    className={`${index === 1 ? "md:block hidden" : ""} ${
                      index === 3 || index === 4 ? "lg:block hidden" : ""
                    } flex flex-col row-span-1 2xl:col-span-1 md:col-span-2 col-span-4 p-5 rounded-lg bg-white border-2 border-neutral-300 shadow-md`}
                  >
                    <h3 className="text-3xl font-bold text-blue-900 text-elipse">
                      ${account.balance}
                    </h3>
                    <h3 className="text-lg font-semibold text-blue-800 text-elipse">
                      {account.accountType.toUpperCase()}: {account.name}
                    </h3>
                    <div className="flex items-end gap-2 h-full">
                      <p text-elipse>
                        Last Transaction:{" "}
                        {account.transactions[account.transactions.length - 1]
                          ? "$" +
                            account.transactions[
                              account.transactions.length - 1
                            ].amount
                          : "None"}
                      </p>
                      {account.transactions[account.transactions.length - 1] ? (
                        account.transactions[account.transactions.length - 1]
                          .transactionType === "income" ? (
                          <FaArrowCircleUp
                            fill="green"
                            fontSize={"1.2rem"}
                          ></FaArrowCircleUp>
                        ) : (
                          <FaArrowCircleDown
                            fill="red"
                            fontSize={"1.2rem"}
                          ></FaArrowCircleDown>
                        )
                      ) : null}
                    </div>
                  </div>
                ) : null
              )}
              {!accounts[0] ? (
                <div className="flex flex-col row-span-1 2xl:col-span-1 md:col-span-2 col-span-4 p-5 rounded-lg bg-white border-2 border-neutral-300 shadow-md">
                  <h3 className="text-3xl font-bold text-blue-900">$0.00</h3>
                  <h3 className="text-lg font-semibold text-blue-800">
                    CHECKING: 1
                  </h3>
                  <div className="flex flex-grow items-end gap-2">
                    <p>Last Transaction: None</p>
                  </div>
                </div>
              ) : null}
              {!accounts[1] ? (
                <div className="md:flex flex-col hidden row-span-1 2xl:col-span-1 col-span-2 p-5 rounded-lg bg-white border-2 border-neutral-300 shadow-md">
                  <h3 className="text-3xl font-bold text-blue-900">$0.00</h3>
                  <h3 className="text-lg font-semibold text-blue-800">
                    CHECKING: 2
                  </h3>
                  <div className="flex flex-grow items-end gap-2">
                    <p>Last Transaction: None</p>
                  </div>
                </div>
              ) : null}
              {!accounts[2] ? (
                <div className="2xl:flex flex-col hidden row-span-1 col-span-1 p-5 rounded-lg bg-white border-2 border-neutral-300 shadow-md">
                  <h3 className="text-3xl font-bold text-blue-900">$0.00</h3>
                  <h3 className="text-lg font-semibold text-blue-800">
                    CHECKING: 3
                  </h3>
                  <div className="flex flex-grow items-end gap-2">
                    <p>Last Transaction: None</p>
                  </div>
                </div>
              ) : null}
              {!accounts[3] ? (
                <div className="2xl:flex flex-col hidden row-span-1 col-span-1 p-5 rounded-lg bg-white border-2 border-neutral-300 shadow-md">
                  <h3 className="text-3xl font-bold text-blue-900">$0.00</h3>
                  <h3 className="text-lg font-semibold text-blue-800">
                    CHECKING: 4
                  </h3>
                  <div className="flex flex-grow items-end gap-2">
                    <p>Last Transaction: None</p>
                  </div>
                </div>
              ) : null}
            </div>
            <BarGraph
              accounts={accounts}
              currentAccount={currentAccount}
              setCurrentAccount={setCurrentAccount}
            ></BarGraph>
            <div className="lg:flex hidden flex-col items-center row-span-2 2xl:col-span-1 col-span-2 p-5 bg-white border-2 border-neutral-300 rounded-lg shadow-lg overflow-y-scroll">
              <h2 className="text-lg font-bold text-blue-900">
                {new Date().toLocaleDateString()}
              </h2>
              <span className="my-4 w-full h-[3px] rounded-full bg-neutral-300"></span>
              <div className="flex flex-col items-center w-full">
                {recentTransactions.map((transaction, index) => (
                  <div
                    className="flex justify-start items-center gap-5 w-full"
                    key={index}
                  >
                    <div className="p-1 rounded-lg bg-slate-200 border-[1px] border-black">
                      {transaction.transactionType === "income" ? (
                        <FaArrowUp fill="green" fontSize={"1.5rem"}></FaArrowUp>
                      ) : (
                        <FaArrowDown
                          fill="red"
                          fontSize={"1.5rem"}
                        ></FaArrowDown>
                      )}
                    </div>
                    <div className="max-w-[10rem]">
                      <h3 className="text-lg font-bold text-blue-800 text-elipse">
                        {transaction.name}
                      </h3>
                      <h4 className="text-md text-black text-elipse">
                        {transaction.transactionType === "income"
                          ? transaction.accountType !== "credit card"
                            ? "Income: +"
                            : "Payment: +"
                          : "Expense: -"}
                        ${Math.abs(transaction.amount)}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {!budgets[0] ? (
              <div className="row-span-1 lg:col-span-2 col-span-4 p-10 rounded-lg border-2 border-neutral-300 bg-white shadow-md">
                <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center gap-5 mt-10">
                  <CircleProgress percentage={0}></CircleProgress>
                  <div>
                    <h3 className="text-center text-xl font-bold">Budget 1</h3>
                    <h4 className="max-w-[10rem] text-center text-lg text-blue-500 font-semibold">
                      Budget Used: $0 / $ 0
                    </h4>
                  </div>
                </div>
              </div>
            ) : null}
            {budgets.map((budget, index) =>
              index < 1 ? (
                <div
                  className="row-span-1 lg:col-span-2 col-span-4 p-10 rounded-lg border-2 border-neutral-300 bg-white shadow-md"
                  key={index}
                >
                  <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center gap-5 mt-10">
                    <CircleProgress
                      percentage={budget.budgetPercentage}
                    ></CircleProgress>
                    <div>
                      <h3 className="text-center text-xl font-bold">
                        {budget.name}
                      </h3>
                      <h4
                        className={`max-w-[10rem] text-center text-lg ${
                          budget.budgetUsed >= budget.budgetTotal
                            ? "text-red-500"
                            : "text-blue-500"
                        } font-semibold`}
                      >
                        Budget Used: ${budget.budgetUsed} / $
                        {budget.budgetTotal}
                      </h4>
                    </div>
                  </div>
                </div>
              ) : null
            )}
            {!goals[0] ? (
              <div className="row-span-1 lg:col-span-2 col-span-4 p-10 rounded-lg border-2 border-neutral-300 bg-white shadow-md">
                <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center gap-5 mt-10">
                  <CircleProgress percentage={0}></CircleProgress>
                  <div>
                    <h3 className="text-center text-xl font-bold">Goal 1</h3>
                    <h4 className="max-w-[10rem] text-center text-lg text-blue-500 font-semibold">
                      Goal Progress: $0 / $ 0
                    </h4>
                  </div>
                </div>
              </div>
            ) : null}
            {goals.map((goal, index) =>
              index < 1 ? (
                <div
                  className="row-span-1 lg:col-span-2 col-span-4 p-10 border-2 border-neutral-300 rounded-lg bg-white shadow-md"
                  key={index}
                >
                  <div className="flex lg:flex-row flex-col justify-center lg:items-start items-center gap-5 mt-10">
                    <CircleProgress
                      percentage={goal.goalPercentage}
                    ></CircleProgress>
                    <div>
                      <h3 className="text-center text-xl font-bold">
                        {goal.name}
                      </h3>
                      <h4
                        className={`max-w-[10rem] text-center text-lg ${
                          goal.goalProgress >= goal.goalTotal
                            ? "text-green-500"
                            : "text-blue-500"
                        } font-semibold`}
                      >
                        Goal Progress: ${goal.goalProgress} / ${goal.goalTotal}
                      </h4>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

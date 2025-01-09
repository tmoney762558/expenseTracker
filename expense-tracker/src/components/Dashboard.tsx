import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index.ts";
import {
  removeAccount,
  removeTransaction,
} from "../store/slices/accountsSlice.ts";
import { removeBudget } from "../store/slices/budgetSlice.ts";
import {
  AddAccount,
  AddTransaction,
  AddBudget,
  AddGoal,
  ModifyBudget,
  ModifyGoal,
} from "./";
import { IoCloseOutline } from "react-icons/io5";
import { removeGoal } from "../store/slices/goalSlice.ts";

const Dashboard = () => {
  const dailyChange = useSelector((state: RootState) =>
    state.dailyChange.value.toFixed(2)
  );
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const budgets = useSelector((state: RootState) => state.budgets.budgets);
  const goals = useSelector((state: RootState) => state.goals.goals);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Expense Tracker</h1>
      <h2>Daily Change {dailyChange}</h2>
      <AddAccount></AddAccount>
      {accounts.map((account, index1) => (
        <div key={index1}>
          <h3>{account.accountType}</h3>
          <h3>{account.name}</h3>
          <h3>{account.balance}</h3>
          <IoCloseOutline
            onClick={() => {
              dispatch(removeAccount(account));
            }}
          ></IoCloseOutline>
          <div>
            <AddTransaction accountName={account.name}></AddTransaction>
            <h3>Transactions</h3>
            <div>
              {account.transactions.map((transaction, index2) => (
                <div key={index2}>
                  <h4>{transaction.name}</h4>
                  <h4>{transaction.amount}</h4>
                  <IoCloseOutline
                    onClick={() => {
                      dispatch(
                        removeTransaction({
                          accountName: account.name,
                          transactionId: transaction.id,
                        })
                      );
                    }}
                  ></IoCloseOutline>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <AddBudget></AddBudget>
      {budgets.map((budget, index) => (
        <div key={index}>
          <h3>{budget.name}</h3>
          <h4>
            {budget.budgetUsed} / {budget.budgetTotal}
          </h4>
          <IoCloseOutline
            onClick={() => {
              dispatch(
                removeBudget({
                  name: budget.name,
                })
              );
            }}
          ></IoCloseOutline>
          <ModifyBudget budgetName={budget.name}></ModifyBudget>
        </div>
      ))}
      <AddGoal></AddGoal>
      {goals.map((goal, index) => (
        <div key={index}>
          <h3>{goal.name}</h3>
          <h4>
            {goal.goalProgress} / {goal.goalTotal}
          </h4>
          <IoCloseOutline
            onClick={() => {
              dispatch(removeGoal({ name: goal.name }));
            }}
          ></IoCloseOutline>
          <ModifyGoal goalName={goal.name}></ModifyGoal>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

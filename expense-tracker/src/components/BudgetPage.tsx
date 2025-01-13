import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import AddBudget from "./AddBudget";
import { IoCloseOutline } from "react-icons/io5";
import { removeBudget } from "../store/slices/budgetSlice";
import { ModifyBudget, SideNav } from "./";

const BudgetPage = () => {

  const budgets = useSelector((state: RootState) => state.budgets.budgets);

  const dispatch = useDispatch();

  return (
    <div className="flex bg-neutral-100">
      <SideNav></SideNav>
      {" "}
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
    </div>
  );
};

export default BudgetPage;

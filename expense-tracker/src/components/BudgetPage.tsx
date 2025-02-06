import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import AddBudget from "./AddBudget";
import { IoCloseOutline } from "react-icons/io5";
import { removeBudget } from "../store/slices/budgetSlice";
import { ModifyBudget, SideNav, CircleProgress } from "./";

const BudgetPage = () => {
  const budgets = useSelector((state: RootState) => state.budgets.budgets);

  const dispatch = useDispatch();

  return (
    <div className="flex items-start h-full min-h-screen bg-neutral-100">
      <SideNav></SideNav>
      <div className="flex flex-col items-center w-full mt-10 px-10 pb-10">
        <h2 className="text-2xl font-bold">Budgets</h2>
        <AddBudget></AddBudget>
        <div className="flex flex-col items-center gap-7 w-full mt-10">
        {budgets.map((budget, index) => (
          <div
            className="relative w-full max-w-[50rem] p-10 rounded-lg bg-white shadow-md"
            key={index}
          >
            <div className="flex lg:flex-row flex-col lg:justify-between justify-center lg:items-start items-center lg:gap-0 gap-5 mt-10">
              <div className="pt-5 text-elipse">
                <h3 className="lg:text-left text-center text-xl font-bold text-elipse">Name: {budget.name}</h3>
                <h4
                  className={`lg:text-left text-center text-lg ${
                    budget.budgetUsed >= budget.budgetTotal
                      ? "text-red-500"
                      : "text-blue-500"
                  } font-semibold text-elipse`}
                >
                  Budget Used: ${budget.budgetUsed} / ${budget.budgetTotal}
                </h4>
              </div>
              <CircleProgress
                percentage={budget.budgetPercentage}
              ></CircleProgress>
            </div>
            <div className="mt-10">
              <ModifyBudget budgetName={budget.name}></ModifyBudget>
            </div>
            <IoCloseOutline
              className="absolute top-5 right-5 cursor-pointer"
              fontSize={"1.7rem"}
              onClick={() => {
                dispatch(
                  removeBudget({
                    name: budget.name,
                  })
                );
              }}
            ></IoCloseOutline>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;

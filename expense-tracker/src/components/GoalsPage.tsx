import { useDispatch, useSelector } from "react-redux";
import { removeGoal } from "../store/slices/goalSlice";
import { SideNav, AddGoal, ModifyGoal, CircleProgress } from "./";
import { RootState } from "../store";
import { IoCloseOutline } from "react-icons/io5";

const GoalsPage = () => {
  const goals = useSelector((state: RootState) => state.goals.goals);

  const dispatch = useDispatch();

  return (
    <div className="flex w-full h-full min-h-screen bg-neutral-100">
      <SideNav></SideNav>
      <div className="flex flex-col items-center w-full mt-10 px-10 pb-10">
        <h2 className="text-2xl font-bold">Goals</h2>
        <AddGoal></AddGoal>
        <div className="flex flex-col items-center gap-7 w-full mt-10">
          {goals.map((goal, index) => (
            <div
              className="relative w-full max-w-[50rem] p-10 rounded-lg bg-white shadow-md"
              key={index}
            >
              <div className="flex lg:flex-row flex-col lg:justify-between justify-center lg:items-start items-center lg:gap-0 gap-5 mt-10">
                <div className="pt-5">
                  <h3 className="lg:text-left text-center text-xl font-bold text-elipse">
                    Goal: {goal.name}
                  </h3>
                  <h4
                    className={`lg:text-left text-center text-lg ${
                      goal.goalProgress >= goal.goalTotal
                        ? "text-green-500"
                        : "text-blue-500"
                    } font-semibold text-elipse`}
                  >
                    Goal Progress: ${goal.goalProgress} / ${goal.goalTotal}
                  </h4>
                </div>
                <CircleProgress
                  percentage={goal.goalPercentage}
                ></CircleProgress>
              </div>
              <div className="mt-10">
                <ModifyGoal goalName={goal.name}></ModifyGoal>
              </div>
              <IoCloseOutline
                className="absolute top-5 right-5 cursor-pointer"
                fontSize={"1.7rem"}
                onClick={() => {
                  dispatch(
                    removeGoal({
                      name: goal.name,
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

export default GoalsPage;

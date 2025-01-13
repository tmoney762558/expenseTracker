import { SideNav } from "./";

const Dashboard = () => {
  // const budgets = useSelector((state: RootState) => state.budgets.budgets);
  // const goals = useSelector((state: RootState) => state.goals.goals);

  return (
    <div className="flex relative w-full h-screen bg-slate-100">
      <SideNav></SideNav>
      <div className="px-10 py-5">

      </div>
    </div>
  );
};

export default Dashboard;

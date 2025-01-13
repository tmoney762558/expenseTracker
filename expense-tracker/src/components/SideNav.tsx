import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className='flex flex-col items-center w-fit min-h-screen py-5 bg-purple-800 text-white'>
        <h2 className='text-lg mb-5'>Expense Tracker</h2>
        <ul className='flex flex-col items-center text-center text-md'>
            <NavLink to={"/"} className='w-full py-3 px-10 hover:bg-purple-900 cursor-pointer'>Dashboard</NavLink>
            <NavLink to={"/accounts"} className='w-full py-3 px-10 hover:bg-purple-900 cursor-pointer'>Accounts</NavLink>
            <NavLink to={"/transactions/all"} className='w-full py-3 px-10 hover:bg-purple-900 cursor-pointer'>All Transactions</NavLink>
            <NavLink to={"/budgets"} className='w-full py-3 px-10 hover:bg-purple-900 cursor-pointer'>Budgets</NavLink>
            <NavLink to="/goals" className='w-full py-3 px-10 hover:bg-purple-900 cursor-pointer'>Goals</NavLink>
        </ul>
    </nav>
  )
}

export default SideNav
import { Dashboard, AccountPage, TransactionPage, BudgetPage, GoalsPage } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<AccountPage />} />
        <Route path="/transactions/:accountName" element={<TransactionPage />} />
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
    </Router>
  )
}

export default App
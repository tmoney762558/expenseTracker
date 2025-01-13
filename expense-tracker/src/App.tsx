import { Dashboard, AccountPage, TransactionPage, BudgetPage } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<AccountPage />} />
        <Route path="/transactions/:accountName" element={<TransactionPage />} />
        <Route path="/budgets" element={<BudgetPage />} />
      </Routes>
    </Router>
  )
}

export default App
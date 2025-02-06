import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./slices/accountsSlice";
import budgetReducer from "./slices/budgetSlice";
import goalReducer from "./slices/goalSlice";
import recentTransactionsReducer from "./slices/recentTransactionsSlice";

const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    budgets: budgetReducer,
    goals: goalReducer,
    recentTransactions: recentTransactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import dailyChangeReducer from './slices/dailyChangeSlice';
import accountsReducer from "./slices/accountsSlice";
import budgetReducer from "./slices/budgetSlice";
import goalReducer from "./slices/goalSlice";

const store = configureStore({
    reducer: {
        dailyChange: dailyChangeReducer,
        accounts: accountsReducer,
        budgets: budgetReducer,
        goals: goalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
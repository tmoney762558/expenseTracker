import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Budget {
  name: string;
  budgetUsed: number;
  budgetTotal: number;
}

interface BudgetState {
  budgets: Budget[];
}

const initialState: BudgetState = {
  budgets: [],
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (
      state: BudgetState,
      action: PayloadAction<{
        name: string;
        budgetUsed: number;
        budgetTotal: number;
      }>
    ): void => {
      if (state.budgets.find((budget) => budget.name === action.payload.name)) {
        alert("Budget already exists.");
        return;
      }
      state.budgets = [...state.budgets, action.payload];
    },
    removeBudget: (
      state: BudgetState,
      action: PayloadAction<{
        name: string;
      }>
    ): void => {
      state.budgets = state.budgets.filter(
        (budget) => budget.name !== action.payload.name
      );
    },
    addBudgetUsed: (
      state: BudgetState,
      action: PayloadAction<{
        name: string;
        amount: number;
      }>
    ): void => {
      const budgetToUpdate = state.budgets.find(
        (budget) => budget.name === action.payload.name
      );
      if (budgetToUpdate !== undefined) {
        budgetToUpdate.budgetUsed += action.payload.amount;
      }
    },
    changeBudgetLimit: (
      state: BudgetState,
      action: PayloadAction<{
        name: string;
        amount: number;
      }>
    ): void => {
      const budgetToUpdate = state.budgets.find(
        (budget) => budget.name === action.payload.name
      );
      if (budgetToUpdate !== undefined) {
        budgetToUpdate.budgetTotal = action.payload.amount;
      }
    },
  },
});

export const { addBudget, removeBudget, addBudgetUsed, changeBudgetLimit } = budgetSlice.actions;

export default budgetSlice.reducer;

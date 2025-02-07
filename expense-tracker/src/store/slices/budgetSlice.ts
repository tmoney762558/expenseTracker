import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Budget {
  name: string;
  budgetUsed: number;
  budgetTotal: number;
  budgetPercentage: number;
}

interface BudgetState {
  budgets: Budget[];
}

const initialState: BudgetState = {
  budgets: localStorage.getItem("budgets") ? JSON.parse(localStorage.getItem("budgets") as string) : [],
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
        budgetPercentage: number;
      }>
    ): void => {
      if (state.budgets.find((budget) => budget.name === action.payload.name)) {
        alert("Budget already exists.");
        return;
      }
      state.budgets = [...state.budgets, action.payload];
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
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
      localStorage.setItem("budgets", JSON.stringify(state.budgets));
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
        budgetToUpdate.budgetPercentage = Math.round(budgetToUpdate.budgetUsed / budgetToUpdate.budgetTotal * 100);
        budgetToUpdate.budgetPercentage = budgetToUpdate.budgetPercentage < 0 ? 0 : budgetToUpdate.budgetPercentage;
        localStorage.setItem("budgets", JSON.stringify(state.budgets));
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
        budgetToUpdate.budgetPercentage = Math.round(budgetToUpdate.budgetUsed / budgetToUpdate.budgetTotal * 100);
        budgetToUpdate.budgetPercentage = budgetToUpdate.budgetPercentage < 0 ? 0 : budgetToUpdate.budgetPercentage;
        localStorage.setItem("budgets", JSON.stringify(state.budgets));
      }
    },
  },
});

export const { addBudget, removeBudget, addBudgetUsed, changeBudgetLimit } = budgetSlice.actions;

export default budgetSlice.reducer;

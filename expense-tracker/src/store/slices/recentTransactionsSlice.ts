import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  accountType: string;
  transactionType: string;
  transactionDate: string;
}

interface RecentTransactionsState {
  recentTransactions: Transaction[];
}

const initialState: RecentTransactionsState = {
  recentTransactions: [],
};

const recentTransactionsSlice = createSlice({
  name: "recentTransactions",
  initialState,
  reducers: {
    addToRecents: (
      state: RecentTransactionsState,
      action: PayloadAction<{
        name?: string;
        transaction: Transaction;
      }>
    ) => {
      state.recentTransactions.unshift(action.payload.transaction);
      if (state.recentTransactions.length > 5) {
        state.recentTransactions.pop();
      }
    },
    removeFromRecents: (
      state: RecentTransactionsState,
      action: PayloadAction<{
        accountName: string;
        transactionId: number;
      }>
    ) => {
      state.recentTransactions = state.recentTransactions.filter(
        (transaction) => transaction.id !== action.payload.transactionId
      );
    },
  },
});

export const { addToRecents, removeFromRecents } =
  recentTransactionsSlice.actions;

export default recentTransactionsSlice.reducer;

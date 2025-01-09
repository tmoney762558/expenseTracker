import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
  name: string;
  amount: number;
}

interface Account {
  accountType: string;
  name: string;
  initialBalance: number;
  balance: number;
  transactions: Transaction[];
}

interface AccountsState {
  accounts: Account[];
}

const initialState: AccountsState = {
  accounts: [],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (
      // Add Accounts
      state: AccountsState,
      action: PayloadAction<{
        accountType: string;
        name: string;
        initialBalance: number;
        balance: number;
        transactions: Transaction[];
      }>
    ) => {
      if (
        // Alert and return if an account of the same name exists
        state.accounts.find((account) => account.name === action.payload.name)
      ) {
        alert("Account already exists.");
        return;
      }
      state.accounts = [...state.accounts, action.payload];
    },
    removeAccount: (
      // Remove Accounts
      state: AccountsState,
      action: PayloadAction<{
        name: string;
        balance: number;
        transactions: Transaction[];
      }>
    ): void => {
      state.accounts = state.accounts.filter(
        (account) => account.name !== action.payload.name
      );
    },
    addTransaction: (
      // Add Transactions
      state: AccountsState,
      action: PayloadAction<{
        name: string;
        transaction: Transaction;
      }>
    ): void => {
      const accountToChange = state.accounts.find(
        (account) => account.name === action.payload.name
      );
      if (accountToChange !== undefined) {
        accountToChange.transactions = [
          ...accountToChange.transactions,
          action.payload.transaction,
        ];
        accountToChange.balance += action.payload.transaction.amount;
      }
    },
    removeTransaction: (
      // Remove Transactions
      state: AccountsState,
      action: PayloadAction<{
        accountName: string;
        transactionId: number;
      }>
    ): void => {
      const accountToChange = state.accounts.find(
        (account) => account.name === action.payload.accountName
      );
      if (accountToChange !== undefined) {
        accountToChange.transactions = accountToChange.transactions.filter(
          (transaction) => transaction.id !== action.payload.transactionId
        );
        accountToChange.balance = accountToChange.transactions.reduce((acc, transaction) => acc + transaction.amount, accountToChange.initialBalance);
      }
    },
  },
});

export const { addAccount, removeAccount, addTransaction, removeTransaction } =
  accountsSlice.actions;

export default accountsSlice.reducer;
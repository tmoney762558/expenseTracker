import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Goal {
  name: string;
  goalProgress: number;
  goalTotal: number;
}

interface GoalState {
  goals: Goal[];
}

const initialState: GoalState = {
  goals: [],
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (
      state: GoalState,
      action: PayloadAction<{
        name: string;
        goalProgress: number;
        goalTotal: number;
      }>
    ): void => {
      if (state.goals.find((goal) => goal.name === action.payload.name)) {
        alert("Goal already exists.");
        return;
      }
      state.goals = [...state.goals, action.payload];
    },
    removeGoal: (
      state: GoalState,
      action: PayloadAction<{
        name: string;
      }>
    ): void => {
      state.goals = state.goals.filter(
        (goal) => goal.name !== action.payload.name
      );
    },
    addGoalProgress: (
      state: GoalState,
      action: PayloadAction<{
        name: string;
        amount: number;
      }>
    ): void => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.name === action.payload.name
      );
      if (goalToUpdate !== undefined) {
        goalToUpdate.goalProgress += action.payload.amount;
      }
    },
    changeGoal: (
      state: GoalState,
      action: PayloadAction<{
        name: string;
        amount: number;
      }>
    ):void => {
      const goalToUpdate = state.goals.find(
        (goal) => goal.name === action.payload.name
      );
      if (goalToUpdate !== undefined) {
        goalToUpdate.goalTotal = action.payload.amount;
      }
    }
  },
});

export const { addGoal, removeGoal, addGoalProgress, changeGoal } = goalSlice.actions;

export default goalSlice.reducer;

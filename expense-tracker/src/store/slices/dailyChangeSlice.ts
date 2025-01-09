import { createSlice } from "@reduxjs/toolkit";

interface DailyChangeState {
  value: number;
}

const initialState: DailyChangeState = {
  value: 0,
};

const dailyChangeSlice = createSlice({
  name: "dailyChange",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = dailyChangeSlice.actions;

export default dailyChangeSlice.reducer;
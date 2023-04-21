import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    navPath: null,
  },
  reducers: {
    navigatePath: (state, { payload }) => {
      state.navPath = payload;
    },
  },
});

export const { navigatePath } = studentSlice.actions;

export const studentSelector = (state) => state.student;
const studentReducer = studentSlice.reducer;
export default studentReducer;

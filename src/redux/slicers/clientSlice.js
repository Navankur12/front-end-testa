import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    navPath: null,
  },
  reducers: {
    navigatePath: (state, { payload }) => {
      state.navPath = payload;
    },
  },
});

export const { navigatePath } = clientSlice.actions;

export const clientSelector = (state) => state.client;
const clientReducer = clientSlice.reducer;
export default clientReducer;

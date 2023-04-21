import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    session: false,
    sessionData: {},
    navPath: null,
    notifiy: false,
    profileDropdown: false,
    access: {},
  },
  reducers: {
    sessionSuccess: (state, { payload }) => {
      state.sessionData = payload;
      state.session = true;
    },
    sessionFail: (state) => {
      state.session = false;
      state.sessionData = {};
    },
    navigatePath: (state, { payload }) => {
      state.navPath = payload;
    },
    notification: (state, { payload }) => {
      state.notifiy = payload;
    },
    setProfileDropdown: (state, { payload }) => {
      state.profileDropdown = payload;
    },
    setAccess: (state, { payload }) => {
      state.access = payload;
    },
  },
});

export const {
  navigatePath,
  notification,
  setProfileDropdown,
  setAccess,
  sessionSuccess,
  sessionFail,
} = activitySlice.actions;

export const activitySelector = (state) => state.activity;
const activityReducer = activitySlice.reducer;
export default activityReducer;

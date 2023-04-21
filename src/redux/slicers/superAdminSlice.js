import { createSlice } from "@reduxjs/toolkit";
import layoutConfig from "../../pages/superAdmin/dashboard/layoutConfig";
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    dashboardGridStyle: layoutConfig,
    basicDetail: {},
    assessmentDetail: [],
    assessmentStatistics: [],
    activeClientStatistics:{},
    notifications: [],
  },
  reducers: {
    getDashboardGridStyle: (state, { payload }) => {
      state.dashboardGridStyle = payload;
    },
    getSuperAdminBasicDetail: (state, { payload }) => {
      state.basicDetail = payload;
    },
    getAssessmentDetail: (state, { payload }) => {
      state.assessmentDetail = payload;
    },
    getAssessmentStatistics: (state, { payload }) => {
      state.assessmentStatistics = payload;
    },
    getActiveClientStatistics: (state, { payload }) => {
      state.activeClientStatistics = payload;
    },
    getNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
  },
});

export const {
   getDashboardGridStyle,
   getSuperAdminBasicDetail,
   getAssessmentDetail,
   getAssessmentStatistics,
   getActiveClientStatistics,
   getNotifications,
 } = superAdminSlice.actions;
 
export const superAdminSelector = (state) => state.superAdmin;
const superAdminReducer = superAdminSlice.reducer;

export default superAdminReducer;

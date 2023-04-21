import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {},
    stateLists: [],
    cityLists: [],
    organizationLists: [],
    userLists: [],
    totalPages: 0,
    totalCount: 0,
    paginate: {},
    subAdminLists: [],
    getQuestionBankList: [],
    getQuestionList: [],
    changeQuestionBankListStatus: {},
  },
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    getStateLists: (state, { payload }) => {
      state.stateLists = payload;
    },
    getCityLists: (state, { payload }) => {
      state.cityLists = payload;
    },
    getOrganizationLists: (state, { payload }) => {
      state.organizationLists = payload;
    },
    getUserLists: (state, { payload }) => {
      state.userLists = payload;
    },
    getTotalPages: (state, { payload }) => {
      state.totalPages = payload;
    },
    getCount: (state, { payload }) => {
      state.totalCount = payload;
    },
    getPagination: (state, { payload }) => {
      state.paginate = payload;
    },
    getSubAdminLists: (state, { payload }) => {
      state.subAdminLists = payload;
    },
    getQuestionBankList: (state, { payload }) => {
      state.getQuestionBankList = payload;
      // console.log("Payload", payload);
    },
    getQuestionList: (state, { payload }) => {
      state.getQuestionList = payload;
      // console.log("Payload",payload);
    },
    changeStatus: (state, { payload }) => {
      state.changeQuestionBankListStatus = payload;
      console.log("changeQuestionBankListStatus Payload",payload);
    },
  },
});

export const {
  setUserInfo,
  getStateLists,
  getCityLists,
  getOrganizationLists,
  getUserLists,
  getTotalPages,
  getCount,
  getSubAdminLists,
  getPagination,
  getQuestionBankList,
  getQuestionList,
  changeStatus
} = authSlice.actions;

export const authSelector = (state) => state.auth;
const authReducer = authSlice.reducer;
export default authReducer;

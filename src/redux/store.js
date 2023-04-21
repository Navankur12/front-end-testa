import { combineReducers, configureStore } from "@reduxjs/toolkit";
import guestReducer from "./slicers/guestSlice";
import authReducer from "./slicers/authSlice";
import clientReducer from "./slicers/clientSlice";
import employeeReducer from "./slicers/employeeSlice";
import studentReducer from "./slicers/studentSlice";
import activityReducer from "./slicers/activitySlice";
import superAdminReducer from "./slicers/superAdminSlice";

const rootReducer = combineReducers({
  guest: guestReducer,
  auth: authReducer,
  client: clientReducer,
  employee: employeeReducer,
  student: studentReducer,
  activity: activityReducer,
  superAdmin: superAdminReducer,
});

const store = configureStore({ reducer: rootReducer });
export default store;

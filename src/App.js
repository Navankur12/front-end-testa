import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LazyLoader from "./components/common/LazyLoader";
import { getRoutes } from "./config/routes";
import { authSelector, setUserInfo } from "./redux/slicers/authSlice";
import { getUserDetails } from "./utils/projectHelper";
import { USER_TYPE } from "./config/constants/projectConstant";
import ActivityContainer from "./container/Activity";

function App() {
  const { userInfo = {} } = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserInfo(getUserDetails()));
  }, []);

  const { userType = 6, isUserProfileCreated = false } = userInfo;

  const type = USER_TYPE.find((user) => user.id === userType)?.id;
  const routeType = isUserProfileCreated ? type : 6;
  const router = useRoutes(getRoutes(routeType));

  return (
    <>
      <ActivityContainer>
        <LazyLoader>{router}</LazyLoader>
        <ToastContainer />
      </ActivityContainer>
    </>
  );
}

export default App;

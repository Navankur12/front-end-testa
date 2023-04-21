import React, { useState } from "react";
import "./style.css";
import Logo from "../../../../../assets/images/common/logo.png";
import { ReactComponent as BellIcon } from "../../../../../assets/icons/bell-icon.svg";
import { ReactComponent as Setting } from "../../../../../assets/icons/setting.svg";
import { ReactComponent as LogOut } from "../../../../../assets/icons/logOut.svg";
import { ReactComponent as HelpIcon } from "../../../../../assets/icons/helpIcon.svg";
import { ReactComponent as DownArrow } from "../../../../../assets/icons/down-arrow.svg";
import profile from "../../../../../assets/images/common/profile.png";
import {
  capitalizeFunc,
  getUserType,
} from "../../../../../utils/projectHelper";
import { useNavigate } from "react-router-dom";
import {
  SUPER_ADMIN_DASHBOARD_PAGE,
  SUPER_ADMIN_MY_ACCOUNT_PAGE,
} from "../../../../../config/constants/routePathConstants";
import { logoutApi} from "../../../../../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  activitySelector,
  setProfileDropdown,
} from "../../../../../redux/slicers/activitySlice";
import { authSelector } from "../../../../../redux/slicers/authSlice";
import { useEffect } from "react";
import UserTour from "../UserTour/index";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileDropdown } = useSelector(activitySelector);
  const { userInfo = {} } = useSelector(authSelector);
  const { userType = 6, firstName = "", lastName = "" } = userInfo;

  console.log("userInfo",userInfo);
  const fullName = firstName + " " + lastName;

  const handleLogout = () => {
    logoutApi();
    dispatch(setProfileDropdown(false));
  };

  return (
    <>
      <UserTour userInfo={userInfo}/>
      <nav onClick={() => dispatch(setProfileDropdown(false))}>
        <div className="dashboard-nav">
          <div
            className="logo"
            onClick={() => navigate(SUPER_ADMIN_DASHBOARD_PAGE)}
          >
            <img src={Logo} alt="logo" />
          </div>
          <div className="right-nav">
            <BellIcon id="bell-icon" />
            <span style={{ display: "flex", }} id="admin-profile">
              <img
                src={profile}
                alt="profile"
                onClick={() => navigate(SUPER_ADMIN_MY_ACCOUNT_PAGE)}

              />
              <div className="dropdown" onClick={(e) => e.stopPropagation()} style={{ position: "relative", top: 10 }}>
                <p onClick={() => dispatch(setProfileDropdown(!profileDropdown))}>
                  {capitalizeFunc(fullName)}
                  <span>
                    <DownArrow />
                  </span>
                </p>
                <div
                  className="dropdown-options"
                  id="drop-down"
                  style={{ display: profileDropdown ? "block" : "none" }}
                >
                  {/* <div className="admin-online">
                </div> */}
                  <div className="option">
                    <p className="check-admin">{getUserType(userType)}</p>
                    <p>
                      <span>
                        <Setting />
                      </span>
                      Settings
                    </p>
                    <p>
                      <span>
                        <LogOut />
                      </span>
                      Help & support
                    </p>
                    <p onClick={handleLogout}>
                      <span>
                        <HelpIcon />
                      </span>
                      Log out
                    </p>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

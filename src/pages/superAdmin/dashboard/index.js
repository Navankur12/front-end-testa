import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import layoutConfig from "./layoutConfig";
import "react-grid-layout/css/styles.css";
import "./style.css";
import { capitalizeFunc } from "./../../../utils/projectHelper";
import { authSelector } from "../../../redux/slicers/authSlice";
import Notification from "./Notification";
import DashboardInfoCards from "./DashboardInfoCards";
import UpcomingAssignment from "./UpcomingAssignment";
import AssessmentStatistics from "./AssessmentStatistics";
import ClientStatistics from "./ClientStatistics";
import { ReactComponent as Arrow } from "../../../assets/icons/dropdown-arrow.svg";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more-icon.svg";
import {
  getDashboardGridStyleApi,
  postDashboardGridStyleApi,
} from "../../../api/superAdminApi";
import { superAdminSelector } from "../../../redux/slicers/superAdminSlice";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const { userInfo = {} } = useSelector(authSelector);
  const { dashboardGridStyle = layoutConfig } = useSelector(superAdminSelector);
  const dispatch = useDispatch();
  const { userType = 6, _id, firstName = "", lastName = "" } = userInfo;
  const fullName = firstName + " " + lastName;
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLayoutChange, setIsLayoutChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBreakPointChange = (breakpoint) => {
    // setState((pre) => ({ ...pre, currentBreakpoint: breakpoint }));
  };

  useEffect(() => {
    dispatch(getDashboardGridStyleApi(_id, setLoading));
  }, []);

  const handleLayoutChange = (layout, layouts) => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const formData = {
      id: _id,
      layout: layouts,
    };
    if(isLayoutChange) {
      dispatch(postDashboardGridStyleApi(formData, setLoading));
      setIsLayoutChange(false)
    }
  };

  const handleDragOrResize = () => {
    setIsLayoutChange(true)
  };
  
  return (
    <div className="main-content dashboard">
      <div className="dashboard-title">
        <h1>Welcome back, {capitalizeFunc(fullName)}</h1>
        <p>Dashboard Overview</p>
      </div>
      <DashboardInfoCards />

      <ResponsiveGridLayout
        className="layout"
        layouts={dashboardGridStyle}
        // layouts={layoutConfig}
        onBreakpointChange={handleBreakPointChange}
        onLayoutChange={(layout, layouts) =>
          handleLayoutChange(layout, layouts)
        }
        onDragStop={handleDragOrResize}
        onResizeStop={handleDragOrResize}
        isDraggable={true}
        compactType={"vertical"}
        isResizable={true}
        rowHeight={30}
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="AssessmentStatistics" className="box" style={{ zIndex: 1 }}>
          <AssessmentStatistics />
        </div>
        <div key="UpcomingAssignment" className="box">
          <UpcomingAssignment />
        </div>
        <div key="ClientStatistics" className="box">
          <ClientStatistics />
        </div>
        <div key="Notification" className="box">
          <Notification />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;

export const DropDown = ({ dropDown, setDropDown, clickHandler }) => {
  // close more option popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest(".select-dropdown-ul") === null) {
        setDropDown((pre)=>({...pre, open: false }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (value) => {
    setDropDown({ open: false, text: value });
    clickHandler && clickHandler();
  };

  return (
    <>
      <div
        className="select-type-dropdown"
        onClick={() => setDropDown((pre) => ({ ...pre, open: !dropDown.open }))}
      >
        <span>This {capitalizeFunc(dropDown.text)}</span>
        <Arrow
          style={{
            transform: dropDown.open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>
      <ul
        style={{ display: dropDown.open ? "block" : "none" }}
        className="select-dropdown-ul"
      >
        <li onClick={() => handleClick("week")}>This Week</li>
        <li onClick={() => handleClick("month")}>This Month</li>
        <li onClick={() => handleClick("year")}>This Year</li>
      </ul>
    </>
  );
};

export const ActionComp = ({ setOpen, open, handleRefresh, handleRemove }) => {
  // close more option popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest(".more-dropdown") === null) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="more-icon-wrapper">
      <MoreIcon onClick={() => setOpen(!open)} className="db-more-icon" />
      <ul
        className="more-dropdown"
        style={{ display: open ? "block" : "none" }}
      >
        <li onClick={handleRefresh}>
          <span>Refresh</span>
        </li>
        <li onClick={handleRemove}>
          <span>Remove</span>
        </li>
      </ul>
    </div>
  );
};

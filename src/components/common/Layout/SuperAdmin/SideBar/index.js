import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { ReactComponent as DashboardIcon } from "../../../../../assets/icons/DashboardIcon.svg";
import { ReactComponent as PlayButtonIcon } from "../../../../../assets/icons/playButtonIcon.svg";
import { ReactComponent as BookMarkIcon } from "../../../../../assets/icons/bookMark.svg";
import { ReactComponent as BookOpenIcon } from "../../../../../assets/icons/bookOpen.svg";
import { ReactComponent as ClipboardIcon } from "../../../../../assets/icons/clipboard.svg";
import { ReactComponent as FileTextIcon } from "../../../../../assets/icons/file-text.svg";
import { ReactComponent as MyAccountIcon } from "../../../../../assets/icons/my-account.svg";
import { ReactComponent as RolesPermissionIcon } from "../../../../../assets/icons/roles-permission-icon.svg";
import { ReactComponent as BillingIcon } from "../../../../../assets/icons/subscription-billing.svg";
import { ReactComponent as SettingsIcon } from "../../../../../assets/icons/settings-icon.svg";
import {
  SUPER_ADMIN_DASHBOARD_PAGE,
  SUPER_ADMIN_MY_ACCOUNT_PAGE,
  SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE,
  SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE,
  SUPER_ADMIN_USER_MANAGEMENT_PAGE,
  SUPER_ADMIN_QUESTION_LIST,
  SUPER_ADMIN_QUESTION_ADD,
  SUPER_ADMIN_QUESTION,
  SUPER_ADMIN_QUESTION_BANK_PAGE,
  SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE,
  SUPER_ADMIN_CREATE_QUESTION_BANK_FORM_PAGE,
} from "../../../../../config/constants/routePathConstants";

const SideBar = () => {
  const { pathname: PATH_NAME } = useLocation();

  const sidebarItems = [
    { label: "Dashboard", slug: "dashboard", icon: <DashboardIcon />, path: SUPER_ADMIN_DASHBOARD_PAGE, isActive: PATH_NAME === SUPER_ADMIN_DASHBOARD_PAGE },
    { label: "Client Management", slug: "client-management", icon: <PlayButtonIcon />, path: SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE, isActive: PATH_NAME === SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE || PATH_NAME === SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE },
    { label: "All Courses", slug: "all-courses", icon: <BookMarkIcon />, path: "/", isActive: false },
    { label: "Question Bank", slug: "question-bank", icon: <BookMarkIcon />, path: SUPER_ADMIN_QUESTION_BANK_PAGE, isActive: PATH_NAME === SUPER_ADMIN_QUESTION_BANK_PAGE || PATH_NAME === SUPER_ADMIN_CREATE_QUESTION_BANK_FORM_PAGE || PATH_NAME === SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE || PATH_NAME === SUPER_ADMIN_QUESTION_LIST || PATH_NAME === SUPER_ADMIN_QUESTION_ADD || PATH_NAME === SUPER_ADMIN_QUESTION},
    { label: "Assessment", slug: "assessment", icon: <BookOpenIcon />, path: "/", isActive: false },
    { label: "Assessment Result", slug: "assessment-result", icon: <ClipboardIcon />, path: "/", isActive: false },
    { label: "Roles & Permissions", slug: "role-and-permission", icon: <RolesPermissionIcon />, path: "/", isActive: false },
    { label: "Report & Analytics", slug: "report-and-analytics", icon: <FileTextIcon />, path: "/", isActive: false },
    { label: "Subscription Billing", slug: "subscription-billing", icon: <BillingIcon />, path: "/", isActive: false },
    { label: "User Management", slug: "user-management", icon: <FileTextIcon />, path: SUPER_ADMIN_USER_MANAGEMENT_PAGE, isActive: PATH_NAME === SUPER_ADMIN_USER_MANAGEMENT_PAGE },
    { label: "Settings", slug: "settings", icon: <SettingsIcon />, path: "/", isActive: false },
    { label: "My Account", slug: "my-account", icon: <MyAccountIcon />, path: SUPER_ADMIN_MY_ACCOUNT_PAGE, isActive: PATH_NAME === SUPER_ADMIN_MY_ACCOUNT_PAGE },
  ];

  return (
    <>
      <div className="dashboard-leftsidebar">
        <ul>
          {sidebarItems.map(({ label, icon, path, isActive, slug }) => (
            <li key={label} className={isActive ? "active" : ""} id={"menu-list-item-" + slug}>
              <Link to={path}>
                <span>{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;

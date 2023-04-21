import { lazy } from "react";
import { Outlet } from "react-router-dom";
import {
  SUPER_ADMIN_MY_ACCOUNT_PAGE,
  SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE,
  SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE,
  SUPER_ADMIN_USER_MANAGEMENT_PAGE,
  SUPER_ADMIN_QUESTION_LIST,
  SUPER_ADMIN_QUESTION_ADD,
  SUPER_ADMIN_QUESTION,
  SUPER_ADMIN_QUESTION_BANK_PAGE,
  SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE,
  SUPER_ADMIN_CREATE_QUESTION_BANK_FORM_PAGE
} from "./../constants/routePathConstants";
import SuperAdminLayout from "./../../components/common/Layout/SuperAdmin";

const Dashboard = lazy(() => import("../../pages/superAdmin/dashboard"));
const MyAccount = lazy(() => import("../../pages/superAdmin/myAccount"));
const SubAdmin = lazy(() => import("../../pages/superAdmin/subAdmin"));
const UserManagement = lazy(() => import("../../pages/superAdmin/userManagement"));
const SubAdminProfile = lazy(() =>
  import("../../pages/superAdmin/subAdmin/profile")
);
const QuestionList = lazy(() => import("../../pages/superAdmin/QuestionBankList"))
const QuestionAdd = lazy(() => import("../../pages/superAdmin/QuestionBankList/QuestionAdd"))
const Questions = lazy(() => import("../../pages/superAdmin/QuestionBankList/QuestionAdd/Questions"))
const QuestionBankHome = lazy(()=> import("../../pages/superAdmin/questionBank"));
const CreateQuestionBank = lazy(()=> import ("../../pages/superAdmin/questionBank/createQuestionBank"))
const CreateQuestionForm = lazy(()=> import("../../pages/superAdmin/questionBank/createQuestionBank/addNew"))


const clientRoutes = [
  {
    path: "/",
    element: <SuperAdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: SUPER_ADMIN_MY_ACCOUNT_PAGE,
        element: <MyAccount />,
      },
      {
        path: SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE,
        element: <SubAdmin />,
      },
      {
        path: SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE,
        element: <SubAdminProfile />,
      },
      {
        path: SUPER_ADMIN_USER_MANAGEMENT_PAGE,
        element: <UserManagement />,
      },
      {
        path: SUPER_ADMIN_QUESTION_LIST,
        element: <QuestionList />,
      },
      {
        path: SUPER_ADMIN_QUESTION_ADD,
        element: <QuestionAdd />
      },
      {
        path: SUPER_ADMIN_QUESTION,
        element: <Questions />
      },
      {
        path : SUPER_ADMIN_QUESTION_BANK_PAGE,
        element : <QuestionBankHome />
      },
      {
        path : SUPER_ADMIN_CREATE_QUESTION_BANK_PAGE,
        element : <CreateQuestionBank />
      },
      {
        path : SUPER_ADMIN_CREATE_QUESTION_BANK_FORM_PAGE,
        element : <CreateQuestionForm />
      },
      
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
];

export default clientRoutes;

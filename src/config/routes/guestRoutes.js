import { lazy } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  SIGNIN,
  SIGNUP,
  EDIT_PROFILE,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
} from "../constants/routePathConstants";

const Login = lazy(() => import("../../pages/auth/login"));
const Register = lazy(() => import("../../pages/auth/register"));
const EditProfile = lazy(() => import("../../pages/auth/editProfile"));
const ResetPassword = lazy(() => import("../../pages/auth/resetPassword"));
const ForgotPassword = lazy(() => import("../../pages/auth/forgotPassword"));
const VerifyEmail = lazy(() => import("../../pages/auth/verifyEmail"));

const Guest = () => {
  return (
    <div>
      <h1>Hello World (Guest)</h1>
      <Link to={SIGNIN}>Go to Signin</Link>
    </div>
  );
};

const guestRoutes = [
  {
    path: "/",
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <Guest />,
      },
      {
        path: SIGNUP,
        element: <Register />,
      },
      {
        path: VERIFY_EMAIL,
        element: <VerifyEmail />,
      },
      {
        path: SIGNIN,
        element: <Login />,
      },
      {
        path: EDIT_PROFILE,
        element: <EditProfile />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
];

export default guestRoutes;

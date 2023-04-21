import { lazy } from "react";
import { Outlet } from "react-router-dom";

const studentRoutes = [
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
        element: <h1>Hello World (Student)</h1>,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
];

export default studentRoutes;

import guestRoutes from "./guestRoutes";
import clientRoutes from "./clientRoutes";
import employeeRoutes from "./employeeRoutes";
import studentRoutes from "./studentRoutes";

const ROLES_ROUTES = {
  1: clientRoutes,
  2: clientRoutes,
  3: clientRoutes,
  4: clientRoutes,
  5: clientRoutes,
  6: guestRoutes,
  7: clientRoutes,
  8: clientRoutes,
  // 2: employeeRoutes,
  // 2: studentRoutes,
};

export const getRoutes = (role) => {
  return ROLES_ROUTES[role];
};

//   return ROLES_ROUTES[role] ?? unauthorizedRoutes;

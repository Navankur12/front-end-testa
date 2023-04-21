import { SUB_ADMIN, SUPER_ADMIN, WEBSITE_RELOGIN } from "./routePathConstants";

export const DEFAULT_TOKEN = "token";
export const USER_DATA = "userData";
export const USER_DETAILS = "user_detils";

//roles
export const SUPER_ADMIN_ROLE = "super-admin";

//role navigation
export const ROLE_NAV = {
  ADMIN: SUPER_ADMIN,
  SUBADMIN: SUB_ADMIN,
};

export const PREVENT_ROUTES = [WEBSITE_RELOGIN];

export const NETWORK_ERROR = "Network Error";

export const USER_TYPE = [
  { id: 1, name: "superadmin", label: "Super Admin" },
  { id: 2, name: "admin", label: "Admin" },
  { id: 3, name: "client", label: "Client" },
  { id: 4, name: "employee", label: "Employee" },
  { id: 5, name: "student", label: "Student" },
  { id: 6, name: "govtEmployee", label: "Govt Employee" },
  { id: 7, name: "Sub Admin", label: "Sub Admin" },
  { id: 8, name: "Examiner", label: "Examiner" },
  { id: 9, name: "Employer", label: "Employer" },
];

//user type menus
export const USER_TYPE_MENUS = [
  // { label: "Admin", value: 2 },
  { label: "Employee", value: 4 },
  { label: "Student", value: 5 },
  // { label: "Govt Employee", value: 6 },
];

//user type menus
export const SUB_ADMIN_USER_TYPE_MENUS = [
  { label: "Sub Admin", value: 7 },
  { label: "Examiner", value: 8 },
  { label: "Employer", value: 9 },
  { label: "Admin", value: 2 },
];

//gender
export const GENDER_MENUS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

//status
export const STATUS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const QUESTION_TYPES =[
  {
    label:"Multiple Choice Question", value:"MCQ"
  },
  {
    label:"Psychometric", value:"Psychometric"
  },
  {
    label:"Objective", value:"Objective"
  }
]
//country
export const COUNTRY = [{ label: "India", value: "India" }];

export const SECTOR =[
  {label:"Sector-1", value:"sector-1"},
  {label:"Sector-2", value:"sector-2"}
]

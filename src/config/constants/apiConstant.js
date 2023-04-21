export const STAGE = "http://localhost:3000";
export const DEV = "";
export const PROD = "https://testa-back-end.vercel.app/";

export const API_ROOT = `${PROD}`;

//auth api
export const SIGNUP_API = "api/registeruser";
export const VERIFY_EMAIL_API = "api/verify-email";
export const RESEND_EMAIL_API = "api/resend-email";
export const CREATE_PROFILE_API = "api/createProfile";
export const SIGNIN_API = "api/loginuser";
export const BASIC_USER_DETAIL_API = "api/basic-user-detail";
export const FORGOT_PASSWORD_API = "api/forget-password";
export const RESET_PASSWORD_API = "api/reset-password";
export const GET_USER_PROFILE_API = "api/getUserProfile";
export const UPDATE_PROFILE_API = "api/updateProfile";
export const CHANGE_PASSWORD_API = "api/changePassword";
export const GET_STATES_API = "api/getStates";
export const STATUS_API = "api/status";
export const SUB_ADMIN_STATUS_CHANGE_API = "api/subadmin-statuschange";
export const GET_CITIES_API = "api/getcities";
export const GET_ORGANIZATION_API = "api/organisationDetails";

//super admin api
//dashboard
export const GET_DASHBOARD_GRID_STYLE_API = "api/get-dashboard-style";
export const SET_DASHBOARD_GRID_STYLE_API = "api/set-dashboard-style";
export const GET_ADMIN_DASHBOARD_BASIC_DETAILS_API = "api/admin-dashboard-basic-details";
export const POST_UPCOMING_ASSESSMENT_API = "api/upcoming-assessment";
export const GET_ASSESSMENT_STATISTICS_API = "api/assessment-statistics";
export const GET_ACTIVE_CLIENT_STATISTICS_API = "api/active-client-statistics";
export const GET_DASHBOARD_NOTIFICATION_API = "api/dashboard-notification";


export const CREATE_SUB_ADMIN_PROFILE_API = "api/subadmin-profile";
export const GET_ALL_SUB_ADMIN_PROFILE_API = "api/getAllSubadminProfile";
export const GET_ALL_USERS_LIST_API = "api/getAllUserProfile";
export const CREATE_QUESTIONBANK_FORM_API = "api/createQuestion";
export const GET_QUESTION_BANK_LIST_API = "api/questionbank-list";
export const CHANGE_QUESTION_BANK_LIST_STATUS_API = "api/change-questionbank-status";
export const GET_QUESTION_LIST_API = "api/section-list"
export const TOUR_API = "api/admin-routes/tour";

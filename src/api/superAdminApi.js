import api from "../utils/apiHelper.js";
import {
  devConsoleLog,
  errorToast,
  successToast,
} from "../utils/projectHelper";

import {
  API_ROOT,
  GET_DASHBOARD_GRID_STYLE_API,
  SET_DASHBOARD_GRID_STYLE_API,
  GET_ADMIN_DASHBOARD_BASIC_DETAILS_API,
  POST_UPCOMING_ASSESSMENT_API,
  GET_ASSESSMENT_STATISTICS_API,
  GET_ACTIVE_CLIENT_STATISTICS_API,
  GET_DASHBOARD_NOTIFICATION_API,
} from "../config/constants/apiConstant.js";

import {
  getDashboardGridStyle,
  getSuperAdminBasicDetail,
  getAssessmentDetail,
  getAssessmentStatistics,
  getActiveClientStatistics,
  getNotifications,
} from "../redux/slicers/superAdminSlice";


//DASHBOARD APIS -------------START------------------
export const getDashboardGridStyleApi = (id, setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .get(`${GET_DASHBOARD_GRID_STYLE_API}/${id}`)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading && setLoading(false);
      if (a.statusCode === 200) {
        const { lg, md, sm, xs, xxs } = a?.details;
        dispatch(getDashboardGridStyle({ lg, md, sm, xs, xxs }));
      }
    })
    .error((e) => {
      setLoading && setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading && setLoading(false);
    });
};

export const postDashboardGridStyleApi =
  (formData, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(SET_DASHBOARD_GRID_STYLE_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          // successToast(msg);
          const { lg, md, sm, xs, xxs } = a?.details;
          dispatch(getDashboardGridStyle({ lg, md, sm, xs, xxs }));
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        errorToast(msg);
        devConsoleLog(e);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const getAdminDashboardBasicDetailsApi = (setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .get(GET_ADMIN_DASHBOARD_BASIC_DETAILS_API)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading && setLoading(false);
      if (a.statusCode === 200) {
        dispatch(getSuperAdminBasicDetail(a?.details));
      }
    })
    .error((e) => {
      setLoading && setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading && setLoading(false);
    });
};

export const postUpcomingAssessmentApi =
  (formData, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(POST_UPCOMING_ASSESSMENT_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          // successToast(msg);
          dispatch(getAssessmentDetail(a?.details?.assessmentDetail));
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        errorToast(msg);
        devConsoleLog(e);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const getAssessmentStatisticsApi = (setLoading, type) => (dispatch) => {
  api()
    .root(API_ROOT)
    .get(`${GET_ASSESSMENT_STATISTICS_API}?type=${type}`)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading && setLoading(false);
      if (a.statusCode === 200) {
        dispatch(getAssessmentStatistics(a?.details));
      }
    })
    .error((e) => {
      setLoading && setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading && setLoading(false);
    });
};

export const getActiveClientStatisticsApi =
  (setLoading, type, setDropDown) => (dispatch) => {
    api()
      .root(API_ROOT)
      .get(`${GET_ACTIVE_CLIENT_STATISTICS_API}?type=${type}`)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading && setLoading(false);
        if (a.statusCode === 200) {
          dispatch(getActiveClientStatistics(a?.details));
          setDropDown && setDropDown((pre) => ({ ...pre, text: type }));
        }
      })
      .error((e) => {
        setLoading && setLoading(false);
        const { message: msg = "" } = e;
        devConsoleLog(e);
      })
      .send(() => {
        setLoading && setLoading(false);
      });
  };

export const getNotificationsApi = (setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .get(GET_DASHBOARD_NOTIFICATION_API)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading && setLoading(false);
      if (a.statusCode === 200) {
        dispatch(getNotifications(a?.details));
      }
    })
    .error((e) => {
      setLoading && setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading && setLoading(false);
    });
};

//DASHBOARD APIS -------------END------------------
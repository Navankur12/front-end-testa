import api from "../utils/apiHelper.js";
import {
  ConfirmAlert,
  devConsoleLog,
  errorAlert,
  errorToast,
  // getUserData,
  // navigate,
  // redirectRoute,
  sessionDestroy,
  storeLocal,
  storeSession,
  SuccessAlert,
  successToast,
} from "../utils/projectHelper";

import {
  API_ROOT,
  SIGNIN_API,
  SIGNUP_API,
  FORGOT_PASSWORD_API,
  RESET_PASSWORD_API,
  VERIFY_EMAIL_API,
  GET_STATES_API,
  GET_CITIES_API,
  CHANGE_PASSWORD_API,
  GET_USER_PROFILE_API,
  UPDATE_PROFILE_API,
  CREATE_SUB_ADMIN_PROFILE_API,
  GET_ALL_SUB_ADMIN_PROFILE_API,
  GET_ORGANIZATION_API,
  GET_ALL_USERS_LIST_API,
  STATUS_API,
  SUB_ADMIN_STATUS_CHANGE_API,
  BASIC_USER_DETAIL_API,
  CREATE_PROFILE_API,
  RESEND_EMAIL_API,
  CREATE_QUESTIONBANK_FORM_API,
  GET_QUESTION_BANK_LIST_API,
  GET_QUESTION_LIST_API,
  TOUR_API,
  CHANGE_QUESTION_BANK_LIST_STATUS_API,
} from "../config/constants/apiConstant.js";
import {
  SIGNIN,
  EDIT_PROFILE,
  SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE,
} from "../config/constants/routePathConstants.js";
import { USER_DATA } from "../config/constants/projectConstant.js";
import {
  getCityLists,
  getCount,
  getOrganizationLists,
  getPagination,
  getStateLists,
  getSubAdminLists,
  getTotalPages,
  getUserLists,
  setUserInfo,
  getQuestionBankList,
  getQuestionList,
  changeStatus
} from "../redux/slicers/authSlice.js";

export const signUpApi =
  (formData, setErr, navigate, setLoading, clearFormValues, handleClickOpen) =>
    (dispatch) => {
      api()
        .root(API_ROOT)
        .post(SIGNUP_API)
        .data(formData)
        .success((a) => {
          const { message: msg = "" } = a;
          setLoading(false);
          if (a.statusCode === 200) {
            clearFormValues();
            handleClickOpen();
            setErr("");
          } else if (a.statusCode === 400) {
            setErr(msg);
          } else {
            setErr(msg);
          }
        })
        .error((e) => {
          setLoading(false);
          const { message: msg = "" } = e;
          setErr(msg);
          devConsoleLog(e);
        })
        .send(() => {
          setLoading(false);
        });
    };

export const signInApi =
  (formData, setErr, navigate, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(SIGNIN_API)
      .data(formData)
      .success((a) => {
        setLoading(false);
        const { message: msg = "" } = a;
        if (a.statusCode === 200) {
          storeLocal(a?.details?.token);
          storeLocal(a?.details, USER_DATA);
          dispatch(setUserInfo(a?.details));
          if (!a?.details?.isUserProfileCreated) {
            navigate(EDIT_PROFILE);
          } else {
            successToast(msg);
            navigate("/");
          }
          setErr("");
        } else {
          setErr(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        if (e.statusCode === 426) {
          const data = {
            email: formData?.email,
          };
          dispatch(getBasicUserDetailApi(data, navigate));
        } else {
          setErr(msg);
        }
        devConsoleLog(e);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const getBasicUserDetailApi = (formData, navigate) => (dispatch) => {
  api()
    .root(API_ROOT)
    .post(BASIC_USER_DETAIL_API)
    .data(formData)
    .success((a) => {
      const { message: msg = "" } = a;
      if (a.statusCode === 200) {
        storeLocal(a?.details, USER_DATA);
        dispatch(setUserInfo(a?.details));
        navigate && navigate(EDIT_PROFILE);
      }
    })
    .error((e) => {
      const { message: msg = "" } = e;
      errorAlert(msg);
      devConsoleLog(e);
    })
    .send(() => { });
};

export const forgetPasswordApi =
  (formData, setErr, navigate, setLoading, handleClickOpen) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(FORGOT_PASSWORD_API)
      .data(formData)
      .success((a) => {
        setLoading(false);
        const { message: msg = "" } = a;
        if (a.statusCode === 200) {
          setErr("");
          handleClickOpen();
        } else {
          setErr(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        errorToast(msg);
        devConsoleLog(e);
        setErr(msg);
      })
      .send((e) => {
        if (e?.status == 404) {
          errorToast(e?.data?.message);
        }
        setLoading(false);
      });
  };

export const resetPasswordApi =
  (formData, setErr, navigate, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(RESET_PASSWORD_API)
      .data(formData)
      .success((a) => {
        setLoading(false);
        const { message: msg = "" } = a;
        if (a.statusCode === 200) {
          successToast(msg);
          navigate(SIGNIN);
          setErr("");
        } else {
          setErr(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        setErr(msg);
        devConsoleLog(e);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const editProfileApi =
  (formData, setErr, navigate, setLoading, clearFormValues) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(CREATE_PROFILE_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          successToast(msg);
          navigate(SIGNIN);
          setErr("");
          clearFormValues();
        } else {
          setErr(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        setErr(msg);
        devConsoleLog(e);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const updateProfileApi =
  (formData, setFormValues, setErr, setLoading, getUserProfile) =>
    (dispatch) => {
      api()
        .root(API_ROOT)
        .put(UPDATE_PROFILE_API)
        .data(formData)
        .success((a) => {
          const { message: msg = "" } = a;
          setLoading(false);
          if (a.statusCode === 200) {
            successToast(msg);
            getUserProfile();
            setErr("");
          } else {
            setErr(msg);
          }
        })
        .error((e) => {
          setLoading(false);
          const { message: msg = "" } = e;
          setErr(msg);
          devConsoleLog(e);
        })
        .send(() => {
          setLoading(false);
        });
    };

export const changePasswordApi =
  (formData, setErr, setLoading, clearFormValues) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(CHANGE_PASSWORD_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          successToast(msg);
          setErr("");
          clearFormValues();
        } else {
          setErr(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        setErr(msg);
        devConsoleLog(e);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const verifyEmailApi =
  (formData, navigate, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(VERIFY_EMAIL_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          storeLocal(a?.details, USER_DATA);
          dispatch(setUserInfo(a?.details));
          const data = {
            email: a?.details.email,
          };
          dispatch(getBasicUserDetailApi(data));
        } else {
          errorToast(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        navigate(SIGNIN);
        devConsoleLog(e);
        errorToast(msg);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const resendEmailApi =
  (formData, navigate, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(RESEND_EMAIL_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          successToast(msg);
        } else {
          errorToast(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        devConsoleLog(e);
        errorToast(msg);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const getStateListsApi = (formData, setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .post(GET_STATES_API)
    .data(formData)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading && setLoading(false);
      if (a.statusCode === 200) {
        const states = a?.details?.states?.map((item) => ({
          label: item?.name,
          value: item?.fipsCode,
        }));
        dispatch(getStateLists(states));
      } else {
        errorToast(msg);
      }
    })
    .error((e) => {
      setLoading && setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
      errorToast(msg);
    })
    .send(() => {
      setLoading && setLoading(false);
    });
};

export const getCityListsApi = (formData, setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .post(GET_CITIES_API)
    .data(formData)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading && setLoading(false);
      if (a.statusCode === 200) {
        const cities = a?.details?.cities?.map((item) => ({
          label: item?.name,
          value: item?.name,
        }));
        dispatch(getCityLists(cities));
      } else {
        errorToast(msg);
      }
    })
    .error((e) => {
      setLoading && setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
      errorToast(msg);
    })
    .send(() => {
      setLoading && setLoading(false);
    });
};

export const getUserProfileApi =
  (id, setUserId, setFormValues, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .get(`${GET_USER_PROFILE_API}/${id}`)
      .success((a) => {
        const { message: msg = "" } = a;
        console.log(a);
        setLoading(false);
        if (a.statusCode === 200) {
          dispatch(setUserInfo(a?.details?.user));
          setFormValues((pre) => ({
            firstName: a?.details?.user?.firstName,
            lastName: a?.details?.user?.lastName,
            gender: a?.details?.user?.gender,
            mobile: a?.details?.user?.mobile,
            email: a?.details?.user?.email,
            address: a?.details?.user?.address,
            country: a?.details?.user?.country,
            state: a?.details?.user?.fipsCode,
            userType: a?.details?.user?.userType,
            description: a?.details?.user?.description,
            city: a?.details?.user?.city,
            pincode: a?.details?.user?.pincode,
          }));
          setUserId(a?.details?.userId);
          dispatch(getStateListsApi({ country: "India" }));
          dispatch(getCityListsApi({ fipsCode: a?.details?.user?.fipsCode }));
        } else {
          errorToast(msg);
        }
      })
      .error((e) => {
        setLoading(false);
        const { message: msg = "" } = e;
        devConsoleLog(e);
        errorToast(msg);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const createSubAdminProfileApi =
  (formData, navigate, setLoading, clearFormValues) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(CREATE_SUB_ADMIN_PROFILE_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a;
        setLoading(false);
        if (a.statusCode === 200) {
          successToast(msg);
          navigate(SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE);
          clearFormValues();
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

export const getSubAdminProfileListsApi =
  (setLoading, page = 1, limit = 10, order = -1) =>
    (dispatch) => {
      if (page < 1) page = 1;
      api()
        .root(API_ROOT)
        .get(
          `${GET_ALL_SUB_ADMIN_PROFILE_API}?page=${page}&limit=${limit}&sortOrder=${order}`
        )
        .success((a) => {
          const { message: msg = "" } = a;
          setLoading && setLoading(false);
          if (a.statusCode === 200) {
            const { totalPages, totalCounts, subadminProfile } = a.details;
            dispatch(getSubAdminLists(subadminProfile));
            dispatch(getPagination({ totalCount: totalCounts, totalPages }));
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

export const getUserListApi =
  (setLoading, page = 1, limit = 10, order = -1) =>
    (dispatch) => {
      if (page < 1) page = 1;
      api()
        .root(API_ROOT)
        .get(
          `${GET_ALL_USERS_LIST_API}?page=${page}&limit=${limit}&sortOrder=${order}`
        )
        .success((a) => {
          const { message: msg = "" } = a;
          setLoading && setLoading(false);
          if (a.statusCode === 200) {
            const { totalPages, totalCounts, userProfile } = a.details;
            dispatch(getUserLists(userProfile));
            dispatch(getPagination({ totalCount: totalCounts, totalPages }));
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

export const getOrganizationListsApi = (setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .get(GET_ORGANIZATION_API)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading(false);
      if (a.statusCode === 200) {
        const lists = a?.details?.map((item) => ({
          label: item?.organisationName,
          value: item?.organisationName,
        }));
        dispatch(getOrganizationLists(lists));
      }
    })
    .error((e) => {
      setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading(false);
    });
};

export const acceptOrRejectApi = (formData, setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .put(STATUS_API)
    .data(formData)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading(false);
      if (a.statusCode === 200) {
        successToast(msg);
        dispatch(getUserListApi());
      }
    })
    .error((e) => {
      setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading(false);
    });
};

export const subAdminStatusApi = (id, formData, setLoading) => (dispatch) => {
  api()
    .root(API_ROOT)
    .put(`${SUB_ADMIN_STATUS_CHANGE_API}/${id}`)
    .data(formData)
    .success((a) => {
      const { message: msg = "" } = a;
      setLoading(false);
      if (a.statusCode === 200) {
        successToast(msg);
        dispatch(getSubAdminProfileListsApi());
      }
    })
    .error((e) => {
      setLoading(false);
      const { message: msg = "" } = e;
      devConsoleLog(e);
    })
    .send(() => {
      setLoading(false);
    });
};

export const logoutApi = () => {
  sessionDestroy();
};

export const createQuestionBankFormApi =
  (formValues, navigate, setLoading, clearFormValues) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(CREATE_QUESTIONBANK_FORM_API)
      .data(formValues)
      .success((a) => {
        setLoading(false);
        console.log(a);
        const { message: msg = "" } = a;
        successToast("Question Bank Form Created Successfully");
        clearFormValues();
        navigate("/");
      })
      .error((e) => {
        console.log(e);
        setLoading(false);
        const { message: msg = "" } = e;
        errorToast(msg);
      })
      .send(() => {
        setLoading(false);
      });
  };

export const getQuestionBankListApi =
  (setLoading, page = 1, limit = 10, order = -1) =>
    (dispatch) => {
      if (page < 1) page = 1;
      api()
        .root(API_ROOT)
        .get(
          `${GET_QUESTION_BANK_LIST_API}?page=${page}&limit=${limit}&sortOrder=${order}`
        )
        .success((a) => {
          const { message: msg = "" } = a;
          setLoading && setLoading(false);
          if (a.statusCode === 200) {
            const { totalPages, totalCounts, questionBankDetails } = a.details;
            console.log(a.details);
            dispatch(getQuestionBankList(questionBankDetails));
            dispatch(getPagination({ totalCount: totalCounts, totalPages }));
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
    export const getQuestionListApi =
    (setLoading, page = 1, limit = 10, order = -1) =>
      (dispatch) => {
        if (page < 1) page = 1;
        api()
          .root(API_ROOT)
          .get(
            `${GET_QUESTION_LIST_API}?page=${page}&limit=${limit}&sortOrder=${order}`
          )
          .success((a) => {
            const { message: msg = "" } = a;
            setLoading && setLoading(false);
            if (a.statusCode === 200) {
              const { totalPages, totalCounts, sectionDetails } = a.details;
              console.log("Details",a.details);
              dispatch(getQuestionList(sectionDetails));
              dispatch(getPagination({ totalCount: totalCounts, totalPages }));
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


export const tourApi = (id) => (dispatch) => {
  api()
    .root(API_ROOT)
    .get(`${TOUR_API}/${id}`)
    .success((a) => {
      const { message: msg = "" } = a;
      successToast(msg)
    })
    .error((e) => {
      const { message: msg = "" } = e;
      errorToast(msg);
    })
    .send(() => {
      // setLoading(false)
    });
};

export const changeQuestionBankListStatus =
  (formData, getQuestionList, setLoading) => (dispatch) => {
    api()
      .root(API_ROOT)
      .post(CHANGE_QUESTION_BANK_LIST_STATUS_API)
      .data(formData)
      .success((a) => {
        const { message: msg = "" } = a
        setLoading(false);
        if (a.statusCode === 200) {
          getQuestionList()
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
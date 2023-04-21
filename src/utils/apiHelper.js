import axios from "axios";
import {
  devConsoleLog,
  errorToast,
  getLocal,
  getUserData,
  infoToast,
  sessionDestroy,
  warningToast,
} from "./projectHelper.js";
import { NETWORK_ERROR } from "../config/constants/projectConstant.js";
import Swal from "sweetalert2";

class ApiClass {
  _url = "";
  _data = {};
  _method = "";
  _badRequest = null;
  _authFail = null;
  _accessDenied = null;
  _notFound = null;
  _serverError = null;
  _success = null;
  _error = null;
  _query = null;
  _progress = null;
  _api_root = null;
  _headers = {
    "Content-Type": "application/json",
    "Time-Zone": "Asia/Kolkata",
  };
  root = (root) => {
    this._api_root = root;
    return this;
  };
  get = (path) => {
    this._method = "GET";
    this._url = this._api_root + path;
    return this;
  };

  post = (path) => {
    this._method = "POST";
    this._url = this._api_root + path;
    return this;
  };
  put = (path) => {
    this._method = "PUT";
    this._url = this._api_root + path;
    return this;
  };
  patch = (path) => {
    this._method = "PATCH";
    this._url = this._api_root + path;
    return this;
  };
  onUploadProgress = (callback = null) => {
    this._progress = callback;
    return this;
  };
  delete = (path) => {
    this._method = "DELETE";
    this._url = this._api_root + path;
    return this;
  };

  success = (callback = null) => {
    this._success = callback;
    return this;
  };
  error = (callback = null) => {
    this._error = callback;
    return this;
  };

  badRequest400 = (callback = null) => {
    this._badRequest = callback;
    return this;
  };

  authFail401 = (callback = null) => {
    this._authFail = callback;
    return this;
  };

  accessDenied403 = (callback = null) => {
    this._accessDenied = callback;
    return this;
  };

  notFound404 = (callback = null) => {
    this._notFound = callback;
    return this;
  };

  serverErr500 = (callback = null) => {
    this._serverError = callback;
    return this;
  };

  data = (a) => {
    if (this._query) {
      this._data["variables"] = a;
    } else {
      this._data = a;
    }
    return this;
  };
  upload = (callback = null) => {
    this._headers = {
      "Content-type": "multipart/form-data",
    };
    return this.send(callback);
  };
  send = async (callback = null) => {
    if (!this._api_root) {
      throw new Error("root path missing");
    }
    const token = getLocal();
    let res = null;
    let err = null;
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
    await axios(
      token !== undefined && token !== null
        ? {
            method: this._method,
            url: this._url,
            data: this._data,
            headers: {
              ...this._headers,
              "Access-Control-Allow-Origin": "*",
              "x-auth-token": token,
            },
            onUploadProgress: this._progress,
          }
        : {
            method: this._method,
            url: this._url,
            data: this._data,
            headers: { ...this._headers },
            onUploadProgress: this._progress,
          }
    )
      .then((r) => {
        res = r;
        if (r?.data?.statusCode) {
          this._success?.call(this, res.data);
        } else {
          throw { response: { data: res.data } };
        }
      })
      .catch((e) => {
        err = e;
        if (!err?.response && err.toString().includes(NETWORK_ERROR)) {
          infoToast({
            title: "Network Error",
            msg: "Please check you internet and try once again",
          });
          devConsoleLog(
            "Network error. Please check you internet and try once again"
          );
          return;
        }
        const data = err?.response?.data ?? {};
        const { message: msg = "" } = data;
        const { status } = e?.response ?? {};
        let errorExec = true;
        switch (status) {
          case 400: //input fails
            this._badRequest?.call(this, data);
            // if (!this._badRequest) {
            //    errorToast({ title: "Bad ", msg });
            // }
            break;
          case 401:
            //session fail or expiry
            if (!this._authFail) {
              Swal.fire("Unauthorized", "You are not authorized to create profile", "error");
            }
            break;
          case 410: //session fail or expiry
            const { user_details = {} } = getUserData();
            this._authFail?.call(this, data);
            if (!this._authFail) {
              Swal.fire("Authentication Failed", "Please login again", "error");
              if (user_details) {
                sessionDestroy();
              }
              errorExec = false;
            }
            break;
          case 403: //session ok but access prevent
            this._accessDenied?.call(this, data);
            if (!this._accessDenied) {
              warningToast("Something went wrong");
            }
            errorExec = false;
            break;
          case 404: //not found path
            this._notFound?.call(this, data);
            if (!this._notFound) {
              errorToast("Not Found");
            }
            errorExec = false;
            break;
          case 500: //internal server error
            this._serverError?.call(this, data);
            if (!this._serverError) {
              errorToast("Internal Server Error");
              this._error?.call(this, err?.response?.data ?? {});
            }
            errorExec = false;
            break;
          default:
            break;
        }

        if (this._error && errorExec) {
          this._error?.call(this, err?.response?.data ?? {});
        }
      });
    if (callback && (res || err?.response)) {
      callback?.call(this, err?.response, err?.response?.statusCode, res);
    }
  };
}

const api = () => new ApiClass();
export default api;

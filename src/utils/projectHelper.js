import {
  DEFAULT_TOKEN,
  USER_DATA,
  USER_TYPE,
} from "../config/constants/projectConstant.js";
import { SIGNIN } from "../config/constants/routePathConstants";
import { toast } from "react-toastify";
import { navigatePath, sessionFail } from "../redux/slicers/activitySlice";
import store from "../redux/store";
import validateField from "./validateField.js";
import Swal from "sweetalert2";
import { setUserInfo } from "../redux/slicers/authSlice.js";

//useCommas

export const numberWithCommasString = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const numberWithoutCommasString = (x) => {
  const beforeDecimalStr = x.toString()?.split(".");

  if (beforeDecimalStr[1] !== undefined) {
    return (
      beforeDecimalStr[0]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "." +
      beforeDecimalStr[1]
    );
  } else {
    return beforeDecimalStr[0]
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const numberWithCommasTrunc = (x) => {
  const trunc = x?.toFixed(2);
  return trunc?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithCommasMath = (x) => {
  const trunc = Math?.trunc(x);
  return trunc?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

export const devConsoleLog = (...a) => {
  if (a) {
    if (isDev()) {
    }
  }
};

export const storeLocal = (data = "", tokenName = DEFAULT_TOKEN) => {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(tokenName, data);
};
export const storeSession = (data = "", tokenName = "userData") => {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  window.sessionStorage.setItem(tokenName, data);
};
export const getLocal = (tokenName = DEFAULT_TOKEN) => {
  const localData = window.localStorage.getItem(tokenName);
  let res;
  try {
    res = JSON.parse(localData);
  } catch (err) {
    res = localData;
  }
  return res;
};
export const getUserData = (userData = USER_DATA) => {
  const localData = window.localStorage.getItem(userData);
  let res = {};
  try {
    res = JSON.parse(localData) || {};
  } catch (err) {
    res = localData || {};
  }
  return res;
};
export const getUserDetails = (userData = USER_DATA) => {
  const localData = window.localStorage.getItem(userData);
  let res = {};
  try {
    res = JSON.parse(localData) || {};
  } catch (err) {
    res = localData || {};
  }
  return res;
};
export const removeLocal = (tokenName = DEFAULT_TOKEN) => {
  window.localStorage.removeItem(tokenName);
  return navigate(SIGNIN);
};

export const sessionDestroy = (path = SIGNIN) => {
  removeLocal();
  removeLocal(USER_DATA);
  dispatcher(sessionFail());
  navigate(path);
  dispatcher(setUserInfo({}));
};

export const uploadPathBuilder = (root, a) => {
  return root + a;
};

export const navigate = (path) => {
  dispatcher(navigatePath(path));
};

export const dispatcher = (a) => {
  store.dispatch(a);
};

export const successToast = (a) =>
  toast.success(a, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const errorToast = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const warningToast = () => {
  toast.warn("Something went wrong", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
export const infoToast = () => {
  toast.info("Network Error!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const errorValidator = (a, setState) => {
  const { name, value = "", password } = a;
  if (value.trim()) {
    const { error = null } = validateField(name, value, password);
    setState((err) => {
      return { ...err, [name]: error };
    });
  } else {
    setState((err) => {
      return { ...err, [name]: null };
    });
  }
};
export const errorValidatorPassword = (a, setState) => {
  const { name, value = "" } = a;
  if (value.trim()) {
    const { error = null } = validateField(name, value);
    setState((err) => {
      return { ...err, [name]: error };
    });
  } else {
    setState((err) => {
      return { ...err, [name]: null };
    });
  }
};

export const errorAlert = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
};

export const SuccessAlert = (msg) => {
  Swal.fire({
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 5000,
  });
};
export const ConfirmAlert = (msg, navigate, path) => {
  Swal.fire({
    title: msg,
    icon: "success",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "GO BACK TO LOGIN",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate(path);
    }
  });
};

export const capitalizeFunc = (value) => {
  const arr = value.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const capitalizeStr = arr.join(" ");

  return capitalizeStr;
};

export const getUserType = (userType) => {
  return USER_TYPE?.find((type) => type.id === userType).label;
};

export const getTimeDifference = (date) => {
  const currentDate = new Date(); // current date/time
  const pastDate = new Date(date); // the past date/time you want to compare

  // calculate the time difference in milliseconds
  const timeDiff = currentDate.getTime() - pastDate.getTime();

  // convert the time difference from milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "a few seconds ago";
  }
};

export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

export const STATES = [
  {
    name: "Andaman and Nicobar Islands",
    fipsCode: "01",
    _id: "641d50c2962681f32932b63e",
  },
  {
    name: "Andhra Pradesh",
    fipsCode: "02",
    _id: "641d50c2962681f32932b643",
  },
  {
    name: "Arunachal Pradesh",
    fipsCode: "30",
    _id: "641d50c2962681f32932b6ec",
  },
  {
    name: "Assam",
    fipsCode: "03",
    _id: "641d50c2962681f32932b707",
  },
  {
    name: "Bihar",
    fipsCode: "34",
    _id: "641d50c2962681f32932b75f",
  },
  {
    name: "Chandigarh",
    fipsCode: "05",
    _id: "641d50c2962681f32932b7e4",
  },
  {
    name: "Chhattisgarh",
    fipsCode: "37",
    _id: "641d50c2962681f32932b7e6",
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    fipsCode: "32",
    _id: "641d50c2962681f32932b835",
  },
  {
    name: "Delhi",
    fipsCode: "07",
    _id: "641d50c2962681f32932b83d",
  },
  {
    name: "Goa",
    fipsCode: "33",
    _id: "641d50c2962681f32932b851",
  },
  {
    name: "Gujarat",
    fipsCode: "09",
    _id: "641d50c2962681f32932b884",
  },
  {
    name: "Haryana",
    fipsCode: "10",
    _id: "641d50c2962681f32932b9bc",
  },
  {
    name: "Himachal Pradesh",
    fipsCode: "11",
    _id: "641d50c2962681f32932ba10",
  },
  {
    name: "Jammu and Kashmir",
    fipsCode: "12",
    _id: "641d50c2962681f32932ba4a",
  },
  {
    name: "Jharkhand",
    fipsCode: "38",
    _id: "641d50c2962681f32932ba83",
  },
  {
    name: "Karnataka",
    fipsCode: "19",
    _id: "641d50c2962681f32932bad1",
  },
  {
    name: "Kerala",
    fipsCode: "13",
    _id: "641d50c2962681f32932bbc4",
  },
  {
    name: "Ladakh",
    fipsCode: "04",
    _id: "641d50c2962681f32932bc30",
  },
  {
    name: "Lakshadweep",
    fipsCode: "14",
    _id: "641d50c2962681f32932bc33",
  },
  {
    name: "Madhya Pradesh",
    fipsCode: "35",
    _id: "641d50c2962681f32932bc36",
  },
  {
    name: "Maharashtra",
    fipsCode: "16",
    _id: "641d50c2962681f32932bd4a",
  },
  {
    name: "Manipur",
    fipsCode: "17",
    _id: "641d50c2962681f32932bf89",
  },
  {
    name: "Meghalaya",
    fipsCode: "18",
    _id: "641d50c2962681f32932bf97",
  },
  {
    name: "Mizoram",
    fipsCode: "31",
    _id: "641d50c2962681f32932bfaa",
  },
  {
    name: "Nagaland",
    fipsCode: "20",
    _id: "641d50c2962681f32932bfba",
  },
  {
    name: "Odisha",
    fipsCode: "21",
    _id: "641d50c2962681f32932bfc5",
  },
  {
    name: "Puducherry",
    fipsCode: "22",
    _id: "641d50c2962681f32932c037",
  },
  {
    name: "Punjab",
    fipsCode: "23",
    _id: "641d50c2962681f32932c03c",
  },
  {
    name: "Rajasthan",
    fipsCode: "24",
    _id: "641d50c2962681f32932c0b0",
  },
  {
    name: "Sikkim",
    fipsCode: "29",
    _id: "641d50c2962681f32932c16c",
  },
  {
    name: "Tamil Nadu",
    fipsCode: "25",
    _id: "641d50c2962681f32932c179",
  },
  {
    name: "Telangana",
    fipsCode: "40",
    _id: "641d50c2962681f32932c2d7",
  },
  {
    name: "Tripura",
    fipsCode: "26",
    _id: "641d50c2962681f32932c331",
  },
  {
    name: "Uttar Pradesh",
    fipsCode: "36",
    _id: "641d50c2962681f32932c345",
  },
  {
    name: "Uttarakhand",
    fipsCode: "39",
    _id: "641d50c2962681f32932c5b6",
  },
  {
    name: "West Bengal",
    fipsCode: "28",
    _id: "641d50c2962681f32932c5ee",
  },
];

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import PulseLoader from "react-spinners/PulseLoader";
import validateField from "./../../../../utils/validateField";
import SelectInput from "./../../../../components/common/SelectInput";
import Input from "./../../../../components/common/input";
import {
  getCityListsApi,
  getStateListsApi,
  createSubAdminProfileApi,
} from "./../../../../api/authApi";
import { Button } from "@mui/material";
import {
  SUB_ADMIN_USER_TYPE_MENUS,
  STATUS,
} from "../../../../config/constants/projectConstant";
import { ReactComponent as MobileIcon } from "../../../../assets/icons/mobile-icon.svg";
import { authSelector, getCityLists } from "./../../../../redux/slicers/authSlice";
import { getUserDetails } from "./../../../../utils/projectHelper";
import { ReactComponent as ArrowLeft } from "./../../../../assets/images/pages/subAdmin/arrow-left.svg";
import { ReactComponent as UploadIcon } from "./../../../../assets/images/pages/subAdmin/upload-icon.svg";
import { ReactComponent as DeleteIcon } from "./../../../../assets/images/pages/subAdmin/delete-icon.svg";
import UserProfile from "./../../../../assets/images/pages/subAdmin/dummy-user-profile.png";
import { SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE } from "../../../../config/constants/routePathConstants";
const initialFormValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  address: "",
  state: "",
  city: "",
  userType: 2,
  pincode:"",
  status: "",
  organisationName: "",
  password: "",
  // confirmPassword: "",
};

const SubAdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const { stateLists = [], cityLists = [] } = useSelector(authSelector);

  useEffect(() => {
    const formData = {
      country: "India",
    };
    dispatch(getStateListsApi(formData, setLoading));
  }, []);
  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const fieldError = validateField(name, fieldValue);

    setFormValues({
      ...formValues,
      [name]: fieldValue,
    });

    if (fieldError) {
      setErrors({
        [name]: fieldError,
      });
    } else {
      setErrors({});
    }
  };

  const focusHandler = (event) => {
    setFocusedInput(event.target.name);
  };

  const blurHandler = () => {
    setFocusedInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = {};

    Object.keys(formValues).forEach((name) => {
      const value = formValues[name];
      const fieldError = validateField(name, value);
      
      if (fieldError) {
        formErrors[name] = fieldError;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Submit the form data
      const stateLabel = stateLists.find(
        (item) => item.value == formValues.state
      ).label;
      const formData = {
        ...formValues,
        state: stateLabel,
        // isAdminApproved: true,
        // isUserProfileCreated: true,
        // isEmailVerified: false,
      };

      setLoading(true);
      dispatch(
        createSubAdminProfileApi(
          formData,
          navigate,
          setLoading,
          clearFormValues
        )
      );
    }
  };

  const clearFormValues = () => {
    setFormValues(initialFormValues);
  };

  const getStateListsHandler = (event) => {
    const { value } = event.target;
    const formData = {
      country: value,
    };
    dispatch(getStateListsApi(formData, setLoading));
  };

  const getCityListsHandler = (event) => {
    dispatch(getCityLists([]));
    const { value } = event.target;
    const formData = {
      fipsCode: value,
    };
    setCityLoading(true)
    dispatch(getCityListsApi(formData, setCityLoading));
    setFormValues((pre) => ({ ...pre, city: "" }));
  };

  return (
    <div className="main-content">
      <div className="title">
        <h1>
          <ArrowLeft
            onClick={() => navigate(SUPER_ADMIN_CLIENT_MANAGEMENT_PAGE)}
          />
          <span>Client Management Profile</span>
        </h1>
      </div>
      <section className="sub-admin-wrapper">
        <div className="tab-content">
          <div className="edit-profile">
            <div className="form-wrapper">
              {err && (
                <div className="error-box">
                  <p className="error-text">{err}</p>
                </div>
              )}
              <div className="form">
                <form >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <Input
                        label="First name"
                        name="firstName"
                        placeholder="Enter First Name"
                        onFocus={focusHandler}
                        error={errors?.firstName}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.firstName}
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter Last Name"
                        onFocus={focusHandler}
                        error={errors?.lastName}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.lastName}
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="Enter Email here"
                        onFocus={focusHandler}
                        error={errors?.email}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.email}
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <Input
                        label="Contact Number"
                        type={"number"}
                        name="mobile"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        placeholder="Enter Contact No."
                        onFocus={focusHandler}
                        error={errors?.mobile}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.mobile}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ width: "calc(50% - 10px)" }}
                    >
                      <Input
                        label="New Password"
                        type={"password"}
                        name="password"
                        placeholder="Enter your Password"
                        onFocus={focusHandler}
                        error={errors?.password}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.password}
                        endAdornment
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <Input
                        label="Pincode"
                        type={"number"}
                        name="pincode"
                        placeholder="Enter your Pincode"
                        mandatory
                        onFocus={focusHandler}
                        error={errors?.pincode}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.pincode}
                      />
                    </div>
                    {/* <div
                      className="form-group"
                      style={{ width: "calc(50% - 10px)" }}
                    >
                      <Input
                        label="Confirm Password"
                        type={"password"}
                        name="confirmPassword"
                        placeholder="Enter your Password"
                        onFocus={focusHandler}
                        error={errors?.confirmPassword}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.confirmPassword}
                        endAdornment
                      />
                    </div> */}
                    <div style={{ width: "100%" }} className="form-group">
                      <Input
                        label="Address Line"
                        name="address"
                        placeholder="Enter Address Line"
                        onFocus={focusHandler}
                        error={errors?.address}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.address}
                      />
                    </div>
                    <div style={{ width: "100%" }} className="form-group">
                      <Input
                        label="Organization"
                        name="organisationName"
                        placeholder="Enter Organization Name"
                        onFocus={focusHandler}
                        error={errors?.organisationName}
                        onBlur={blurHandler}
                        onChange={changeHandler}
                        value={formValues?.organisationName}
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <SelectInput
                        name="state"
                        label="State"
                        placeHolder="Select State"
                        value={formValues?.state}
                        handleChange={(e) => {
                          changeHandler(e);
                          getCityListsHandler(e);
                        }}
                        options={stateLists}
                        error={errors?.state}
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <SelectInput
                        name="city"
                        label="City"
                        placeHolder="Enter City Name"
                        value={formValues?.city}
                        loading={cityLoading}
                        handleChange={changeHandler}
                        options={cityLists}
                        error={errors?.city}
                      />
                    </div>
                    <div
                      style={{ width: "calc(50% - 10px)" }}
                      className="form-group"
                    >
                      <SelectInput
                        name="userType"
                        label="Profession"
                        disabled
                        placeHolder="Enter your Role"
                        value={formValues?.userType}
                        handleChange={changeHandler}
                        options={SUB_ADMIN_USER_TYPE_MENUS}
                        error={errors?.userType}
                      />
                    </div>
                    <div style={{ width: "100%" }} className="form-group">
                      <SelectInput
                        name="status"
                        label="Status"
                        placeHolder="Status"
                        value={formValues?.status}
                        handleChange={changeHandler}
                        options={STATUS}
                        error={errors?.status}
                      />
                    </div>
                  </div>
                  <div className="action-btn">
                    <Button
                      className={`outlined-btn submit-btn`}
                      variant="outlined"
                      onClick={clearFormValues}
                      sx={{
                        width: "192px",
                        height: "52px",
                        textTransform: "unset",
                      }}
                      disabled={loading ? true : false}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={`light-blue-btn submit-btn`}
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{
                        width: "192px",
                        height: "52px",
                        textTransform: "unset",
                      }}
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <PulseLoader size="10px" color="white" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="img-upload-wrapper">
              <div className="img-upload">
                <div className="img">
                  <img src={UserProfile} alt="logo" />
                </div>
                <div className="icon-wrapper">
                  <UploadIcon />
                  <DeleteIcon />
                </div>
                <div className="img-upload-text">
                  <p>PNG or JPG no bigger than 500px wide and tall.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubAdminProfile;

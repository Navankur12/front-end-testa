import React, { useState } from "react";
import Banner from "../Banner";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PulseLoader from "react-spinners/PulseLoader";
import { resetPasswordApi } from "../../../api/authApi";
import validateField from "../../../utils/validateField";
import Input from './../../../components/common/input';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const fieldError = validateField(name, fieldValue, formValues.password);

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
      const fieldError = validateField(name, value, formValues.password);
      if (fieldError) {
        formErrors[name] = fieldError;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Submit the form data
      const formData = {
        password: formValues.password,
        resetToken,
      };
      setLoading(true);
      dispatch(resetPasswordApi(formData, setErr, navigate, setLoading));
    }
  };

  return (
    <div className="login-container">
      <Banner />
      <div className="login-form-container">
        <div className="form-wrapper center-wrapper">
          <div className="text-wrapper">
            <h4 className="login-text">Reset Password </h4>
            <p className="cred-text">
              Start the process to reset your new password
            </p>
          </div>
          {err && (
            <div className="error-box">
              <p className="error-text">{err}</p>
            </div>
          )}
          <div className="form">
            <form>
              <div className="form-group">
                <Input
                  label="New Password"
                  type={"password"}
                  name="password"
                  placeholder="Enter your Password ID"
                  onFocus={focusHandler}
                  error={errors?.password}
                  onBlur={blurHandler}
                  onChange={changeHandler}
                  value={formValues?.password}
                  endAdornment
                />
              </div>
              <div className="form-group">
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
              </div>
              <div>
                <Button
                  className="light-blue-btn"
                  variant="contained"
                  sx={{ width: "48%", textTransform: "unset" }}
                  disabled={loading ? true : false}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <PulseLoader size="10px" color="white" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

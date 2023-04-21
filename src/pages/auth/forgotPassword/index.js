import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "../Banner";
import { ReactComponent as MailVector } from "../../../assets/icons/mail-vector.svg";
import { SIGNIN } from "../../../config/constants/routePathConstants";
import { forgetPasswordApi } from "../../../api/authApi";
import PulseLoader from "react-spinners/PulseLoader";
import validateField from "../../../utils/validateField";
import Input from "./../../../components/common/input";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
      setLoading(true);
      dispatch(forgetPasswordApi(formValues, setErr, navigate, setLoading,handleClickOpen));
    }
  };
  return (
    <div className="login-container">
      <Banner />
      <div className="login-form-container">
        <div className="form-wrapper center-wrapper">
          <div className="text-wrapper">
            <h4 className="login-text">Forgot your password? </h4>
            <p className="cred-text">
              Start the process to reset your password
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
                  label="Registered email address"
                  type="email"
                  name="email"
                  placeholder="Enter your mail ID"
                  onFocus={focusHandler}
                  error={errors?.email}
                  onBlur={blurHandler}
                  onChange={changeHandler}
                  value={formValues?.email}
                  endAdornment={<MailVector style={{ width: "20px" }} />}
                />
              </div>
              <div className="reset-btn-wrapper">
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
                    "Reset"
                  )}
                </Button>
                <Link to={SIGNIN}>Return to login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-wrapper"
      >
        <Box className="success-Modal">
          <Box className="success-loader-logo">
            <svg
              class="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </Box>

          <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              className="success-title"
            >
              <h1>Reset Password</h1>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ padding: 0 }}>
            <DialogContentText
              id="alert-dialog-description"
              className="success-description"
            >
              We have sent an reset password link to your account.
            </DialogContentText>
          </DialogContent>

          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            className="success-btn-wrapper"
          >
            <DialogActions sx={{ padding: 0 }}>
              <Button variant="contained" onClick={handleClose} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;

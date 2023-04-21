import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Banner from "../Banner";
import { ReactComponent as MailVector } from "../../../assets/icons/mail-vector.svg";
import {
  FORGOT_PASSWORD,
  SIGNUP,
} from "../../../config/constants/routePathConstants";
import { signInApi } from "../../../api/authApi";
import PulseLoader from "react-spinners/PulseLoader";
import validateField from "../../../utils/validateField";
import Input from "./../../../components/common/input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      dispatch(signInApi(formValues, setErr, navigate, setLoading));
    }
  };

  return (
    <div className="login-container">
      <Banner />
      <div className="login-form-container">
        <div className="get-started-wrapper">
          <p className="text">Don't have an account yet? </p>
          <Button
            className="outlined-btn"
            variant="outlined"
            sx={{ color: "#2EA8DB" }}
            onClick={() => navigate(SIGNUP)}
          >
            Get Started
          </Button>
        </div>
        <div className="form-wrapper">
          <div className="text-wrapper">
            <p className="welcome-text">Welcome back 👋</p>
            <h4 className="login-text">Login to your account </h4>
            <p className="cred-text">Please enter your credentials to login</p>
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
                  label="Email Address"
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
              <div className="form-group">
                <Input
                  label="Password"
                  type={"password"}
                  name="password"
                  endAdornment
                  placeholder="Enter your Password"
                  onFocus={focusHandler}
                  error={errors?.password}
                  onBlur={blurHandler}
                  onChange={changeHandler}
                  value={formValues?.password}
                />
              </div>
              <div className="remember-forget">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember me"
                  />
                </FormGroup>
                <Link className="forget-password" to={FORGOT_PASSWORD}>
                  Forgot password?
                </Link>
              </div>
              <Button
                className="light-blue-btn"
                variant="contained"
                sx={{ width: "100%" }}
                disabled={loading ? true : false}
                onClick={handleSubmit}
              >
                {loading ? <PulseLoader size="10px" color="white" /> : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

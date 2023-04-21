import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as OpenEye } from "../../assets/icons/OpenEye.svg";
import { ReactComponent as CloseEye } from "../../assets/icons/CloseEye.svg";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { blockInvalidChar } from "../../utils/projectHelper";

const Input = ({
  label,
  type = "text",
  name,
  error,
  placeholder = "",
  onFocus,
  onBlur,
  onChange,
  value,
  inputProps,
  rows,
  endAdornment = false,
  mandatory = false,
  multiline = false,
  disabled = false,
  hideExponants = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderEndAdornment = () => {
    if (!endAdornment) {
      return false;
    }

    if (type === "password") {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            edge="end"
            onClick={handleClickShowPassword}
          >
            {showPassword ? (
              <OpenEye style={{ width: "20px" }} />
            ) : (
              <CloseEye style={{ width: "20px" }} />
            )}
          </IconButton>
        </InputAdornment>
      );
    }

    return endAdornment;
  };

  return (
    <>
      <InputLabel
        htmlFor={`outlined-adornment-${name}`}
        className="input-label"
      >
        {label}
        {mandatory ? <span className="mandatory">&nbsp;*</span> : ""}
      </InputLabel>
      <OutlinedInput
        inputProps={inputProps}
        id={`outlined-adornment-${name}`}
        placeholder={placeholder}
        type={inputType}
        disabled={disabled}
        name={name}
        multiline={multiline}
        rows={rows || ""}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        error={Boolean(error)}
        endAdornment={renderEndAdornment()}
        onKeyDown={hideExponants ? blockInvalidChar:""}
      />
      {error && <p className="error-input">{error}</p>}
    </>
  );
};

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  rows: PropTypes.number,
  endAdornment: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  mandatory: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
};


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#04D375',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? 'red' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const FormSwitch = ({ value ,onChange}) => {
  return (
    <FormControlLabel
      control={<IOSSwitch sx={{ m: 1 }} onChange={onChange} checked={value} />}
    // label="iOS style"
    />
  );
};

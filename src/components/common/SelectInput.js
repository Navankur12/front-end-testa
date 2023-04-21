import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const SelectInput = ({
  label,
  name,
  value,
  placeHolder,
  handleChange,
  mandatory = false,
  disabled = false,
  loading=false,
  error,
  options,
  width=250,
}) => {
  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.3 + ITEM_PADDING_TOP,
        width: width,
      },
    },
  };

  function getStyles(name, value, theme) {
    return {
      fontWeight:
        name !== value
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <>
      <InputLabel id="outlined-adornment-select" className="input-label">
        {label}
        {mandatory && <span className="mandatory">&nbsp;*</span>}
      </InputLabel>
      <div>
        <FormControl sx={{ width: "100%" }}>
          <Select
            className="form-control-select"
            labelId="outlined-adornment-select"
            displayEmpty
            name={name}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            error={error ? true : false}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="" sx={{ paddingLeft: "24px" }}>
              <em>{placeHolder}</em>
            </MenuItem>
            {loading ? (
              <MenuItem value="">Loading...</MenuItem>
            ) : (
              options.map((menu) => (
                <MenuItem
                  key={menu?.label}
                  className="select-options"
                  value={menu?.value}
                  style={getStyles(menu?.value, value, theme)}
                >
                  {menu?.label}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </div>

      {error && <p className="error-input">{error}</p>}
    </>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeHolder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  mandatory: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

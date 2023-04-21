const validateField = (name, value, confirmPassword = null, oldPassword = null) => {
  switch (name) {
    case "firstName":
      if (!value) {
        return "First name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        return "First name can only contain letters";
      } else if (value.trim().length < 3) {
        return "First name must be at least 3 characters";
      } else if (value.trim().length > 50) {
        return "First name must be at most 50 characters";
      }
      break;
    case "lastName":
      if (!value) {
        return "Last name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        return "Last name can only contain letters";
      } else if (value.trim().length < 3) {
        return "Last name must be at least 3 characters";
      } else if (value.trim().length > 50) {
        return "Last name must be at most 50 characters";
      }
      break;
    case "email":
      if (!value) {
        return "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return "Invalid email address";
      } else if (value.trim().length < 5) {
        return "Email must be at least 3 characters";
      } else if (value.trim().length > 255) {
        return "Email must be at most 255 characters";
      }
      break;
    case "password":
    case "oldPassword":
      if (!value) {
        return "Password is required";
      } else if (value.trim().length < 8 || value.trim().length > 20) {
        return "Password must be between 8 and 20 characters";
      } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(value)) {
        return "Password must contain at least one letter, one number, and one special character (!@#$%^&*)";
      }
      break;
    case "newPassword":
      if (!value) {
        return "New password is required";
      } else if (value === oldPassword) {
        return "New password must not be the same as the old password";
      } else if (value.trim().length < 8 || value.trim().length > 20) {
        return "New password must be between 8 and 20 characters";
      } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(value)) {
        return "New password must contain at least one letter, one number, and one special character (!@#$%^&*)";
      }
      break;
    case "confirmPassword":
    case "reEnterPassword":
      if (!value) {
        return "Confirm password is required";
      } else if (value !== confirmPassword) {
        return "Passwords do not match";
      }
      break;
    case "userType":
      if (!value) {
        return "User type is required";
      } else if (typeof value !== "number") {
        return "User type must be a number";
      }
      break;
    case "mobile":
      if (!value) {
        return "Mobile number is required";
      } else if (value.trim().length !== 10) {
        return "Mobile number must be exactly 10 characters";
      } else if (!/^[0-9]+$/.test(value)) {
        return "Invalid mobile number";
      }
      break;
    case "acceptTermCondition":
      if (!value) {
        return "You must accept the terms and conditions";
      }
      break;
    case "gender":
      if (!value) {
        return "Gender is required";
      }
      break;
    case "organisationName":
      if (!value) {
        return "Organization Name is required";
      }
      break;
    case "status":
      if (!value) {
        return "Status is required";
      }
      break;
    case "address":
      if (!value) {
        return "Address is required";
      }
      break;
    case "country":
      if (!value) {
        return "Country is required";
      }
      break;
    case "state":
      if (!value) {
        return "State is required";
      }
      break;
    case "city":
      if (!value) {
        return "City is required";
      }
      break;
    case "pincode":
      if (!value) {
        return "Pincode is required";
      } else if (value.trim().length !== 6) {
        return "Pincode must be exactly 6 digits";
      } else if (!/^[0-9]+$/.test(value)) {
        return "Invalid pincode";
      }
    // ======== create questionbank form  validations [start] =======
    case "questionBankId":
      if (value === "") return "Provide Question Bank ID"
    case "questionType":
      if (value === "") return "Provide Question Type"
    case "jobRole":
      if (value === "") return "Provide Job Role"
    case "jobLevel":
      if (value === "") return "Provide Job Level"
      break;
    case "code":
      if (value === "") return "Provide Code"
      break;
    case "sector":
      if (value === "") return "Provide Sector"
      break;
    case "subSector":
      if (value === "") return "Provide Subsector"
      break;
    case "sectorCode":
      if (value === "") return "Provide Sector Code"
      break;
    case "schemeName":
      if (value === "") return "Provide Scheme Name"
      break;
    case "schemeCode":
      if (value === "") return "Provide Scheme Code"
      break;
    case "nos":
      if (value === "") return "Provide NOS Name"
      break;
    case "nosCode":
      if (value === "") return "Provide NOS Code"
      break;
    case "theoryMarks":
      if (value === "") return "Provide Theory Marks"
      break;
    case "practicalMarks":
      if (value === "") return "Provide Question Bank ID"
      break;
    case "questionbankID":
      if (value === "") return "Provide Practical Marks"
      break;
    case "status":
      if (value === "") return "Select Status"
      break;
    // ======== create questionbank form  validations [end] =======
    default:
      break;
  }
  return "";
};

export default validateField;

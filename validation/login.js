const validator = require("validator");
const isEmpty = require("./is-empty");

/* -------------------------------------------------------------------------- */

const validateLoginInput = (data) => {
  const errors = {};
  const required = ["email", "password"];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : "";
  });

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

/* -------------------------------------------------------------------------- */

module.exports = validateLoginInput;

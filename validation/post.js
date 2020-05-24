const validator = require("validator");
const isEmpty = require("./is-empty");

/* -------------------------------------------------------------------------- */

const validatePostInput = (data) => {
  const errors = {};
  const required = ["text"];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : "";
  });

  if (!validator.isLength(data.text, { min: 2, max: 300 })) {
    errors.text = "Text must be between 2 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

/* -------------------------------------------------------------------------- */

module.exports = validatePostInput;

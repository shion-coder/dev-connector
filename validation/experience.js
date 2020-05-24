const validator = require("validator");
const isEmpty = require("./is-empty");

/* -------------------------------------------------------------------------- */

const validateExperienceInput = (data) => {
  const errors = {};
  const required = ["title", "company", "from"];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : "";
  });

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (!validator.isISO8601(data.from)) {
    errors.from = "Invalid date";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

/* -------------------------------------------------------------------------- */

module.exports = validateExperienceInput;

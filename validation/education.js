const validator = require("validator");
const isEmpty = require("./is-empty");

/* -------------------------------------------------------------------------- */

const validateEducationInput = (data) => {
  const errors = {};
  const required = ["school", "degree", "fieldOfStudy", "from"];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : "";
  });

  if (validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study field is required";
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

module.exports = validateEducationInput;

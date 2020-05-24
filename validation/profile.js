const validator = require("validator");
const isEmpty = require("./is-empty");

/* -------------------------------------------------------------------------- */

const validateProfileInput = (data) => {
  const errors = {};
  const required = ["handle", "status", "skills"];

  required.forEach((val) => {
    data[val] = !isEmpty(data[val]) ? data[val] : "";
  });

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Status field is required";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

/* -------------------------------------------------------------------------- */

module.exports = validateProfileInput;

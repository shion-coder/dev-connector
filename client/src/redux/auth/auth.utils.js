import axios from 'axios';

/* -------------------------------------------------------------------------- */

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

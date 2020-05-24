import axios from 'axios';
import axiosRetry from 'axios-retry';

/* -------------------------------------------------------------------------- */

// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export const makeRequest = async () => {
  const { data } = await axios.get('/');

  return data;
};

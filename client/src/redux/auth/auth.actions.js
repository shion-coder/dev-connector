import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { setAuthToken } from './auth.utils';

import { SET_CURRENT_USER } from './auth.types';
import { GET_ERRORS } from 'redux/errors/errors.types';

/* -------------------------------------------------------------------------- */

export const registerUser = (user, history) => async dispatch => {
  const newUser = await axios.post('/api/users/register', user).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (newUser) {
    history.push('/login');
  }
};

export const loginUser = user => async dispatch => {
  const existingUser = await axios.post('/api/users/login', user).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (existingUser) {
    const { token } = existingUser.data;

    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const decoded = jwtDecode(token);
    dispatch({ type: SET_CURRENT_USER, payload: decoded });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: SET_CURRENT_USER, payload: {} });
  setAuthToken(false);
};

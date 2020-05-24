import { createReducer } from 'redux/create-reducer';

import { isEmpty } from './auth.utils';

import { SET_CURRENT_USER } from './auth.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  isAuthenticated: false,
  user: {},
};

const reducer = {
  [SET_CURRENT_USER]: (state, payload) => ({ ...state, isAuthenticated: !isEmpty(payload), user: payload }),
};

export const authReducer = createReducer(initialState, reducer);

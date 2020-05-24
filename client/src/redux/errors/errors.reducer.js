import { createReducer } from 'redux/create-reducer';

import { GET_ERRORS, CLEAR_ERRORS } from './errors.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  messages: {},
};

const reducer = {
  [GET_ERRORS]: (state, payload) => ({ ...state, messages: payload }),
  [CLEAR_ERRORS]: state => ({ ...state, messages: {} }),
};

export const errorsReducer = createReducer(initialState, reducer);

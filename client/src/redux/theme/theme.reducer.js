import { createReducer } from 'redux/create-reducer';

import { TOGGLE_THEME } from './theme.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  color: 'light',
};

const reducer = {
  [TOGGLE_THEME]: state => ({ ...state, color: state.color === 'light' ? 'dark' : 'light' }),
};

export const themeReducer = createReducer(initialState, reducer);

import { createReducer } from 'redux/create-reducer';

import { PROFILE_LOADING, GET_PROFILE, GET_PROFILES, CLEAR_CURRENT_PROFILE } from './profile.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

const reducer = {
  [PROFILE_LOADING]: state => ({ ...state, loading: true }),
  [GET_PROFILE]: (state, payload) => ({ ...state, profile: payload, loading: false }),
  [GET_PROFILES]: (state, payload) => ({ ...state, profiles: payload, loading: false }),
  [CLEAR_CURRENT_PROFILE]: state => ({ ...state, profile: null }),
};

export const profileReducer = createReducer(initialState, reducer);

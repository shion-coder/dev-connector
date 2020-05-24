import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const authSelector = state => state.auth;

export const selectIsAuthenticated = createSelector([authSelector], auth => auth.isAuthenticated);

export const selectUser = createSelector([authSelector], auth => auth.user);

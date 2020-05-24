import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const errorsSelector = state => state.errors;

export const selectErrorsMessages = createSelector([errorsSelector], errors => errors.messages);

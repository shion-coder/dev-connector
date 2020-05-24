import { GET_ERRORS } from './errors.types';

/* -------------------------------------------------------------------------- */

export const createErrors = errors => ({
  type: GET_ERRORS,
  payload: errors,
});

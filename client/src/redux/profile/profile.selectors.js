import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const profileSelector = state => state.profile;

export const selectProfile = createSelector([profileSelector], profile => profile.profile);

export const selectProfiles = createSelector([profileSelector], profile => profile.profiles);

export const selectProfileLoading = createSelector([profileSelector], profile => profile.loading);

import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const themeSelector = state => state.theme;

export const selectThemeColor = createSelector([themeSelector], theme => theme.color);

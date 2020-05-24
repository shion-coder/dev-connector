import { createSelector } from 'reselect';

/* -------------------------------------------------------------------------- */

const postSelector = state => state.post;

export const selectPost = createSelector([postSelector], post => post.post);

export const selectPosts = createSelector([postSelector], post => post.posts);

export const selectPostLoading = createSelector([postSelector], post => post.loading);

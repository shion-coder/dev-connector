import { createReducer } from 'redux/create-reducer';

import { POST_LOADING, GET_POST, GET_POSTS, ADD_POST, DELETE_POST } from './post.types';

/* -------------------------------------------------------------------------- */

const initialState = {
  post: {},
  posts: [],
  loading: false,
};

const reducer = {
  [POST_LOADING]: state => ({ ...state, loading: true }),
  [GET_POSTS]: (state, payload) => ({ ...state, posts: payload, loading: false }),
  [GET_POST]: (state, payload) => ({ ...state, post: payload, loading: false }),
  [ADD_POST]: (state, payload) => ({ ...state, posts: [...state.posts, payload] }),
  [DELETE_POST]: (state, payload) => ({ ...state, posts: state.posts.filter(post => post._id !== payload) }),
};

export const postReducer = createReducer(initialState, reducer);

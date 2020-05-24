import axios from 'axios';

import { ADD_POST, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST } from './post.types';
import { GET_ERRORS, CLEAR_ERRORS } from 'redux/errors/errors.types';

/* -------------------------------------------------------------------------- */

export const addPost = postData => async dispatch => {
  dispatch(clearErrors());
  const post = await axios.post('/api/posts', postData).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (post) {
    dispatch({ type: ADD_POST, payload: post.data });
    dispatch({ type: GET_ERRORS, payload: {} });
  }
};

export const getPosts = () => async dispatch => {
  const posts = await axios.get('/api/posts').catch(() => {
    dispatch({ type: GET_POSTS, payload: null });
  });

  if (posts) {
    dispatch({ type: GET_POSTS, payload: posts.data });
  }
};

export const getPost = id => async dispatch => {
  const post = await axios.get(`/api/posts/${id}`).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (post) {
    dispatch({ type: GET_POST, payload: post.data });
  }
};

export const deletePost = id => async dispatch => {
  const post = await axios.delete(`/api/posts/${id}`).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (post) {
    dispatch({ type: DELETE_POST, payload: id });
  }
};

export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

export const setPostLoading = () => ({
  type: POST_LOADING,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

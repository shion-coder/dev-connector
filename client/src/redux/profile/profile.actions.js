import axios from 'axios';

import { PROFILE_LOADING, GET_PROFILE, GET_PROFILES, CLEAR_CURRENT_PROFILE } from './profile.types';
import { SET_CURRENT_USER } from 'redux/auth/auth.types';
import { GET_ERRORS } from 'redux/errors/errors.types';

/* -------------------------------------------------------------------------- */

export const getProfiles = () => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  const profiles = await axios.get('/api/profile/all').catch(() => {
    dispatch({ type: GET_PROFILE, payload: null });
  });

  if (profiles) {
    dispatch({ type: GET_PROFILES, payload: profiles.data });
  }
};

export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  const profile = await axios.get('/api/profile').catch(() => {
    dispatch({ type: GET_PROFILE, payload: {} });
  });

  if (profile) {
    dispatch({ type: GET_PROFILE, payload: profile.data });
  }
};

export const getProfileByHandle = handle => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  const profile = await axios.get(`/api/profile/handle/${handle}`).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (profile) {
    dispatch({ type: GET_PROFILE, payload: profile.data });
  }
};

export const createProfile = (profile, history) => async dispatch => {
  const newProfile = await axios.post('/api/profile', profile).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (newProfile) {
    history.push('/dashboard');
  }
};

export const addExperience = (exp, history) => async dispatch => {
  const newExp = await axios.post('/api/profile/experience', exp).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (newExp) {
    history.push('/dashboard');
  }
};

export const deleteExperience = id => async dispatch => {
  const newExp = await axios.delete(`/api/profile/experience/${id}`).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (newExp) {
    dispatch({ type: GET_PROFILE, payload: newExp.data });
  }
};

export const addEducation = (edu, history) => async dispatch => {
  const newEdu = await axios.post('/api/profile/education', edu).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (newEdu) {
    history.push('/dashboard');
  }
};

export const deleteEducation = id => async dispatch => {
  const newEdu = await axios.delete(`/api/profile/education/${id}`).catch(err => {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  });

  if (newEdu) {
    dispatch({ type: GET_PROFILE, payload: newEdu.data });
  }
};

export const deleteProfile = () => async dispatch => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    const deleted = await axios.delete('/api/profile').catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });

    if (deleted) {
      dispatch({ type: SET_CURRENT_USER, payload: {} });
    }
  }
};

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE,
});

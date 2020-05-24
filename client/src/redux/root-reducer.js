import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeReducer } from 'redux/theme/theme.reducer';
import { authReducer } from 'redux/auth/auth.reducer';
import { errorsReducer } from 'redux/errors/errors.reducer';
import { profileReducer } from 'redux/profile/profile.reducer';
import { postReducer } from 'redux/post/post.reducer';

/* -------------------------------------------------------------------------- */

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['auth'],
};

const reducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  post: postReducer,
});

export const rootReducer = persistReducer(persistConfig, reducer);

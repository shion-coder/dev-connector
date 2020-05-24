import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import Theme from 'config/theme';

import App from 'containers/app/app.container';

import { GlobalStyles } from 'utils/styles/global-styles';

/* -------------------------------------------------------------------------- */

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Theme>
        <GlobalStyles />

        <Router>
          <StylesProvider injectFirst>
            <App />
          </StylesProvider>
        </Router>
      </Theme>
    </PersistGate>
  </Provider>
);

/* -------------------------------------------------------------------------- */

export default Root;

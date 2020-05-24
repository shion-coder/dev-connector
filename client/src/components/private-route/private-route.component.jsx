import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated } from 'redux/auth/auth.selectors';

import { Route, Redirect } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)} />
);
/* -------------------------------------------------------------------------- */

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);

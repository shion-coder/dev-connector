import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { selectIsAuthenticated } from 'redux/auth/auth.selectors';
import { loginUser } from 'redux/auth/auth.actions';
import { createErrors } from 'redux/errors/errors.actions';

import TextFields from 'components/common/text-fields/text-fields.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  errosMesages: selectErrorsMessages,
  isAuthenticated: selectIsAuthenticated,
});

const Login = ({ errosMesages, isAuthenticated, loginUser, createErrors, history }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const { email, password } = user;

  const handleChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = e => {
    e.preventDefault();

    loginUser(user);
  };

  useEffect(() => {
    setErrors(errosMesages);
  }, [errosMesages]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your DevConnector account</p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFields
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
              />

              <TextFields
                type="password"
                error={errors.password}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Login.propTypes = {
  errosMesages: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  createErrors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { loginUser, createErrors })(Login);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { registerUser } from 'redux/auth/auth.actions';
import { createErrors } from 'redux/errors/errors.actions';

import TextFields from 'components/common/text-fields/text-fields.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  errosMesages: selectErrorsMessages,
});

const Register = ({ errosMesages, registerUser, createErrors, history }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState({});

  const { name, email, password, password2 } = user;

  const handleChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = e => {
    e.preventDefault();

    registerUser(user, history);
  };

  useEffect(() => {
    setErrors(errosMesages);
  }, [errosMesages]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={handleSubmit}>
              <TextFields
                type="text"
                error={errors.name}
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />

              <TextFields
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />

              <TextFields
                type="password"
                error={errors.password}
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <TextFields
                type="password"
                error={errors.password2}
                placeholder="Confirm Password"
                name="password2"
                value={password2}
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

Register.propTypes = {
  errosMesages: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  createErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { registerUser, createErrors })(Register);

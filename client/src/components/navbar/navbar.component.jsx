import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsAuthenticated, selectUser } from 'redux/auth/auth.selectors';
import { logoutUser } from 'redux/auth/auth.actions';
import { clearCurrentProfile } from 'redux/profile/profile.actions';

import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  user: selectUser,
});

const Navbar = ({ isAuthenticated, user: { name, avatar }, logoutUser, clearCurrentProfile }) => {
  const history = useHistory();

  const handleLogout = () => {
    clearCurrentProfile();
    logoutUser();
    history.push('/');
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/feed">
          Post Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        {/* eslint-disable-next-line */}
        <a href="#" onClick={handleLogout} className="nav-link">
          <img
            className="rounded-circle"
            src={avatar}
            alt={name}
            style={{ width: '25px', marginRight: '5px' }}
            title="You must have a Gravatar connected to your email to display an image"
          />{' '}
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Connector
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Developers
              </Link>
            </li>
          </ul>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

/* -------------------------------------------------------------------------- */

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfile, selectProfileLoading } from 'redux/profile/profile.selectors';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { getProfileByHandle } from 'redux/profile/profile.actions';
import { createErrors } from 'redux/errors/errors.actions';
import { isEmpty } from 'redux/auth/auth.utils';

import { Link } from 'react-router-dom';

import ProfileHeader from 'components/profile/profile-header/profile-header.component';
import ProfileAbout from 'components/profile/profile-about/profile-about.component';
import ProfileCreds from 'components/profile/profile-creds/profile-creds.component';
import ProfileGithub from 'components/profile/profile-github/profile-github.component';
import Loader from 'components/loader/loader.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  loading: selectProfileLoading,
  errors: selectErrorsMessages,
});

const Profile = ({ match, profile, loading, errors, createErrors, getProfileByHandle, history }) => {
  useEffect(() => {
    if (match.params.handle) {
      getProfileByHandle(match.params.handle);
    }
  }, [match, getProfileByHandle]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      history.push('/not-found');
    }
  }, [errors, history]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {profile === null || loading ? (
              <Loader />
            ) : (
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <Link to="/profiles" className="btn btn-light mb-3 float-left">
                      Back To Profiles
                    </Link>
                  </div>
                  <div className="col-md-6" />
                </div>

                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience} />
                {profile.github ? <ProfileGithub username={profile.github} /> : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Profile.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
  getProfileByHandle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProfileByHandle, createErrors })(Profile);

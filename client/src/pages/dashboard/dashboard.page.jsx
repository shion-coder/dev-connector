import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/auth/auth.selectors';
import { selectProfile, selectProfileLoading } from 'redux/profile/profile.selectors';
import { getCurrentProfile, deleteProfile } from 'redux/profile/profile.actions';

import { Link } from 'react-router-dom';

import Loader from 'components/loader/loader.component';
import ProfileAction from 'components/profile-actions/profile-actions.component';
import Experience from 'components/dashboard/experience/experience.component';
import Education from 'components/dashboard/education/education.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  profile: selectProfile,
  loading: selectProfileLoading,
});

const Dashboard = ({ user, profile, loading, getCurrentProfile, deleteProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const renderDashboard = () => {
    if (profile === null || loading) {
      return <Loader />;
    }

    return Object.keys(profile).length > 0 ? (
      <div>
        <p className="lead text-muted">
          Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
        </p>

        <ProfileAction />
        <Experience experience={profile.experience} />
        <Education education={profile.education} />

        <div style={{ marginBottom: '60px' }}>
          <button className="btn btn-danger" onClick={() => deleteProfile()}>
            Delete My Account
          </button>
        </div>
      </div>
    ) : (
      <div>
        <p className="lead text-muted">Welcome {user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {renderDashboard()}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(Dashboard);

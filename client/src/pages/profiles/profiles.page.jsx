import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProfiles, selectProfileLoading } from 'redux/profile/profile.selectors';
import { getProfiles } from 'redux/profile/profile.actions';

import Loader from 'components/loader/loader.component';
import ProfileItem from 'components/profile-item/profile-item.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  profiles: selectProfiles,
  loading: selectProfileLoading,
});

const Profiles = ({ profiles, loading, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">Browse and connect with developers</p>

            {profiles === null || loading ? (
              <Loader />
            ) : profiles.length > 0 ? (
              profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Profiles.propTypes = {
  profiles: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProfiles })(Profiles);

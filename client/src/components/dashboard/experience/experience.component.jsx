import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteExperience } from 'redux/profile/profile.actions';

import Moment from 'react-moment';

/* -------------------------------------------------------------------------- */

const Experience = ({ experience, deleteExperience }) => {
  const handleDelete = id => {
    deleteExperience(id);
  };

  const renderExperience = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
          {renderExperience}
        </thead>
      </table>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);

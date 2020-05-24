import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteEducation } from 'redux/profile/profile.actions';

import Moment from 'react-moment';

/* -------------------------------------------------------------------------- */

const Education = ({ education, deleteEducation }) => {
  const handleDelete = id => {
    deleteEducation(id);
  };

  const renderEducation = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
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
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
          {renderEducation}
        </thead>
      </table>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);

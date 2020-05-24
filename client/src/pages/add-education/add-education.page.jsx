import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { createErrors } from 'redux/errors/errors.actions';
import { addEducation } from 'redux/profile/profile.actions';

import { Link } from 'react-router-dom';

import TextFields from 'components/common/text-fields/text-fields.component';
import TextArea from 'components/common/text-area/text-area.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  errosMesages: selectErrorsMessages,
});

const AddEducation = ({ errosMesages, createErrors, addEducation, history }) => {
  const [form, setForm] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const { school, degree, fieldOfStudy, from, to, current, description } = form;

  const handleChange = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleCheck = () => {
    setDisabled(!disabled);
    setForm({ ...form, current: !current });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    addEducation(form, history);
  };

  useEffect(() => {
    setErrors(errosMesages);
  }, [errosMesages]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
            <form onSubmit={handleSubmit}>
              <TextFields
                placeholder="* School"
                name="school"
                value={school}
                onChange={handleChange}
                error={errors.school}
              />
              <TextFields
                placeholder="* Degree or Certification"
                name="degree"
                value={degree}
                onChange={handleChange}
                error={errors.degree}
              />
              <TextFields
                placeholder="* Field of Study"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={handleChange}
                error={errors.fieldOfStudy}
              />
              <h6>From Date</h6>
              <TextFields name="from" type="date" value={from} onChange={handleChange} error={errors.from} />
              <h6>To Date</h6>
              <TextFields
                name="to"
                type="date"
                value={to}
                onChange={handleChange}
                error={errors.to}
                disabled={disabled ? 'disabled' : ''}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={handleCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current
                </label>
              </div>
              <TextArea
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleChange}
                error={errors.description}
                info="Tell us about the position"
              />
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

AddEducation.propTypes = {
  errosMesages: PropTypes.object.isRequired,
  createErrors: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createErrors, addEducation })(AddEducation);

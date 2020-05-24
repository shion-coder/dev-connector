import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { createErrors } from 'redux/errors/errors.actions';
import { addExperience } from 'redux/profile/profile.actions';

import { Link } from 'react-router-dom';

import TextFields from 'components/common/text-fields/text-fields.component';
import TextArea from 'components/common/text-area/text-area.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  errosMesages: selectErrorsMessages,
});

const AddExperience = ({ errosMesages, createErrors, addExperience, history }) => {
  const [form, setForm] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const { company, title, location, from, to, current, description } = form;

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

    addExperience(form, history);
  };

  useEffect(() => {
    setErrors(errosMesages);
  }, [errosMesages]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">Add any job or position that you have had in the past or current</p>
            <form onSubmit={handleSubmit}>
              <TextFields
                placeholder="* Company"
                name="company"
                value={company}
                onChange={handleChange}
                error={errors.company}
              />
              <TextFields
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={handleChange}
                error={errors.title}
              />
              <TextFields
                placeholder="Location"
                name="location"
                value={location}
                onChange={handleChange}
                error={errors.location}
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
                  Current Job
                </label>
              </div>
              <TextArea
                placeholder="Job Description"
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

AddExperience.propTypes = {
  errosMesages: PropTypes.object.isRequired,
  createErrors: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createErrors, addExperience })(AddExperience);

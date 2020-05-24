import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { createErrors } from 'redux/errors/errors.actions';
import { createProfile } from 'redux/profile/profile.actions';

import TextFields from 'components/common/text-fields/text-fields.component';
import TextArea from 'components/common/text-area/text-area.component';
import SelectList from 'components/common/select-list/select-list.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  errosMesages: selectErrorsMessages,
});

const CreateProfile = ({ errosMesages, createErrors, createProfile, history }) => {
  const [form, setForm] = useState({
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    github: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    github,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = form;

  const handleChange = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async e => {
    e.preventDefault();

    createProfile(form, history);
  };

  useEffect(() => {
    setErrors(errosMesages);
  }, [errosMesages]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">Let's get some information to make your profile stand out</p>
            <form onSubmit={handleSubmit}>
              <TextFields
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={handleChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectList
                placeholder="Status"
                name="status"
                value={status}
                onChange={handleChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFields
                placeholder="Company"
                name="company"
                value={company}
                onChange={handleChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFields
                placeholder="Website"
                name="website"
                value={website}
                onChange={handleChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFields
                placeholder="Location"
                name="location"
                value={location}
                onChange={handleChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFields
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={handleChange}
                error={errors.skills}
                info="Please use comma separated values (eg.
              HTML, CSS, JavaScript, PHP"
              />
              <TextFields
                placeholder="Github Username"
                name="github"
                value={github}
                onChange={handleChange}
                error={errors.github}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextArea
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={handleChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted ml-2">Optional</span>
              </div>

              {displaySocialInputs && (
                <div>
                  <TextFields
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={twitter}
                    onChange={handleChange}
                    error={errors.twitter}
                  />

                  <TextFields
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={facebook}
                    onChange={handleChange}
                    error={errors.facebook}
                  />

                  <TextFields
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={linkedin}
                    onChange={handleChange}
                    error={errors.linkedin}
                  />

                  <TextFields
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={youtube}
                    onChange={handleChange}
                    error={errors.youtube}
                  />

                  <TextFields
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={instagram}
                    onChange={handleChange}
                    error={errors.instagram}
                  />
                </div>
              )}

              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

CreateProfile.propTypes = {
  errosMesages: PropTypes.object.isRequired,
  createErrors: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { createErrors, createProfile })(CreateProfile);

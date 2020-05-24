import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

/* -------------------------------------------------------------------------- */

const TextArea = ({ name, placeholder, value, error, info, onChange }) => (
  <div className="form-group">
    <textarea
      className={classnames('form-control form-control-lg', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />

    {error && <div className="invalid-feedback">{error}</div>}
    {info && <small className="form-text text-muted">{info}</small>}
  </div>
);

/* -------------------------------------------------------------------------- */

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;

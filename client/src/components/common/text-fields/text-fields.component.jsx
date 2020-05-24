import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

/* -------------------------------------------------------------------------- */

const TextFields = ({ name, placeholder, value, error, info, type, onChange, disabled, icon }) => (
  <div className={!icon ? 'form-group' : 'input-group mb-3'}>
    {icon && (
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
    )}

    <input
      type={type}
      className={classnames('form-control form-control-lg', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />

    {error && <div className="invalid-feedback">{error}</div>}
    {info && <small className="form-text text-muted">{info}</small>}
  </div>
);

/* -------------------------------------------------------------------------- */

TextFields.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  icon: PropTypes.string,
};

TextFields.defaultProps = {
  type: 'text',
};

export default TextFields;

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

/* -------------------------------------------------------------------------- */

const SelectList = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(({ label, value }) => (
    <option key={label} value={value}>
      {label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>

      {error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

/* -------------------------------------------------------------------------- */

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectList;

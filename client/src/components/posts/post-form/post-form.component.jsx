import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/auth/auth.selectors';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { createErrors } from 'redux/errors/errors.actions';
import { addPost } from 'redux/post/post.actions';

import TextArea from 'components/common/text-area/text-area.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  errosMesages: selectErrorsMessages,
});

const PostForm = ({ user, errosMesages, createErrors, addPost }) => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();

    addPost({ text, name: user.name, avatar: user.avatar });
    setText('');
  };

  useEffect(() => {
    setErrors(errosMesages);
  }, [errosMesages]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextArea
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={e => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  createErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addPost, createErrors })(PostForm);

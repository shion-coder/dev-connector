import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/auth/auth.selectors';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { addComment } from 'redux/post/post.actions';
import { createErrors } from 'redux/errors/errors.actions';

import TextArea from 'components/common/text-area/text-area.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  errorsMessages: selectErrorsMessages,
});

const CommentForm = ({ postId, user, errorsMessages, addComment, createErrors }) => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newComment = {
      text: text,
      name: user.name,
      avatar: user.avatar,
    };

    addComment(postId, newComment);
    setText('');
  };

  useEffect(() => {
    if (errorsMessages) {
      setErrors(errorsMessages);
    }
  }, [errorsMessages]);

  useEffect(() => {
    return () => createErrors({});
  }, [createErrors]);

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextArea
                placeholder="Reply to post"
                name="text"
                value={text}
                onChange={handleChange}
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

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  errorsMessages: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  createErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addComment, createErrors })(CommentForm);

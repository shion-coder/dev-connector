import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/auth/auth.selectors';
import { deleteComment } from 'redux/post/post.actions';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

const CommentItem = ({ user, comment, postId, deleteComment }) => {
  const handleDelete = (postId, commentId) => {
    deleteComment(postId, commentId);
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === user.id ? (
            <button onClick={() => handleDelete(postId, comment._id)} type="button" className="btn btn-danger mr-1">
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { deleteComment })(CommentItem);

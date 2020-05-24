import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'redux/auth/auth.selectors';
import { deletePost, addLike, removeLike } from 'redux/post/post.actions';

import classnames from 'classnames';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  userAuth: selectUser,
});

const PostItem = ({ post, userAuth, deletePost, addLike, removeLike, showActions }) => {
  const { _id, user, name, avatar, text, likes } = post;

  const findUserLike = likes => {
    if (likes.filter(like => like.user === userAuth.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <img className="rounded-circle d-none d-md-block" src={avatar} alt="" />
          <br />
          <p className="text-center">{name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{text}</p>
          {showActions && (
            <span>
              <button onClick={() => addLike(_id)} type="button" className="btn btn-light mr-1">
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-info': findUserLike(likes),
                  })}
                />
                <span className="badge badge-light">{likes.length}</span>
              </button>

              <button onClick={() => removeLike(_id)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down" />
              </button>

              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {user === userAuth.id ? (
                <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger mr-1">
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

PostItem.defaultProps = {
  showActions: true,
};

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);

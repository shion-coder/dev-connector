import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPost, selectPostLoading } from 'redux/post/post.selector';
import { selectErrorsMessages } from 'redux/errors/erros.selectors';
import { getPost } from 'redux/post/post.actions';
import { isEmpty } from 'redux/auth/auth.utils';

import { Link } from 'react-router-dom';

import PostItem from 'components/posts/post-item/post-item.component';
import CommentForm from 'components/post/comment-form/comment-form.component';
import CommentFeed from 'components/post/comment-feed/comment-feed.component';
import Loader from 'components/loader/loader.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  post: selectPost,
  loading: selectPostLoading,
  errors: selectErrorsMessages,
});

const Post = ({ match, post, loading, errors, getPost }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);

  return isEmpty(errors.msg) ? (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>

            {post === null || loading || Object.keys(post).length === 0 ? (
              <Loader />
            ) : (
              <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <h1 className="display-4">Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getPost })(Post);

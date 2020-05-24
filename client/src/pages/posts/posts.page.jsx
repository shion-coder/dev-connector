import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPostLoading, selectPosts } from 'redux/post/post.selector';
import { getPosts } from 'redux/post/post.actions';

import PostForm from 'components/posts/post-form/post-form.component';
import PostFeed from 'components/posts/post-feed/post-feed.component';
import Loader from 'components/loader/loader.component';

/* -------------------------------------------------------------------------- */

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  postLoading: selectPostLoading,
});

const Posts = ({ posts, postLoading, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />

            {posts === null || postLoading ? <Loader /> : <PostFeed posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
};

export default connect(mapStateToProps, { getPosts })(Posts);

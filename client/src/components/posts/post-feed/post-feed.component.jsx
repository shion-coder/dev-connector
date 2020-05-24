import React from 'react';
import PropTypes from 'prop-types';

import PostItem from 'components/posts/post-item/post-item.component';

/* -------------------------------------------------------------------------- */

const PostFeed = ({ posts }) => {
  return posts.map(post => <PostItem key={post._id} post={post} />);
};

/* -------------------------------------------------------------------------- */

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostFeed;

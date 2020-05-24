import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from 'components/post/comment-item/comment-item.component';

/* -------------------------------------------------------------------------- */

const CommentFeed = ({ comments, postId }) => {
  return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />);
};

/* -------------------------------------------------------------------------- */

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentFeed;

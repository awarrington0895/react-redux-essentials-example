import React from "react";

import TimeAgo from "../posts/TimeAgo";

import "./Comment.scss";

const Comment = ({ comment }) => {
  return (
    <div className="post-excerpt">
      <p>{comment.text}</p>
      <TimeAgo timestamp={comment.date} />
    </div>
  );
};

export default Comment;

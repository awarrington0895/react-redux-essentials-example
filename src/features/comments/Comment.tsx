import React from "react";

import TimeAgo from "../../shared/TimeAgo";

import "./Comment.scss";

type Comment = { text: string; date: string };

type Props = { comment: Comment };

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="post-excerpt">
      <p>{comment.text}</p>
      <TimeAgo timestamp={comment.date} />
    </div>
  );
};

export default Comment;

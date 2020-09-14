import React from "react";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="post-excerpt" key={postId}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export default PostExcerpt;

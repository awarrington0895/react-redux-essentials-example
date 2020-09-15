import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import { selectPostById } from "./postsSlice";
import Comment from "../comments/Comment";
import { selectCommentsByPost, fetchComments } from "../comments/commentsSlice";

import "./SinglePostPage.scss";

const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const dispatch = useDispatch();

  const commentStatus = useSelector((state) => state.comments.status);

  useEffect(() => {
    if (commentStatus === "idle") {
      dispatch(fetchComments());
    }
  }, [commentStatus, dispatch]);

  const comments = useSelector((state) => selectCommentsByPost(state, postId));

  const commentsList = comments.map((comment) => (
    <div className="comment">
      <Comment key={comment.id} comment={comment} />
    </div>
  ));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section className="post-page">
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
      <h4>Comments</h4>
      {commentsList}
    </section>
  );
};

export default SinglePostPage;

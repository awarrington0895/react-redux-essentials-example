import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../users";
import { Author } from "./author";

type Props = { userId: string };

const PostAuthor: React.FC<Props> = ({ userId }) => {
  const author: Author = useSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;

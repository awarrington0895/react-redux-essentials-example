import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({
  status: "idle"
});

const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const response = await client.get("/fakeApi/comments");

  return response.comments;
});

const usersSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.fulfilled]: commentsAdapter.setAll
  }
});

const {
  selectAll: selectAllComments,
  selectById: selectCommentById
} = commentsAdapter.getSelectors((state) => state.comments);

const selectCommentsByPost = createSelector(
  [selectAllComments, (_, postId) => postId],
  (comments, postId) => comments.filter((comment) => comment.post === postId)
);

export {
  fetchComments,
  selectAllComments,
  selectCommentById,
  selectCommentsByPost
};

export default usersSlice.reducer;

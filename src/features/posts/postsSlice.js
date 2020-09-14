import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");

  return response.posts;
});

const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  const response = await client.post("/fakeApi/posts", { post: initialPost });

  return response.post;
});

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const emptyReactions = () => ({
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: emptyReactions()
          }
        };
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";

      postsAdapter.upsertMany(state, action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewPost.fulfilled]: postsAdapter.addOne
  }
});

const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => state.posts);

const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export {
  fetchPosts,
  addNewPost,
  selectPostsByUser,
  selectAllPosts,
  selectPostById,
  selectPostIds
};

export default postsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    comments: commentsReducer
  }
});

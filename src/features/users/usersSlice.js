import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeApi/users");

  return response.users;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll
  }
});

const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state) => state.users);

export { fetchUsers, selectAllUsers, selectUserById };

export default usersSlice.reducer;

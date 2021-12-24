import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getUserListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUserListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.newUser;
    },
    updateUserListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUserListStart,
  getUserListSuccess,
  getUserListFailure,
  deleteUserListStart,
  deleteUserListSuccess,
  deleteUserListFailure,
  updateUserListStart,
  updateUserListSuccess,
  updateUserListFailure,
} = userListSlice.actions;

export default userListSlice.reducer;

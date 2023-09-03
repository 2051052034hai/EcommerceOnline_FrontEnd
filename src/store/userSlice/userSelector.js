import { createSelector } from "@reduxjs/toolkit";

const selectUserSlice = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserSlice],
  (user) => user.currentUser
);

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    save_user: (state, action) => {
      if(action.payload !== undefined)
      {
        state.currentUser = {...action.payload}
      }  
    },

    log_out: (state) => {

      state.currentUser = null
    }

  },
});

export const { save_user, log_out } = userSlice.actions;

export default userSlice.reducer;

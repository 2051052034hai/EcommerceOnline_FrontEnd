import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: {},
  otp: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    save_user: (state, action) => {
      if (action.payload !== undefined) {
        state.currentUser = { ...action.payload }
      }
    },

    log_out: (state) => {
      state.currentUser = null
    },

    save_otp: (state, action) => {
      if (action.payload !== undefined) {
        state.otp = action.payload
      }
    },
  },
})

export const { save_user, log_out, save_otp} = userSlice.actions

export default userSlice.reducer

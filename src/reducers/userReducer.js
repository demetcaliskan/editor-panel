import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    loginReduxUser(state, action) {
      return { ...state, ...action.payload }
    },
    refreshUser() {},
    logoutUser(state, action) {},
  },
})

export const { loginReduxUser, refreshUser, logoutUser } = user.actions
export default user.reducer

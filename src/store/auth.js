import { createSlice } from '@reduxjs/toolkit';

const authInitialState = { isLoggedIn: false, userName: '', userEmail: '', userPhone: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUserInfo(state, action) {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPhone = action.payload.userPhone;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

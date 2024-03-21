import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string , login:boolean}>) => {
      state.loggedIn = action.payload.login;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

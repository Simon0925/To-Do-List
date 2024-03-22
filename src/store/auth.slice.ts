import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface AuthState {
  loggedIn: boolean;
  id:string
}

const initialState: AuthState = {
  loggedIn: false,
  id:''
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ login:boolean, id:string}>) => {
      state.loggedIn = action.payload.login;
      state.id = action.payload.id
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

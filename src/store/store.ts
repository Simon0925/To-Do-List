import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post.slice';
import filterReducer from './filter.slice'
import authReduser from './auth.slice'

export const store = configureStore({
  reducer: {
    post: postReducer,
    filter: filterReducer,
    auth:authReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
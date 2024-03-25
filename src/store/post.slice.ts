import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface Post {
  id: string;
  title: string;
  date: string;
  time: string;
  note: string;
}
export interface addPostInterface {
  title: string;
  date: string;
  time: string;
  note: string;
}

function getId(state: RootState) {
  return state.auth;
}

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async (_, { getState,rejectWithValue }) => {

      const authData = getId(getState() as RootState);
      
      try {
        const response = await fetch(`http://localhost:3001/api/post?userId=${authData.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const  data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );

  export const addPost = createAsyncThunk(
    'post/addPost',
    async (postData:addPostInterface, {getState, rejectWithValue }) => {

      const authData = getId(getState() as RootState);

      try {
        const response = await fetch(`http://localhost:3001/api/post?userId=${authData.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );

  export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId: string, {getState, rejectWithValue }) => {

      const authData = getId(getState() as RootState);
      
      const userId = authData.id

      try {
        const response = await fetch(`http://localhost:3001/api/post/${postId}?userId=${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return postId; 
      } catch (error) {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );
  
  export const editPost = createAsyncThunk(
    'post/editPost',
    async (updateData: Post, {getState, rejectWithValue }) => {

      const authData = getId(getState() as RootState);
      
      const userId = authData.id

      const { id, ...data } = updateData;

      console.log('Post slice export const editPost  ', id, data);
      try {
        const response = await fetch(`http://localhost:3001/api/post/${id}?userId=${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );

export interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          console.error('Fetch failed: ', action.payload);
        })
        .addCase(addPost.fulfilled, (state, action) => {
          state.posts.push(action.payload);
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          let id = (action.payload + '')
          console.log('Delete post action:', id);
          state.posts = state.posts.filter(post => post.id !== id);
        })
        .addCase(editPost.fulfilled, (state, action) => {
          const index = state.posts.findIndex(post => post.id === action.payload.id);
          if (index !== -1) {
              state.posts[index] = action.payload;
          }
      });
    }
  });

export default postSlice.reducer;
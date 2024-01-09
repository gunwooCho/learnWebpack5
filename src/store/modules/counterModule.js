import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    isLoading: false,
    isDone: false,
    number: 0,
    error: null,
  },
  reducers: {
    increment: param => {
      const state = param;
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    incrementSuccess: param => {
      const state = param;
      state.isLoading = false;
      state.isDone = true;
      state.number += 1;
    },
    incrementFailure: (param, action) => {
      const state = param;
      state.isLoading = false;
      state.isDone = false;
      state.error = action.error;
    },
    decrement: param => {
      const state = param;
      state.isLoading = true;
      state.isDone = false;
      state.error = null;
    },
    decrementSuccess: param => {
      const state = param;
      state.isLoading = false;
      state.isDone = true;
      state.number -= 1;
    },
    decrementFailure: (param, action) => {
      const state = param;
      state.isLoading = false;
      state.isDone = false;
      state.error = action.error;
    },
  },
});

export const {
  increment,
  incrementSuccess,
  incrementFailure,
  decrement,
  decrementSuccess,
  decrementFailure,
} = counterSlice.actions;

export default counterSlice.reducer;

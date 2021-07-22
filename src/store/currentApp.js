import { createSlice } from '@reduxjs/toolkit';

export const currentAppSlice = createSlice({
  name: 'currentApp',
  initialState: null,
  reducers: {
    setCurrentApp: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentApp } = currentAppSlice.actions;

export default currentAppSlice.reducer;

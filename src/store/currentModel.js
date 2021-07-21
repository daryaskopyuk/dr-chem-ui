import { createSlice } from '@reduxjs/toolkit';

export const currentModelSlice = createSlice({
  name: 'currentModel',
  initialState: null,
  reducers: {
    setCurrentModel: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrentModel } = currentModelSlice.actions;

export default currentModelSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentUserState {
  id?: number;
  email?: string;
  name?: string;
}

const initialState: CurrentUserState = {};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<object>) => action.payload,
    updateCurrentUser: (state, action: PayloadAction<object>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

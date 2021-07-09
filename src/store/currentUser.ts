import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALSTORAGE_ITEMS } from 'app-constants';
import { getLocalstorage, setLocalstorage } from 'utils/localStorage';

const { CURRENT_USER_DATA } = LOCALSTORAGE_ITEMS;

interface CurrentUserState {
  id?: number;
  email?: string;
  name?: string;
}

const initialState: CurrentUserState = getLocalstorage(CURRENT_USER_DATA) || {};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<object>) => {
      setLocalstorage(CURRENT_USER_DATA, action.payload);
      return action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<object>) => {
      const newUser = {
        ...state,
        ...action.payload,
      };
      setLocalstorage(CURRENT_USER_DATA, newUser);
      return newUser;
    },
  },
});

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

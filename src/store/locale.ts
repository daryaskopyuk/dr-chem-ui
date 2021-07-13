import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getLocale} from "../i18n-init";

interface LocaleState {
  locale: string;
}
const defaultLocale = getLocale();

const initialState: LocaleState = {
  locale: defaultLocale
};

export const localeSlice = createSlice({
  name: 'localeSlice',
  initialState,
  reducers: {
    updateLocale: (state, action: PayloadAction<LocaleState>) => action.payload,
  },
});

export const { updateLocale  } = localeSlice.actions;

export default localeSlice.reducer;

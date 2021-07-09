/**
 * WARNING
 * This implementation is not intended for production usage.
 * Check documentation and choose optimal approach for your application.
 * @see https://ttag.js.org/docs/create-react-app.html
 * */
import { addLocale, useLocale as setLocale, LocaleData } from 'ttag';
import langUk from './i18n/uk.po.json';
import langRu from './i18n/ru.po.json';

import {LOCALES} from './app-constants';

const {EN} = LOCALES;

const LOCALE_KEY = '__locale';
const locales: Record<string, LocaleData> = {
  uk: langUk,
  ru: langRu,
};

Object.keys(locales).forEach((locale) => addLocale(locale, locales[locale]));

export const saveLocale = (locale: string) => localStorage.setItem(LOCALE_KEY, locale);

export const getLocale = () => {
  let currentLocale = localStorage.getItem(LOCALE_KEY);

  if (!currentLocale || !locales[currentLocale]) {
    currentLocale = EN;
    saveLocale(currentLocale);
  }

  return currentLocale;
};

// setup
const locale = getLocale();
setLocale(locale);

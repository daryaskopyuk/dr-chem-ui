import { t as translation, useLocale as setNewLocale } from 'ttag';
import { updateLocale } from 'store/locale';

import { saveLocale } from '../i18n-init';
import { useAppDispatch, useAppSelector } from '../store/store';

const useTranslations = () => {
  const { locale } = useAppSelector((state) => state.locale);
  const dispatch = useAppDispatch();
  const t = (strings: any) => translation(strings);

  const setLocale = (newLocale: string) => {
    saveLocale(newLocale);
    setNewLocale(newLocale);
    dispatch(updateLocale({ locale: newLocale }));
  };

  return {
    t,
    locale,
    setLocale,
  };
};

export default useTranslations;

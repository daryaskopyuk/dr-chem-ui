import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { User } from 'interfaces/application';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  clearLocalstorage,
  getLocalstorage,
  setLocalstorage,
} from 'utils/localStorage';
import { setCurrentUser } from 'store/currentUser';
import { ROUTES, LOCALSTORAGE_ITEMS } from 'app-constants';

const { ACCESS_TOKEN, REFRESH_TOKEN, LOGIN_FROM_LOCATION } = LOCALSTORAGE_ITEMS;

type TokensType = { access: string; refresh: string };

const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentUser = useAppSelector((state) => state.currentUser);

  const isSignedIn = useMemo(() => !!currentUser?.uid, [currentUser]);

  const logInUser = useCallback((user: User, tokens: TokensType) => {
    const { access, refresh } = tokens;
    setLocalstorage(ACCESS_TOKEN, access);
    setLocalstorage(REFRESH_TOKEN, refresh);
    dispatch(setCurrentUser(user));
    const loginFrom = getLocalstorage(LOGIN_FROM_LOCATION);

    if (loginFrom) {
      history.push(loginFrom);
    } else {
      history.push(ROUTES.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOutUser = useCallback(() => {
    clearLocalstorage();
    dispatch(setCurrentUser({}));
    history.push(ROUTES.HOME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentUser,
    isSignedIn,
    logInUser,
    logOutUser,
  };
};

export default useCurrentUser;

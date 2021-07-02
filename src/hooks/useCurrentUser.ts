import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/store';
import { clearLocalstorage, setLocalstorage } from 'utils/localStore';
import { setCurrentUser } from 'store/currentUser';
import { ROUTES } from 'app-constants';

type TokensType = { access: string; refresh: string };

const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentUser = useAppSelector((state) => state.currentUser);

  const isSignedIn = useMemo(() => !!currentUser?.id, [currentUser]);

  const logInUser = useCallback((user, tokens: TokensType) => {
    const { access, refresh } = tokens;
    setLocalstorage('accessToken', access);
    setLocalstorage('refreshToken', refresh);
    dispatch(setCurrentUser(user));
    history.push(ROUTES.CURRENT_USER);
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

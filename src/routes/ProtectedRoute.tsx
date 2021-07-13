import { useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { setLocalstorage, removeLocalstorage } from 'utils/localStorage';
import useCurrentUser from 'hooks/useCurrentUser';
import { ROUTES, LOCALSTORAGE_ITEMS } from 'app-constants';

const { LOGIN_FROM_LOCATION } = LOCALSTORAGE_ITEMS;

type ProtectedRouteProps = {
  path: string;
  exact?: boolean;
  component?: React.FC;
  render?: () => JSX.Element;
  children?: JSX.Element[] | JSX.Element;
};

const ProtectedRoute = ({
  path,
  exact,
  component,
  render,
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isSignedIn } = useCurrentUser();

  useEffect(() => {
    if (!isSignedIn) {
      const currentRoute = `${location.pathname}${location.search}`;
      setLocalstorage(LOGIN_FROM_LOCATION, currentRoute);
    } else {
      removeLocalstorage(LOGIN_FROM_LOCATION);
    }
  }, [isSignedIn, location]);

  return isSignedIn ? (
    <Route path={path} exact={exact} component={component} render={render}>
      {children}
    </Route>
  ) : (
    <Redirect
      to={{
        pathname: ROUTES.LOGIN,
      }}
    />
  );
};

ProtectedRoute.defaultProps = {
  exact: false,
  render: undefined,
  component: undefined,
  children: [],
};

export default ProtectedRoute;

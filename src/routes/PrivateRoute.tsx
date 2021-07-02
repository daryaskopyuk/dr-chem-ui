import { Route, Redirect, useLocation } from 'react-router-dom';
import useCurrentUser from 'hooks/useCurrentUser';
import { ROUTES } from 'app-constants';

type PrivateRouteProps = {
  path: string;
  exact?: boolean;
  component?: React.FC;
  render?: () => JSX.Element;
  children?: JSX.Element[] | JSX.Element;
};

const PrivateRoute = ({
  path,
  exact,
  component,
  render,
  children,
}: PrivateRouteProps) => {
  const location = useLocation();
  const { isSignedIn } = useCurrentUser();

  return isSignedIn ? (
    <Route path={path} exact={exact} component={component} render={render}>
      {children}
    </Route>
  ) : (
    <Redirect
      to={{
        pathname: ROUTES.LOGIN,
        state: { from: `${location.pathname}${location.search}` },
      }}
    />
  );
};

PrivateRoute.defaultProps = {
  exact: false,
  render: undefined,
  component: undefined,
  children: [],
};

export default PrivateRoute;

import { FunctionComponent, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import PrivateRoute from 'routes/PrivateRoute';

import Home from 'views/Home/Home';
import AuthRoutes from 'views/Auth/AuthRoutes';

const NoMatch = lazy(() => import('views/NoMatch/NoMatch'));
const PlaceholderUsers = lazy(
  () => import('views/Placeholder/PlaceholderUsers')
);
const Asteroids = lazy(() => import('views/Asteroids/Asteroids'));

const Routes: FunctionComponent = () => (
  <Router>
    <Suspense fallback={<>Loading...</>}>
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route path={ROUTES.AUTH}>
          <AuthRoutes />
        </Route>
        <PrivateRoute exact path={ROUTES.PLACEHOLDER_USERS}>
          <PlaceholderUsers />
        </PrivateRoute>
        <Route exact path={ROUTES.ASTEROIDS}>
          <Asteroids />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;

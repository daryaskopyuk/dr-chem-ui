import { FunctionComponent, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import { useAppDispatch } from 'store/store';
import ProtectedRoute from 'routes/ProtectedRoute';
import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Loader } from 'components/shared/Loader/Loader';

import useCurrentUser from 'hooks/useCurrentUser';
import { useGetUserInfoQuery } from 'services/applicationApi';
import { setCurrentUser } from 'store/currentUser';

import AuthRoutes from 'views/Auth/AuthRoutes';
import Home from 'views/Home/Home';

const Astronauts = lazy(() => import('views/Astronauts/Astronauts'));
const Asteroids = lazy(() => import('views/Asteroids/Asteroids'));
const NoMatch = lazy(() => import('views/NoMatch/NoMatch'));

const Routes: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useCurrentUser();
  const { data } = useGetUserInfoQuery(undefined, { skip: !isSignedIn });

  useEffect(() => {
    const profile = data?.profile;
    if (profile) {
      // update profile
      dispatch(setCurrentUser(profile));
    }
  }, [data, dispatch]);

  return (
    <Router>
      <Suspense
        fallback={
          <SimplePageLayout>
            <Loader />
          </SimplePageLayout>
        }
      >
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={ROUTES.AUTH}>
            <AuthRoutes />
          </Route>
          <ProtectedRoute exact path={ROUTES.ASTRONAUTS}>
            <Astronauts />
          </ProtectedRoute>
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
};

export default Routes;

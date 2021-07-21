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
const DrChem = lazy(() => import('views/DrChem/DrChem'));
const DeNovoApp = lazy(() => import('views/DrChem/DeNovoApp/DeNovoApp'));
const ChemPredictions = lazy(() => import('views/DrChem/PredictionsApp/PredictionsApp'));
const ModelsList = lazy(() => import('views/DrChem/ModelsList'));

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
          <Route exact path={ROUTES.DR_CHEM}>
            <DrChem />
          </Route>
          <Route exact path={ROUTES.DE_NOVO_APP}>
            <DeNovoApp />
          </Route>
          <Route exact path={ROUTES.CHEM_PREDICTIONS}>
            <ChemPredictions />
          </Route>
          <Route exact path={ROUTES.MODELS_LIST}>
            <ModelsList />
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

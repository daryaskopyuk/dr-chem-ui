import { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import Home from 'views/Home/Home';
import NoMatch from 'views/NoMatch/NoMatch';
import PlaceholderUsers from 'views/Placeholder/PlaceholderUsers';

import PrivateRoute from './PrivateRoute';

const Routes: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <PrivateRoute exact path={ROUTES.PLACEHOLDER_USERS}>
        <PlaceholderUsers />
      </PrivateRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

export default Routes;

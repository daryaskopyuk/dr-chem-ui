import { FunctionComponent, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import Callback from 'views/Auth/OAuth/DataRobotCallback';
import LoginWithDataRobot from 'views/Auth/LoginWithDataRobot';

const CurrentUser = lazy(() => import('views/Auth/CurrentUser'));

const Routes: FunctionComponent = () => (
  <Switch>
    <Route exact path={ROUTES.DATAROBOT_OAUTH_CALLBACK}>
      <Callback />
    </Route>
    <Route exact path={ROUTES.LOGIN}>
      <LoginWithDataRobot />
    </Route>
    <Route exact path={ROUTES.CURRENT_USER}>
      <CurrentUser />
    </Route>
  </Switch>
);

export default Routes;

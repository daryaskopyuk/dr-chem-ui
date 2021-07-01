import { FunctionComponent, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import Callback from 'views/Auth/OAuth/DataRobotCallback';
import Login from 'views/Auth/Login';
import LoginWithDataRobot from 'views/Auth/LoginWithDataRobot';
import Register from 'views/Auth/Register';

const ForgotPassword = lazy(() => import('views/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('views/Auth/ResetPassword'));
const VerifyEmail = lazy(() => import('views/Auth/VerifyEmail'));
const CurrentUser = lazy(() => import('views/Auth/CurrentUser'));

const Routes: FunctionComponent = () => (
  <Switch>
    <Route exact path={ROUTES.DATAROBOT_OAUTH_CALLBACK}>
      <Callback />
    </Route>
    <Route exact path={ROUTES.LOGIN_EMAIL}>
      <Login />
    </Route>
    <Route exact path={ROUTES.LOGIN}>
      <LoginWithDataRobot />
    </Route>
    <Route exact path={ROUTES.REGISTER}>
      <Register />
    </Route>
    <Route exact path={ROUTES.FORGOT_PASSWORD}>
      <ForgotPassword />
    </Route>
    <Route exact path={ROUTES.RESET_PASSWORD}>
      <ResetPassword />
    </Route>
    <Route exact path={ROUTES.VERIFY_EMAIL}>
      <VerifyEmail />
    </Route>
    <Route exact path={ROUTES.CURRENT_USER}>
      <CurrentUser />
    </Route>
  </Switch>
);

export default Routes;

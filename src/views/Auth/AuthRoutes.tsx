import { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import Callback from 'views/Auth/OAuth/DataRobotCallback';
// import Login from 'views/Auth/Login';
import LoginWithDataRobot from 'views/Auth/LoginWithDataRobot';
import Register from 'views/Auth/Register';
import ForgotPassword from 'views/Auth/ForgotPassword';
import ResetPassword from 'views/Auth/ResetPassword';
import VerifyEmail from 'views/Auth/VerifyEmail';
import CurrentUser from 'views/Auth/CurrentUser';

const Routes: FunctionComponent = () => (
  <Switch>
    <Route exact path={ROUTES.DATAROBOT_OAUTH_CALLBACK}>
      <Callback />
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

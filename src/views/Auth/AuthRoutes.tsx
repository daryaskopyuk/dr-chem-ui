import { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'app-constants';

import Login from 'views/Auth/Login';
import Register from 'views/Auth/Register';
import ForgotPassword from 'views/Auth/ForgotPassword';
import ResetPassword from 'views/Auth/ResetPassword';
import VerifyEmail from 'views/Auth/VerifyEmail';
import CurrentUser from 'views/Auth/CurrentUser';

const Routes: FunctionComponent = () => (
  <Switch>
    <Route exact path={ROUTES.LOGIN}>
      <Login />
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

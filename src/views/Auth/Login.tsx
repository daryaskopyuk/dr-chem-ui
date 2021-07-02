import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'ttag';
import { Button } from '@datarobot/design-system/js/button';
import { Input } from '@datarobot/design-system/js/input';
import { VALIDATION_RULE_TYPES } from '@datarobot/design-system/js/form-field';

import { ROUTES } from 'app-constants';
import useCurrentUser from 'hooks/useCurrentUser';
import { useLoginMutation } from 'services/appApi';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const Login: FunctionComponent = () => {
  const { logInUser } = useCurrentUser();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errors, setErrors] = useState<any>({});

  // TODO: Move this to separate useAuth? hook
  const [loginMutation, { isLoading }] = useLoginMutation();
  const login = async () => {
    try {
      const { user, tokens } = await loginMutation({
        email,
        password,
      }).unwrap();
      logInUser(user, tokens);
    } catch (err) {
      const { data } = err;
      setErrors({
        email: data.detail
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.detail }
          : undefined,
        password: data.detail
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.detail }
          : undefined,
      });
    }
  };

  return (
    <SimplePageLayout hideHeaderSideMenu>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Login`}</h1>
          <form>
            <Input
              autoFocus
              label="Email"
              name="email"
              type="email"
              size={48}
              value={email}
              validity={errors.email}
              onChange={({ target: { value } }) => setEmail(value)}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              size={48}
              value={password}
              validity={errors.password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <div className="margin-top-6 text-center">
              <Button isDisabled={isLoading} onClick={login}>
                Login
              </Button>
            </div>
            <div className="margin-top-6 text text-center">
              Don&apos;t have an account?{' '}
              <Link className="anchor" to={ROUTES.REGISTER}>
                Register
              </Link>
            </div>
            <div className="margin-top-2 text text-center">
              <Link className="anchor" to={ROUTES.FORGOT_PASSWORD}>
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default Login;

import { FunctionComponent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { t } from 'ttag';
import { Button } from '@datarobot/design-system/js/button';
import { Input } from '@datarobot/design-system/js/input';
import { VALIDATION_RULE_TYPES } from '@datarobot/design-system/js/form-field';

import { ROUTES } from 'app-constants';
import { useResetPasswordMutation } from 'services/appApi';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

interface RouteParams {
  token: string;
}

const ResetPassword: FunctionComponent = () => {
  const { push } = useHistory();
  const { token } = useParams<RouteParams>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errors, setErrors] = useState<any>({});

  // TODO: Move this to separate useAuth? hook
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const resetPassword = async () => {
    try {
      await resetPasswordMutation({
        email,
        password,
        token,
      }).unwrap();
      push(ROUTES.CURRENT_USER);
    } catch (err) {
      const { data } = err;
      setErrors({
        email: data.email
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.email }
          : undefined,
        password: data.password
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.password }
          : undefined,
      });
    }
  };

  return (
    <SimplePageLayout>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Reset Password`}</h1>
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
              label="New Password"
              name="password"
              type="password"
              size={48}
              value={password}
              validity={errors.password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
            <div className="margin-top-6 text-center">
              <Button isDisabled={isLoading} onClick={resetPassword}>
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default ResetPassword;

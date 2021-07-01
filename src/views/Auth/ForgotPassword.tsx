import { FunctionComponent, useState } from 'react';
import { t } from 'ttag';
import { Button } from '@datarobot/design-system/js/button';
import { Input } from '@datarobot/design-system/js/input';
import { VALIDATION_RULE_TYPES } from '@datarobot/design-system/js/form-field';

import { useForgotPasswordMutation } from 'services/appApi';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const ForgotPassword: FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');

  const [errors, setErrors] = useState<any>({});

  const [successPage, setSuccessPage] = useState<boolean>(false);

  // TODO: Move this to separate useAuth? hook
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const forgotPassword = async () => {
    try {
      await forgotPasswordMutation({
        email,
      }).unwrap();
      setSuccessPage(true);
    } catch (err) {
      const { data } = err;
      setErrors({
        email: data.email
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.email }
          : undefined,
      });
    }
  };

  return (
    <SimplePageLayout>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Forgot Password`}</h1>
          {successPage ? (
            <p className="view-header">Check your email</p>
          ) : (
            <form>
              <Input
                label="Email"
                name="email"
                type="email"
                size={48}
                value={email}
                validity={errors.email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
              <div className="margin-top-6 text-center">
                <Button isDisabled={isLoading} onClick={forgotPassword}>
                  Reset Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default ForgotPassword;

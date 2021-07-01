import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'ttag';
import { Button } from '@datarobot/design-system/js/button';
import { Input } from '@datarobot/design-system/js/input';
import { VALIDATION_RULE_TYPES } from '@datarobot/design-system/js/form-field';
import {
  Checkbox,
  CHECKBOX_PLACEMENTS,
} from '@datarobot/design-system/js/checkbox';

import { ROUTES } from 'app-constants';
import { useRegisterMutation } from 'services/appApi';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const Register: FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreedToTos, setAgreedToTos] = useState<boolean>(false);

  const [errors, setErrors] = useState<any>({});

  const [successPage, setSuccessPage] = useState<boolean>(false);

  // TODO: Move this to separate useAuth? hook
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const register = async () => {
    try {
      await registerMutation({
        email,
        password,
        agreed_terms_and_privacy: agreedToTos,
      }).unwrap();
      setSuccessPage(true);
    } catch (err) {
      const { data } = err;
      setErrors({
        email: data.email
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.email }
          : undefined,
        password: data.password
          ? { type: VALIDATION_RULE_TYPES.ERROR, value: data.password }
          : undefined,
        agreedToTos: data.agreed_terms_and_privacy ? true : undefined,
      });
    }
  };

  return (
    <SimplePageLayout>
      <div className={classes.auth}>
        <header className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Register`}</h1>
          {successPage ? (
            <p className="view-header">Check your email</p>
          ) : (
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
              <div className="dr-form-field">
                <Checkbox
                  isChecked={agreedToTos}
                  onChange={() => setAgreedToTos(!agreedToTos)}
                  placement={CHECKBOX_PLACEMENTS.TOP}
                  id="agreedToTos"
                  labelText={
                    <>
                      I agree to the{' '}
                      <a
                        href="https://www.datarobot.com/terms-of-service/"
                        className="anchor"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a
                        href="https://www.datarobot.com/privacy/"
                        className="anchor"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </>
                  }
                />
                {errors.agreedToTos && !agreedToTos && (
                  <div className="dr-validity-messages">
                    <span className="message validation-message error">
                      Must agree to Terms and Conditions
                    </span>
                  </div>
                )}
              </div>
              <div className="margin-top-6 text-center">
                <Button isDisabled={isLoading} onClick={register}>
                  Register
                </Button>
              </div>
              <div className="margin-top-6 text text-center">
                Already have an account?{' '}
                <Link className="anchor" to={ROUTES.LOGIN}>
                  Login
                </Link>
              </div>
            </form>
          )}
        </header>
      </div>
    </SimplePageLayout>
  );
};

export default Register;

import { FunctionComponent, useEffect, useCallback } from 'react';
import { t } from 'ttag';
import { useLocation, Redirect } from 'react-router-dom';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';

import { useAuthenticateMutation } from 'services/applicationApi';
import useCurrentUser from 'hooks/useCurrentUser';

import { ROUTES } from 'app-constants';
import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import classes from '../Auth.module.scss';

const Callback: FunctionComponent = () => {
  const { search } = useLocation();
  const { logInUser } = useCurrentUser();
  const params = new URLSearchParams(search);
  const code = params.get('code');
  const state = params.get('state');

  const [authenticateMutation, { error }] = useAuthenticateMutation();

  const authenticate = useCallback(async () => {
    authenticateMutation({
      code,
      state,
    })
      .unwrap()
      .then((data) => {
        // TODO for now it's mock, but real user data should be coming from authenticate API
        logInUser(
          {
            id: 1,
            name: 'Authenticated User',
            email: 'johndoe@datarobot.com',
          },
          {
            access: data.access_token,
            refresh: '',
          }
        );
      });
  }, [authenticateMutation, logInUser, code, state]);

  useEffect(() => {
    if (code && state) {
      authenticate();
    }
  }, [authenticate, code, state]);

  if (!code || !state) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <SimplePageLayout hideAuthButtons>
      <>
        {error && (
          <Alert
            className={classes.alert}
            header="Could not authenticate"
            type={ALERT_TYPES.FAILURE}
          >
            {t`Please check if application's back end is up and running.`}
          </Alert>
        )}
      </>
    </SimplePageLayout>
  );
};

export default Callback;

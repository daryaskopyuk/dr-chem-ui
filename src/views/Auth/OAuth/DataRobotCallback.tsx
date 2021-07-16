import { FunctionComponent, useEffect, useCallback } from 'react';
import { t } from 'ttag';
import { useLocation, Redirect } from 'react-router-dom';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';

import { useAuthenticateMutation } from 'services/applicationApi';
import useCurrentUser from 'hooks/useCurrentUser';

import { CLIENT_BASE_URL, ROUTES } from 'app-constants';
import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import classes from '../Auth.module.scss';

const Callback: FunctionComponent = () => {
  const { search } = useLocation();
  const { logInUser } = useCurrentUser();
  const params = new URLSearchParams(search);
  const code = params.get('code');
  const state = params.get('state');
  const redirectUri = `${CLIENT_BASE_URL}${ROUTES.DATAROBOT_OAUTH_CALLBACK}`;

  const [authenticateMutation, { error }] = useAuthenticateMutation();

  const authenticate = useCallback(async () => {
    authenticateMutation({
      code,
      state,
      redirect_uri: redirectUri,
    })
      .unwrap()
      .then((data) => {
        // TODO for now it's mock, but real user data should be coming from authenticate API
        logInUser(
          {
            uid: data.profile?.uid,
            email: data.profile?.email,
            firstName: data.profile?.firstName,
            lastName: data.profile?.lastName,
          },
          {
            access: data.accessToken,
            refresh: data.refreshToken,
          }
        );
      })
      .catch(() => {
        // TODO Ignore, since we're already using error from the hook
      });
  }, [authenticateMutation, logInUser, code, state, redirectUri]);

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

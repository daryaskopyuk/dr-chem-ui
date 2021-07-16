import { FunctionComponent } from 'react';
import { t } from 'ttag';
import { Button } from '@datarobot/design-system/js/button';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';

import { useGetAuthorizeUrlQuery } from 'services/applicationApi';

import { CLIENT_BASE_URL, ROUTES } from 'app-constants';
import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const getRedirectUriComponent = () => {
  const redirectUri = `redirect_uri=${CLIENT_BASE_URL}${ROUTES.DATAROBOT_OAUTH_CALLBACK}`;
  return redirectUri;
};

const LoginWithDataRobot: FunctionComponent = () => {
  const { isLoading, error, data } = useGetAuthorizeUrlQuery();
  return (
    <SimplePageLayout hideAuthButtons>
      <div className={classes.auth}>
        <h1>{t`Login`}</h1>
        <div className={classes.authSection}>
          <div className={classes.content}>
            {!error && (
              <Button
                testId="login-button"
                isDisabled={isLoading || !!error}
                onClick={() => {
                  window.location.assign(
                    `${data?.authUrl}&${getRedirectUriComponent()}`
                  );
                }}
              >
                {t`Login with DataRobot`}
              </Button>
            )}
            {!!error && (
              <Alert
                header={t`Could not fetch DataRobot authentication URL`}
                type={ALERT_TYPES.FAILURE}
              >
                {t`Please check if application's back end is up and running.`}
              </Alert>
            )}
          </div>
          <div className={classes.footer}>
            {t`Having trouble? We're here to help!`}
            <br />
            <a href="mailto:support@datarobot.com">support@datarobot.com</a>
          </div>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default LoginWithDataRobot;

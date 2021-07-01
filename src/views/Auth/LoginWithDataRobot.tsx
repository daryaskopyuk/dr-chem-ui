import { FunctionComponent } from 'react';
import { t } from 'ttag';
import { Button } from '@datarobot/design-system/js/button';

import { ROUTES } from 'app-constants';
import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const generateRandomString = (length = 20) =>
  Math.random().toString(20).substr(2, length);

const clientBaseUrl = window.location.port
  ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  : `${window.location.protocol}//${window.location.hostname}`;

const oauthAuthorizeURL = process.env.REACT_APP_DATAROBOT_OAUTH_AUTHORIZE_URL;
const oauthClientId = process.env.REACT_APP_DATAROBOT_OAUTH_CLIENT_ID;

const getAuthorizeUrl = () => {
  const responseType = 'response_type=code';
  const clientId = `client_id=${oauthClientId}`;
  const redirectUri = `redirect_uri=${clientBaseUrl}${ROUTES.DATAROBOT_OAUTH_CALLBACK}`;
  const scope = `scope=${encodeURIComponent('openid email profile scope:all')}`;
  const state = `state=${encodeURIComponent(generateRandomString())}`;
  const nonce = `nonce=${encodeURIComponent(generateRandomString())}`;
  return `${oauthAuthorizeURL}?${responseType}&${clientId}&${redirectUri}&${scope}&${state}&${nonce}`;
};

const LoginWithDataRobot: FunctionComponent = () => (
  <SimplePageLayout hideHeaderSideMenu>
    <div className={classes.auth}>
      <header className={classes.authHeader}>
        <h1 className="page-header app-heading">{t`Login`}</h1>
        <div className={classes.authSection}>
          <div className={classes.sectionContent}>
            <Button
              onClick={() => {
                window.location.href = getAuthorizeUrl();
              }}
            >
              Login with DataRobot
            </Button>
          </div>
          <div className={classes.sectionFooter}>
            Having trouble? We&apos;re here to help!
            <br />
            <a href="mailto:support@datarobot.com">support@datarobot.com</a>
          </div>
        </div>
      </header>
    </div>
  </SimplePageLayout>
);

export default LoginWithDataRobot;

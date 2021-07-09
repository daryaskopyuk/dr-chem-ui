import { FunctionComponent, useState } from 'react';
import { t } from 'ttag';
import { Tabs } from '@datarobot/design-system/js/tabs';
import { Button } from '@datarobot/design-system/js/button';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';
import { ReactComponent as AppLogo } from 'assets/images/app-logo.svg';
import { getLocale } from 'i18n-init';

import { DEFAULT_APP_API_URL, APP_API_URL } from 'app-constants';
import useTranslations from 'hooks/useTranslations';
import useCurrentUser from 'hooks/useCurrentUser';
import { SimplePageLayout } from 'components/layouts/SimplePageLayout';

import '@datarobot/design-system/styles/tabs.css';
import classes from './Home.module.scss';

const tabs = [
  { key: 'en', label: 'EN', testId: 'tab-locale-en' },
  { key: 'uk', label: 'UK', testId: 'tab-locale-uk' },
  { key: 'ru', label: 'RU', testId: 'tab-locale-ru' },
];

const applicationServerURL = APP_API_URL || DEFAULT_APP_API_URL;

const Home: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(getLocale());
  const { currentUser, isSignedIn } = useCurrentUser();
  const { setLocale } = useTranslations();

  const onTabChange = (tab: any) => {
    const localeCode = tab.key;
    setActiveTab(localeCode);
    setLocale(localeCode);
  };

  return (
    <SimplePageLayout>
      <div className={classes.home}>
        <div className={classes.homeHeader}>
          <AppLogo className="margin-bottom-5" test-id="app-logo" />
          {isSignedIn ? (
            <>
              <h1>
                {t`Hello`}, {currentUser.name}!
              </h1>
            </>
          ) : (
            <h1>{t`Welcome to UI App Template!`}</h1>
          )}

          <Alert
            className={classes.alert}
            header={t`Important`}
            type={ALERT_TYPES.INFO}
          >
            {t`This application is pointed at a back end server running at`}{' '}
            <strong>{applicationServerURL}</strong>
            <br />
            {t`Use REACT_APP_API_URL variable to change this.`}
          </Alert>

          <Tabs
            options={tabs}
            onSelect={onTabChange}
            selectedKey={activeTab}
            groupIdentifier="tabs-locale"
            testId="tabs-locale"
            className="margin-bottom-5 margin-top-5"
          />
          <Button
            className={classes.repoLink}
            onClick={() => {
              window.location.href =
                'https://gitlab.solutions.drdev.io/solutions-platform2/example-projects/cra-template-app';
            }}
            testId="app-link"
          >
            {t`Our repo on GitLab`}
            <span className="fas fa-external-link-alt margin-left-5" />
          </Button>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default Home;

import { FunctionComponent, useState } from 'react';
import { t, useLocale as setLocale } from 'ttag';
import { Tabs } from '@datarobot/design-system/js/tabs';
import '@datarobot/design-system/styles/tabs.css';
import { ReactComponent as AppLogo } from 'assets/images/app-logo.svg';
import { saveLocale, getLocale } from 'i18n-init';

import SimplePageLayout from 'components/layouts/SimplePageLayout';
import RepoLink from 'components/shared/RepoLink/RepoLink';

import classes from './Home.module.scss';

const tabs = [
  { key: 'en', label: 'EN', testId: 'tab-locale-en' },
  { key: 'uk', label: 'UK', testId: 'tab-locale-uk' },
  { key: 'ru', label: 'RU', testId: 'tab-locale-ru' },
];

const Home: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(getLocale());

  const onTabChange = (tab: any) => {
    const localeCode = tab.key;

    setActiveTab(localeCode);
    saveLocale(localeCode);
    setLocale(localeCode);
  };

  return (
    <SimplePageLayout>
      <div className={classes.home}>
        <header className={classes.homeHeader}>
          <AppLogo className="margin-bottom-5" test-id="app-logo" />
          <h1 className="page-header app-heading">{t`CRA DataRobot Template`}</h1>
          <Tabs
            options={tabs}
            onSelect={onTabChange}
            selectedKey={activeTab}
            groupIdentifier="tabs-locale"
            testId="tabs-locale"
            className="margin-bottom-5"
          />
          <RepoLink className={classes.repoLink} />
        </header>
      </div>
    </SimplePageLayout>
  );
};

export default Home;

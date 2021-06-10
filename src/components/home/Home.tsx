import { FunctionComponent, useState } from 'react';
import { t, useLocale as setLocale } from 'ttag';
import { Tabs } from '@datarobot/design-system/js/tabs';
import '@datarobot/design-system/styles/tabs.css';
import { ReactComponent as AppLogo } from '../../assets/images/app-logo.svg';
import { saveLocale, getLocale } from '../../i18n-init';

import './Home.css';

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
    <div className="home">
      <header className="home-header">
        <AppLogo
          className="margin-bottom-5"
          test-id="app-logo"
        />
        <h1 className="page-header app-heading">{t`CRA DataRobot Template integrated with Gitlab`}</h1>
        <Tabs
          options={tabs}
          onSelect={onTabChange}
          selectedKey={activeTab}
          groupIdentifier="tabs-locale"
          testId="tabs-locale"
          className="margin-bottom-5"
        />
        <a
          className="home-link bold-label"
          href="https://github.com/datarobot/cra-template-datarobot"
          target="_blank"
          rel="noopener noreferrer"
          test-id="app-link"
        >
          {t`Our repo on GitHub`}
          <span className="fas fa-external-link-alt margin-left-5" />
        </a>
      </header>
    </div>
  );
};

export default Home;

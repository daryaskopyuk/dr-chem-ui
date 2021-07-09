import { FunctionComponent, useState } from 'react';
import { t } from 'ttag';
import { Tabs } from '@datarobot/design-system/js/tabs';
import '@datarobot/design-system/styles/tabs.css';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import All from './All';
import ById from './ById';
import ByUsername from './ByUsername';

import classes from './Astronauts.module.scss';

const tabs = [
  { key: 'all', label: t`All`, testId: 'tab-users-all' },
  { key: 'by-id', label: t`By Id`, testId: 'tab-users-id' },
  { key: 'by-username', label: t`By Username`, testId: 'tab-users-username' },
];

const Astronauts: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const onTabChange = ({ key }: { key: string }) => {
    setActiveTab(key);
  };

  return (
    <SimplePageLayout>
      <div className={classes.astronauts}>
        <h1>{t`Some of these people could be astronauts...`}</h1>
        <div className={classes.content}>
          <Tabs
            options={tabs}
            onSelect={onTabChange}
            selectedKey={activeTab}
            groupIdentifier="tabs-locale"
            testId="tabs-locale"
            className="margin-bottom-5"
          />
          {activeTab === 'all' && <All />}
          {activeTab === 'by-id' && <ById />}
          {activeTab === 'by-username' && <ByUsername />}
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default Astronauts;

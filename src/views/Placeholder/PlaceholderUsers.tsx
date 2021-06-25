import { FunctionComponent, useState } from 'react';
import { Tabs } from '@datarobot/design-system/js/tabs';
import '@datarobot/design-system/styles/tabs.css';

import SimplePageLayout from 'components/layouts/SimplePageLayout';
import All from './All';
import ById from './ById';
import ByUsername from './ByUsername';

import './PlaceholderUsers.css';

const tabs = [
  { key: 'all', label: 'All', testId: 'tab-users-all' },
  { key: 'by-id', label: 'By Id', testId: 'tab-users-id' },
  { key: 'by-username', label: 'By Username', testId: 'tab-users-username' },
];

const PlaceholderUsers: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const onTabChange = ({ key }: { key: string }) => {
    setActiveTab(key);
  };

  return (
    <SimplePageLayout>
      <div className="placeholder-users">
        <header className="placeholder-users-header">
          <h1 className="page-header app-heading">Users</h1>
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
        </header>
      </div>
    </SimplePageLayout>
  );
};

export default PlaceholderUsers;

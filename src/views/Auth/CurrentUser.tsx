import { FunctionComponent } from 'react';
import { t } from 'ttag';
import '@datarobot/design-system/styles/tabs.css';

import { useCurrentUserQuery } from 'services/appApi';

import './Auth.css';

const CurrentUser: FunctionComponent = () => {
  const { isLoading, error, data } = useCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="auth">
      <header className="auth-header">
        <h1 className="page-header app-heading">{t`Current User`}</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </header>
    </div>
  );
};

export default CurrentUser;

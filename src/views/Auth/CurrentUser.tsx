import { FunctionComponent } from 'react';
import { t } from 'ttag';

import { useCurrentUserQuery } from 'services/appApi';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const CurrentUser: FunctionComponent = () => {
  const { isLoading, error, data } = useCurrentUserQuery();

  if (isLoading)
    return (
      <SimplePageLayout>
        <div className={classes.auth}>Loading...</div>
      </SimplePageLayout>
    );
  if (error)
    return (
      <SimplePageLayout>
        <div className={classes.auth}>Error</div>
      </SimplePageLayout>
    );

  return (
    <SimplePageLayout>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Current User`}</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default CurrentUser;

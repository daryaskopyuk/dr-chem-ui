import { FunctionComponent } from 'react';
import { t } from 'ttag';

import useCurrentUser from 'hooks/useCurrentUser';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Auth.module.scss';

const CurrentUser: FunctionComponent = () => {
  const { currentUser } = useCurrentUser();

  return (
    <SimplePageLayout>
      <div className={classes.auth}>
        <div className={classes.authHeader}>
          <h1 className="page-header app-heading">{t`Current User`}</h1>
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        </div>
      </div>
    </SimplePageLayout>
  );
};

export default CurrentUser;

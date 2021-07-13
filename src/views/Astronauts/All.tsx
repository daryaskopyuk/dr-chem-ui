import { FunctionComponent } from 'react';
import { t } from 'ttag';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';

import { useGetUsersQuery } from 'services/astronautsApi';
import { Loader } from 'components/shared/Loader/Loader';

import classes from './Astronauts.module.scss';

const All: FunctionComponent = () => {
  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetUsersQuery();

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Alert
        className={classes.alert}
        header={t`Could not fetch the data`}
        type={ALERT_TYPES.FAILURE}
      >
        {t`Please check if application's back end is up and running.`}
      </Alert>
    );

  return (
    <div>
      {t`All`}:<pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default All;

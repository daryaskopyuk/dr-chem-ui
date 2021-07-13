import { FunctionComponent, useState } from 'react';
import { t } from 'ttag';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';

import { useGetUsersByIdQuery } from 'services/astronautsApi';
import { Loader } from 'components/shared/Loader/Loader';

import classes from './Astronauts.module.scss';

const ById: FunctionComponent = () => {
  const [id] = useState<number>(7);

  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetUsersByIdQuery(id);

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
      {t`By Id`}:<pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ById;

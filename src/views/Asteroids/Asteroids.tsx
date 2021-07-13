import { FunctionComponent, Fragment } from 'react';
import { t } from 'ttag';
import { Table } from '@datarobot/design-system/js/table';
import { Alert, ALERT_TYPES } from '@datarobot/design-system/js/alert';

import { useGetAsteroidsQuery } from 'services/applicationApi';
import useResponsive from 'hooks/useResponsive';

import { SimplePageLayout } from 'components/layouts/SimplePageLayout';
import { Loader } from 'components/shared/Loader/Loader';

import classes from './Asteroids.module.scss';

const Asteroids: FunctionComponent = () => {
  const { isMobile } = useResponsive();

  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetAsteroidsQuery();

  const dates = data?.near_earth_objects;

  const columns = isMobile
    ? [
        { accessor: 'name', header: 'Name' },
        { accessor: 'absolute_magnitude_h', header: 'Mag.' },
      ]
    : [
        { accessor: 'id', header: 'Id' },
        { accessor: 'name', header: 'Name' },
        { accessor: 'absolute_magnitude_h', header: 'Absolute Magnitude' },
      ];

  if (isLoading) {
    return (
      <SimplePageLayout>
        <Loader />
      </SimplePageLayout>
    );
  }

  if (error) {
    return (
      <SimplePageLayout>
        <Alert
          className={classes.alert}
          header={t`Could not fetch the data`}
          type={ALERT_TYPES.FAILURE}
        >
          {t`Please check if application's back end is up and running.`}
        </Alert>
      </SimplePageLayout>
    );
  }

  return (
    <SimplePageLayout>
      <div className={classes.asteroids}>
        <h1>{t`Beware of the asteroids ...`}</h1>
        {Object.entries(dates).map(([date, objects]) => (
          <Fragment key={`key-${date}`}>
            <p>{date}:</p>
            <Table columns={columns} data={objects as any[]} />
          </Fragment>
        ))}
      </div>
    </SimplePageLayout>
  );
};

export default Asteroids;

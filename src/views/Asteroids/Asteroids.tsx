import { FunctionComponent } from 'react';
import { Table } from '@datarobot/design-system/js/table';

import { useDetectQuery } from 'services/appApi';
import useResponsive from 'hooks/useResponsive';

import SimplePageLayout from 'components/layouts/SimplePageLayout';

import classes from './Asteroids.module.scss';

const Asteroids: FunctionComponent = () => {
  const { isMobile } = useResponsive();

  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useDetectQuery();

  if (isLoading)
    return (
      <SimplePageLayout>
        <div className={classes.detect}>Loading...</div>
      </SimplePageLayout>
    );
  if (error)
    return (
      <SimplePageLayout>
        <div className={classes.detect}>Error</div>
      </SimplePageLayout>
    );

  const dates = data.near_earth_objects;

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

  return (
    <SimplePageLayout>
      <div className={classes.detect}>
        {Object.entries(dates).map(([date, objects]) => (
          <>
            <p>{date}:</p>
            <Table columns={columns} data={objects as any[]} />
          </>
        ))}
      </div>
    </SimplePageLayout>
  );
};

export default Asteroids;

import { FunctionComponent } from 'react';

import { useGetUsersQuery } from 'services/externalApi';

const All: FunctionComponent = () => {
  // Using a query hook automatically fetches data and returns query values
  const { isLoading, error, data } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      All users:
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default All;
